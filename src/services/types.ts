export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  selectedTrack: string;
  tlcBalance: number;
  loginStreak: number;
  lastLoginDate: string;
  completedCourses: string[];
  quizAttempts: QuizAttempt[];
  gameScores: GameScore[];
  transactions: Transaction[];
  createdAt: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  modules: Module[];
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  isCompleted: boolean;
  tlcReward: number;
}

export interface Quiz {
  id: string;
  trackId: string;
  questions: QuizQuestion[];
  dailyDate: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  tlcEarned: number;
  attemptDate: string;
}

export interface GameScore {
  id: string;
  gameType: 'speed-quiz' | 'memory-match';
  score: number;
  tlcEarned: number;
  playedDate: string;
}

export interface RedemptionItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'recharge' | 'data' | 'credit';
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'redeem';
  amount: number;
  description: string;
  date: string;
  orderId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  tlcBalance: number;
  streak: number;
}