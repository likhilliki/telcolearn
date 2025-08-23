import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Star, Crown, Flame, TrendingUp } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';

export const Leaderboard: React.FC = () => {
  const user = tlcService.getCurrentUser();
  const leaderboard = tlcService.getLeaderboard();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</div>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900';
    if (rank <= 10) return 'bg-gradient-to-r from-blue-400 to-blue-500 text-blue-900';
    return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700';
  };

  const userEntry = leaderboard.find(entry => entry.name === user.name);
  const topThree = leaderboard.slice(0, 3);
  const remainingRanks = leaderboard.slice(3, 20);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
              <p className="text-gray-600">Top students by TLC tokens earned</p>
            </div>
            <TokenBadge balance={user.tlcBalance} />
          </div>
          
          {userEntry && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getRankIcon(userEntry.rank)}
                  <div>
                    <div className="font-semibold text-gray-800">Your Rank</div>
                    <div className="text-sm text-gray-600">
                      #{userEntry.rank} out of {leaderboard.length} students
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{userEntry.tlcBalance} TLC</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {userEntry.streak} day streak
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Top Performers
          </h2>
          
          <div className="flex items-end justify-center gap-6 mb-6">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="text-center">
                <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg mb-3 flex items-center justify-center">
                  <Medal className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-gray-800">{topThree[1].name}</div>
                <div className="text-sm text-gray-600">{topThree[1].tlcBalance} TLC</div>
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {topThree[1].streak}
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {topThree[0] && (
              <div className="text-center">
                <div className="w-24 h-20 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg mb-3 flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="font-bold text-gray-800 text-lg">{topThree[0].name}</div>
                <div className="text-sm text-gray-600 font-semibold">{topThree[0].tlcBalance} TLC</div>
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {topThree[0].streak}
                </div>
                <div className="mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  👑 Champion
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {topThree[2] && (
              <div className="text-center">
                <div className="w-20 h-14 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg mb-3 flex items-center justify-center">
                  <Medal className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-gray-800">{topThree[2].name}</div>
                <div className="text-sm text-gray-600">{topThree[2].tlcBalance} TLC</div>
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {topThree[2].streak}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Rankings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">All Rankings</h2>
          </div>
          
          <div className="space-y-3">
            {leaderboard.slice(0, 20).map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  entry.name === user.name 
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                    getRankBadge(entry.rank)
                  }`}>
                    #{entry.rank}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getRankIcon(entry.rank)}
                    <div>
                      <div className={`font-semibold ${
                        entry.name === user.name ? 'text-blue-800' : 'text-gray-800'
                      }`}>
                        {entry.name}
                        {entry.name === user.name && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span>{entry.tlcBalance} TLC</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500" />
                          {entry.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {entry.rank <= 3 && (
                    <div className="text-xs font-medium text-yellow-600 mb-1">
                      🎁 Special Rewards
                    </div>
                  )}
                  {entry.rank <= 10 && (
                    <div className="text-xs text-blue-600 font-medium">
                      🏆 Top 10
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {leaderboard.length > 20 && (
            <div className="text-center mt-6 text-gray-500">
              Showing top 20 of {leaderboard.length} students
            </div>
          )}
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Rank Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-800">Top 1</div>
              <div className="text-sm text-gray-600">Champion Badge + 100 Bonus TLC</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Medal className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-800">Top 3</div>
              <div className="text-sm text-gray-600">Podium Badge + 50 Bonus TLC</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-800">Top 10</div>
              <div className="text-sm text-gray-600">Elite Badge + 25 Bonus TLC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};