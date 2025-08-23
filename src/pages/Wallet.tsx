import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Calendar, Award } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';

export const Wallet: React.FC = () => {
  const user = tlcService.getCurrentUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const getTransactionStats = () => {
    const totalEarned = user.transactions
      .filter(t => t.type === 'earn')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const totalRedeemed = user.transactions
      .filter(t => t.type === 'redeem')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const thisWeekTransactions = user.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return transactionDate >= weekAgo;
    });
    
    const thisWeekEarned = thisWeekTransactions
      .filter(t => t.type === 'earn')
      .reduce((acc, t) => acc + t.amount, 0);
    
    return { totalEarned, totalRedeemed, thisWeekEarned };
  };

  const stats = getTransactionStats();

  const getTransactionIcon = (transaction: any) => {
    if (transaction.type === 'earn') {
      if (transaction.description.includes('quiz')) return '🧠';
      if (transaction.description.includes('game')) return '🎮';
      if (transaction.description.includes('lesson') || transaction.description.includes('course')) return '📚';
      if (transaction.description.includes('streak') || transaction.description.includes('login')) return '🔥';
      if (transaction.description.includes('bonus')) return '🎁';
      return '⭐';
    } else {
      if (transaction.description.includes('Recharge')) return '📱';
      if (transaction.description.includes('Data')) return '📶';
      if (transaction.description.includes('Credit')) return '💰';
      return '🎁';
    }
  };

  const groupTransactionsByDate = () => {
    const grouped: { [key: string]: any[] } = {};
    
    user.transactions.slice().reverse().forEach(transaction => {
      const date = new Date(transaction.date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });
    
    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Wallet className="w-8 h-8 text-blue-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
              <p className="text-gray-600">Track your TLC tokens and transaction history</p>
            </div>
          </div>
          
          <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <div className="mb-4">
              <TokenBadge balance={user.tlcBalance} size="lg" />
            </div>
            <p className="text-gray-600">Current Balance</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Earned</div>
                <div className="text-xl font-bold text-gray-800">{stats.totalEarned} TLC</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Redeemed</div>
                <div className="text-xl font-bold text-gray-800">{stats.totalRedeemed} TLC</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">This Week</div>
                <div className="text-xl font-bold text-gray-800">+{stats.thisWeekEarned} TLC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
          </div>
          
          {Object.keys(groupedTransactions).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-sm font-medium text-gray-500">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          transaction.type === 'earn' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{getTransactionIcon(transaction)}</div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                              {transaction.orderId && (
                                <span className="ml-2">• Order: {transaction.orderId}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`font-bold text-lg ${
                          transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} TLC
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No transactions yet</h3>
              <p className="text-gray-400 mb-6">Start learning to earn your first TLC tokens!</p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
              >
                Start Learning
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};