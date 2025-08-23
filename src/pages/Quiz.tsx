import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Calendar, Trophy, Clock } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';
import { QuizRunner } from '../components/QuizRunner';
import { QuizAttempt } from '../services/types';

export const Quiz: React.FC = () => {
  const [showQuizRunner, setShowQuizRunner] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  const user = tlcService.getCurrentUser();
  const selectedTrack = user?.selectedTrack;
  const quiz = selectedTrack ? tlcService.getQuizForTrack(selectedTrack) : null;
  
  if (!user || !quiz) {
    return <div>Loading...</div>;
  }

  const todayAttempt = user.quizAttempts.find(attempt => 
    attempt.attemptDate.startsWith(new Date().toISOString().split('T')[0])
  );

  const handleQuizComplete = (attempt: QuizAttempt) => {
    const updatedAttempt = tlcService.submitQuiz(quiz.id, []); // This is handled in QuizRunner
    setLastAttempt(updatedAttempt);
    setQuizCompleted(true);
    setShowQuizRunner(false);
    
    // Reload to update user data
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const getQuizStats = () => {
    const attempts = user.quizAttempts;
    const totalAttempts = attempts.length;
    const totalCorrect = attempts.reduce((acc, attempt) => acc + attempt.score, 0);
    const totalQuestions = attempts.reduce((acc, attempt) => acc + attempt.totalQuestions, 0);
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalEarned = attempts.reduce((acc, attempt) => acc + attempt.tlcEarned, 0);
    
    return { totalAttempts, averageScore, totalEarned };
  };

  const stats = getQuizStats();

  if (showQuizRunner) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowQuizRunner(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Daily Quiz</h1>
              </div>
              <TokenBadge balance={user.tlcBalance} />
            </div>
          </div>
          
          <QuizRunner quiz={quiz} onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Brain className="w-8 h-8 text-purple-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Daily Quiz</h1>
              <p className="text-gray-600">Test your knowledge and earn TLC tokens</p>
            </div>
            <TokenBadge balance={user.tlcBalance} />
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Total Attempts</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.totalAttempts}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Average Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.averageScore}%</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <TokenBadge balance={0} size="sm" />
              <span className="text-sm font-medium text-gray-600">Total Earned</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.totalEarned} TLC</div>
          </div>
        </div>

        {/* Today's Quiz */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Today's Quiz</h2>
                <p className="text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            {todayAttempt && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Already completed</div>
                <div className="font-semibold text-green-600">
                  {todayAttempt.score}/{todayAttempt.totalQuestions} correct
                </div>
              </div>
            )}
          </div>

          {!todayAttempt ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready for today's challenge?</h3>
              <p className="text-gray-600 mb-4">
                Answer {quiz.questions.length} questions and earn TLC tokens based on your score!
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.questions.length} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>5-25 TLC reward</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowQuizRunner(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="border-2 border-green-200 bg-green-50 rounded-xl p-8 text-center">
              <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Completed! 🎉</h3>
              <p className="text-gray-600 mb-4">
                Great job! You scored {todayAttempt.score} out of {todayAttempt.totalQuestions} questions.
              </p>
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
                <span>+{todayAttempt.tlcEarned} TLC earned</span>
              </div>
              <p className="text-sm text-gray-500 mt-4">Come back tomorrow for a new quiz!</p>
            </div>
          )}
        </div>

        {/* Recent Attempts */}
        {user.quizAttempts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Attempts</h2>
            <div className="space-y-3">
              {user.quizAttempts.slice(-5).reverse().map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">
                      {new Date(attempt.attemptDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Score: {attempt.score}/{attempt.totalQuestions} ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      +{attempt.tlcEarned} TLC
                    </div>
                    {attempt.score === attempt.totalQuestions && (
                      <div className="text-xs text-yellow-600 font-medium">Perfect! 🎯</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};