import { User, Track, Quiz, QuizAttempt, GameScore, Transaction, RedemptionItem, LeaderboardEntry } from './types';
import { tracks, quizzes, redemptionItems, mockLeaderboard } from './seed';

const STORAGE_KEYS = {
  USER: 'telcolearn_user',
  TRACKS: 'telcolearn_tracks',
  QUIZZES: 'telcolearn_quizzes',
  REDEMPTIONS: 'telcolearn_redemptions',
  LEADERBOARD: 'telcolearn_leaderboard'
};

export class TLCService {
  private static instance: TLCService;

  static getInstance(): TLCService {
    if (!TLCService.instance) {
      TLCService.instance = new TLCService();
    }
    return TLCService.instance;
  }

  // User Management
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  createUser(name: string, email: string, phone: string): User {
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      selectedTrack: '',
      tlcBalance: 100, // Starting bonus
      loginStreak: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      completedCourses: [],
      quizAttempts: [],
      gameScores: [],
      transactions: [{
        id: Date.now().toString(),
        type: 'earn',
        amount: 100,
        description: 'Welcome bonus',
        date: new Date().toISOString()
      }],
      createdAt: new Date().toISOString()
    };
    
    this.setCurrentUser(user);
    return user;
  }

  updateUserTrack(trackId: string): void {
    const user = this.getCurrentUser();
    if (user) {
      user.selectedTrack = trackId;
      this.setCurrentUser(user);
    }
  }

  // Token Management
  awardTokens(amount: number, description: string): void {
    const user = this.getCurrentUser();
    if (user) {
      user.tlcBalance += amount;
      user.transactions.push({
        id: Date.now().toString(),
        type: 'earn',
        amount,
        description,
        date: new Date().toISOString()
      });
      this.setCurrentUser(user);
    }
  }

  deductTokens(amount: number, description: string, orderId?: string): boolean {
    const user = this.getCurrentUser();
    if (user && user.tlcBalance >= amount) {
      user.tlcBalance -= amount;
      user.transactions.push({
        id: Date.now().toString(),
        type: 'redeem',
        amount,
        description,
        date: new Date().toISOString(),
        orderId
      });
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  // Streak Management
  updateLoginStreak(): void {
    const user = this.getCurrentUser();
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = user.lastLoginDate;
      
      if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastLogin === yesterdayStr) {
          user.loginStreak += 1;
        } else {
          user.loginStreak = 1;
        }
        
        user.lastLoginDate = today;
        
        // Award streak bonus (max 7 days)
        const streakBonus = Math.min(user.loginStreak, 7) * 5;
        this.awardTokens(streakBonus, `Day ${user.loginStreak} login streak bonus`);
      }
    }
  }

  // Track Management
  getTracks(): Track[] {
    const storedTracks = localStorage.getItem(STORAGE_KEYS.TRACKS);
    if (storedTracks) {
      return JSON.parse(storedTracks);
    } else {
      localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
      return tracks;
    }
  }

  getTrackById(trackId: string): Track | undefined {
    return this.getTracks().find(track => track.id === trackId);
  }

  completeLesson(lessonId: string): void {
    const allTracks = this.getTracks();
    const user = this.getCurrentUser();
    
    if (user) {
      let lessonFound = false;
      
      allTracks.forEach(track => {
        track.modules.forEach(module => {
          const lesson = module.lessons.find(l => l.id === lessonId);
          if (lesson && !lesson.isCompleted) {
            lesson.isCompleted = true;
            lessonFound = true;
            
            // Award tokens
            this.awardTokens(lesson.tlcReward, `Completed lesson: ${lesson.title}`);
            
            // Check if module is complete to unlock next module
            const moduleComplete = module.lessons.every(l => l.isCompleted);
            if (moduleComplete) {
              const currentModuleIndex = track.modules.findIndex(m => m.id === module.id);
              if (currentModuleIndex < track.modules.length - 1) {
                track.modules[currentModuleIndex + 1].isLocked = false;
              }
            }
          }
        });
      });
      
      if (lessonFound) {
        localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(allTracks));
      }
    }
  }

  // Quiz Management
  getQuizForTrack(trackId: string): Quiz | undefined {
    const storedQuizzes = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    const allQuizzes = storedQuizzes ? JSON.parse(storedQuizzes) : quizzes;
    
    if (!storedQuizzes) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    }
    
    return allQuizzes.find((quiz: Quiz) => quiz.trackId === trackId);
  }

  submitQuiz(quizId: string, answers: number[]): QuizAttempt {
    const quiz = quizzes.find(q => q.id === quizId);
    const user = this.getCurrentUser();
    
    if (!quiz || !user) {
      throw new Error('Quiz or user not found');
    }

    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctCount++;
      }
    });

    const baseTokens = 5; // Base attempt reward
    const correctTokens = correctCount * 2; // 2 tokens per correct answer
    const perfectBonus = correctCount === quiz.questions.length ? 10 : 0;
    const totalTokens = baseTokens + correctTokens + perfectBonus;

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      tlcEarned: totalTokens,
      attemptDate: new Date().toISOString()
    };

    user.quizAttempts.push(attempt);
    
    let description = `Quiz attempt: ${correctCount}/${quiz.questions.length} correct`;
    if (perfectBonus > 0) {
      description += ' (Perfect score bonus!)';
    }
    
    this.awardTokens(totalTokens, description);
    
    return attempt;
  }

  // Game Management
  submitGameScore(gameType: 'speed-quiz' | 'memory-match', score: number): GameScore {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }

    const tlcEarned = Math.min(Math.floor(score / 10), 30); // Max 30 tokens

    const gameScore: GameScore = {
      id: Date.now().toString(),
      gameType,
      score,
      tlcEarned,
      playedDate: new Date().toISOString()
    };

    user.gameScores.push(gameScore);
    this.awardTokens(tlcEarned, `${gameType} game score: ${score}`);
    
    return gameScore;
  }

  // Redemption Management
  getRedemptionItems(): RedemptionItem[] {
    const storedItems = localStorage.getItem(STORAGE_KEYS.REDEMPTIONS);
    if (storedItems) {
      return JSON.parse(storedItems);
    } else {
      localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(redemptionItems));
      return redemptionItems;
    }
  }

  redeemItem(itemId: string): string | null {
    const items = this.getRedemptionItems();
    const item = items.find(i => i.id === itemId);
    const user = this.getCurrentUser();
    
    if (!item || !user || user.tlcBalance < item.cost) {
      return null;
    }
    
    const orderId = `TLC${Date.now()}`;
    const success = this.deductTokens(item.cost, `Redeemed: ${item.title}`, orderId);
    
    return success ? orderId : null;
  }

  // Leaderboard Management
  getLeaderboard(): LeaderboardEntry[] {
    const storedLeaderboard = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    const leaderboard = storedLeaderboard ? JSON.parse(storedLeaderboard) : [...mockLeaderboard];
    
    // Add current user to leaderboard
    const user = this.getCurrentUser();
    if (user) {
      const userEntry: LeaderboardEntry = {
        rank: 0,
        name: user.name,
        tlcBalance: user.tlcBalance,
        streak: user.loginStreak
      };
      
      // Remove existing user entry
      const filteredLeaderboard = leaderboard.filter((entry: LeaderboardEntry) => entry.name !== user.name);
      filteredLeaderboard.push(userEntry);
      
      // Sort by balance and update ranks
      filteredLeaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.tlcBalance - a.tlcBalance);
      filteredLeaderboard.forEach((entry: LeaderboardEntry, index: number) => {
        entry.rank = index + 1;
      });
      
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(filteredLeaderboard));
      return filteredLeaderboard;
    }
    
    return leaderboard;
  }

  // Admin functions
  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

export const tlcService = TLCService.getInstance();