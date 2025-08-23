import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Gamepad2, 
  Gift, 
  Trophy, 
  Wallet, 
  Flame,
  TrendingUp,
  Star
} from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';

export const Dashboard: React.FC = () => {
  const user = tlcService.getCurrentUser();
  const selectedTrack = user?.selectedTrack ? tlcService.getTrackById(user.selectedTrack) : null;

  if (!user) {
    return <div>Loading...</div>;
  }

  const quickStats = [
    {
      label: 'Current Streak',
      value: `${user.loginStreak} days`,
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      label: 'Courses Completed',
      value: user.completedCourses.length.toString(),
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      label: 'Quiz Attempts',
      value: user.quizAttempts.length.toString(),
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      label: 'Games Played',
      value: user.gameScores.length.toString(),
      icon: <Gamepad2 className="w-5 h-5 text-green-500" />,
      color: 'bg-green-50 border-green-200'
    }
  ];

  const quickActions = [
    {
      title: 'Learn Courses',
      description: 'Continue your learning journey',
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      link: '/courses',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge daily',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      link: '/quiz',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Play Games',
      description: 'Fun mini-games to earn TLC',
      icon: <Gamepad2 className="w-8 h-8 text-green-500" />,
      link: '/games',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Redeem Rewards',
      description: 'Use your TLC tokens',
      icon: <Gift className="w-8 h-8 text-red-500" />,
      link: '/redeem',
      color: 'from-red-500 to-red-600'
    }
  ];

  const recentTransactions = user.transactions.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome back, {user.name}! 👋
              </h1>
              {selectedTrack && (
                <p className="text-gray-600">
                  Learning {selectedTrack.name} • {selectedTrack.icon}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <TokenBadge balance={user.tlcBalance} size="lg" />
              <Link to="/wallet" className="text-gray-500 hover:text-gray-700">
                <Wallet size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <div key={index} className={`bg-white border-2 ${stat.color} rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                {stat.icon}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {action.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} TLC
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Start learning to see your activity here!</p>
              </div>
            )}
            
            <Link to="/wallet" className="block text-center mt-4 text-blue-500 hover:text-blue-600 font-medium">
              View Full History →
            </Link>
          </div>

          {/* Track Progress */}
          {selectedTrack && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">{selectedTrack.icon}</div>
                <h2 className="text-lg font-semibold text-gray-800">{selectedTrack.name}</h2>
              </div>
              
              <div className="space-y-3">
                {selectedTrack.modules.map((module, index) => (
                  <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{module.title}</p>
                      <p className="text-xs text-gray-500">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.isLocked ? (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          🔒
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          ✅
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/courses" className="block text-center mt-4 text-blue-500 hover:text-blue-600 font-medium">
                Continue Learning →
              </Link>
            </div>
          )}

          {/* Leaderboard Preview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">Leaderboard</h2>
            </div>
            
            <div className="space-y-3">
              {tlcService.getLeaderboard().slice(0, 5).map((entry, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${
                  entry.name === user.name ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      entry.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {entry.name} {entry.name === user.name && '(You)'}
                      </p>
                      <p className="text-xs text-gray-500">{entry.streak} day streak</p>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-600">
                    {entry.tlcBalance} TLC
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/leaderboard" className="block text-center mt-4 text-blue-500 hover:text-blue-600 font-medium">
              View Full Leaderboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};