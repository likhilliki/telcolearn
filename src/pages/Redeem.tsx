import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Filter, Search } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';
import { RedeemModal } from '../components/RedeemModal';
import { RedemptionItem } from '../services/types';

export const Redeem: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<RedemptionItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const user = tlcService.getCurrentUser();
  const items = tlcService.getRedemptionItems();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleRedeemConfirm = (itemId: string) => {
    return tlcService.redeemItem(itemId);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    // Refresh the page to update user balance
    window.location.reload();
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '🎁' },
    { id: 'recharge', name: 'Mobile Recharge', icon: '📱' },
    { id: 'data', name: 'Data Packs', icon: '📶' },
    { id: 'credit', name: 'Bill Credits', icon: '💰' }
  ];

  const getRedemptionStats = () => {
    const redemptions = user.transactions.filter(t => t.type === 'redeem');
    const totalRedemptions = redemptions.length;
    const totalSpent = redemptions.reduce((acc, t) => acc + t.amount, 0);
    const lastRedemption = redemptions.length > 0 ? redemptions[redemptions.length - 1] : null;
    
    return { totalRedemptions, totalSpent, lastRedemption };
  };

  const stats = getRedemptionStats();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Gift className="w-8 h-8 text-red-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Redeem Rewards</h1>
              <p className="text-gray-600">Use your TLC tokens for amazing telco benefits</p>
            </div>
            <TokenBadge balance={user.tlcBalance} size="lg" />
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{stats.totalRedemptions}</div>
              <div className="text-sm text-gray-600">Total Redemptions</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{stats.totalSpent}</div>
              <div className="text-sm text-gray-600">TLC Spent</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{user.tlcBalance}</div>
              <div className="text-sm text-gray-600">Available Balance</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-colors ${
                      filterCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search */}
            <div className="md:w-80">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Search</span>
              </div>
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const canAfford = user.tlcBalance >= item.cost;
            
            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`p-6 ${
                  item.category === 'recharge' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  item.category === 'data' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  'bg-gradient-to-r from-purple-500 to-purple-600'
                }`}>
                  <div className="flex items-center justify-between text-white mb-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Cost</div>
                      <div className="text-xl font-bold">{item.cost} TLC</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      {canAfford ? '✅ Available' : '❌ Insufficient TLC'}
                    </div>
                    {!canAfford && (
                      <div className="text-sm text-red-600 font-medium">
                        Need {item.cost - user.tlcBalance} more TLC
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedItem(item)}
                    disabled={!canAfford}
                    className={`w-full px-6 py-3 rounded-2xl font-semibold transition-colors ${
                      canAfford
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Now' : 'Not Enough TLC'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No rewards found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Recent Redemptions */}
        {stats.totalRedemptions > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Redemptions</h2>
            <div className="space-y-3">
              {user.transactions
                .filter(t => t.type === 'redeem')
                .slice(-3)
                .reverse()
                .map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                        {transaction.orderId && ` • ${transaction.orderId}`}
                      </div>
                    </div>
                    <div className="text-red-600 font-semibold">
                      -{transaction.amount} TLC
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <RedeemModal
        item={selectedItem}
        userBalance={user.tlcBalance}
        onClose={handleModalClose}
        onConfirm={handleRedeemConfirm}
      />
    </div>
  );
};