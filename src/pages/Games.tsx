import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Zap, Brain, Trophy, Star } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';
import { GameSpeedMCQ } from '../components/GameSpeedMCQ';
import { GameMemory } from '../components/GameMemory';
import { GameScore } from '../services/types';

export const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<'speed-quiz' | 'memory-match' | null>(null);
  
  const user = tlcService.getCurrentUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleGameComplete = (gameType: 'speed-quiz' | 'memory-match', score: number) => {
    tlcService.submitGameScore(gameType, score);
    setSelectedGame(null);
    
    // Reload to update user data
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const getGameStats = () => {
    const speedQuizScores = user.gameScores.filter(g => g.gameType === 'speed-quiz');
    const memoryScores = user.gameScores.filter(g => g.gameType === 'memory-match');
    
    const totalGames = user.gameScores.length;
    const totalEarned = user.gameScores.reduce((acc, game) => acc + game.tlcEarned, 0);
    const bestSpeedScore = speedQuizScores.length > 0 ? Math.max(...speedQuizScores.map(g => g.score)) : 0;
    const bestMemoryScore = memoryScores.length > 0 ? Math.max(...memoryScores.map(g => g.score)) : 0;
    
    return { totalGames, totalEarned, bestSpeedScore, bestMemoryScore };
  };

  const stats = getGameStats();

  const games = [
    {
      id: 'speed-quiz' as const,
      title: 'Speed Quiz',
      description: 'Answer questions quickly to maximize your score',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      color: 'from-yellow-500 to-orange-500',
      maxTokens: 30,
      bestScore: stats.bestSpeedScore
    },
    {
      id: 'memory-match' as const,
      title: 'Memory Match',
      description: 'Match pairs of cards to test your memory',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500 to-pink-500',
      maxTokens: 30,
      bestScore: stats.bestMemoryScore
    }
  ];

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">
                  {selectedGame === 'speed-quiz' ? 'Speed Quiz' : 'Memory Match'}
                </h1>
              </div>
              <TokenBadge balance={user.tlcBalance} />
            </div>
          </div>
          
          {selectedGame === 'speed-quiz' && (
            <GameSpeedMCQ onGameComplete={(score) => handleGameComplete('speed-quiz', score)} />
          )}
          {selectedGame === 'memory-match' && (
            <GameMemory onGameComplete={(score) => handleGameComplete('memory-match', score)} />
          )}
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
            <Gamepad2 className="w-8 h-8 text-green-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Mini Games</h1>
              <p className="text-gray-600">Play fun games and earn TLC tokens</p>
            </div>
            <TokenBadge balance={user.tlcBalance} />
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Games Played</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.totalGames}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <TokenBadge balance={0} size="sm" />
              <span className="text-sm font-medium text-gray-600">Tokens Earned</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.totalEarned}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Best Speed</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.bestSpeedScore}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Best Memory</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.bestMemoryScore}</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`bg-gradient-to-r ${game.color} p-6`}>
                <div className="flex items-center justify-between text-white mb-4">
                  {game.icon}
                  <div className="text-right">
                    <div className="text-sm opacity-90">Max Reward</div>
                    <div className="font-semibold">{game.maxTokens} TLC</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{game.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                {game.bestScore > 0 && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">Best Score: </span>
                    <span className="font-semibold text-gray-800">{game.bestScore}</span>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedGame(game.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Scores */}
        {user.gameScores.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Scores</h2>
            <div className="space-y-3">
              {user.gameScores.slice(-5).reverse().map((gameScore) => (
                <div key={gameScore.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {gameScore.gameType === 'speed-quiz' ? (
                      <Zap className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Brain className="w-5 h-5 text-purple-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">
                        {gameScore.gameType === 'speed-quiz' ? 'Speed Quiz' : 'Memory Match'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(gameScore.playedDate).toLocaleDateString()} • Score: {gameScore.score}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      +{gameScore.tlcEarned} TLC
                    </div>
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