import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, RotateCcw, Database, AlertTriangle } from 'lucide-react';
import { tlcService } from '../services/tlc';

export const Admin: React.FC = () => {
  const user = tlcService.getCurrentUser();

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      tlcService.resetAllData();
      alert('All data has been reset successfully!');
      window.location.href = '/login';
    }
  };

  const handleAddSampleData = () => {
    if (window.confirm('Add 1000 bonus TLC tokens and sample transactions?')) {
      tlcService.awardTokens(1000, 'Admin bonus tokens');
      tlcService.awardTokens(50, 'Sample course completion');
      tlcService.awardTokens(25, 'Sample quiz bonus');
      alert('Sample data added successfully!');
      window.location.reload();
    }
  };

  const getSystemStats = () => {
    const userData = localStorage.getItem('telcolearn_user');
    const userDataSize = userData ? new Blob([userData]).size : 0;
    
    const totalTransactions = user?.transactions.length || 0;
    const totalBalance = user?.tlcBalance || 0;
    const storageKeys = Object.keys(localStorage).filter(key => key.startsWith('telcolearn_'));
    
    return {
      userDataSize: Math.round(userDataSize / 1024 * 100) / 100, // KB
      totalTransactions,
      totalBalance,
      storageKeys: storageKeys.length
    };
  };

  const stats = getSystemStats();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Settings className="w-8 h-8 text-purple-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600">Manage app data and settings</p>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Storage Size</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.userDataSize} KB</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-600">Transactions</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.totalTransactions}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-600">TLC Balance</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.totalBalance}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-600">Storage Keys</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{stats.storageKeys}</div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Current User Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Profile</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Name:</span> {user.name}</div>
                <div><span className="text-gray-600">Email:</span> {user.email}</div>
                <div><span className="text-gray-600">Phone:</span> {user.phone}</div>
                <div><span className="text-gray-600">Track:</span> {user.selectedTrack || 'Not selected'}</div>
                <div><span className="text-gray-600">Login Streak:</span> {user.loginStreak} days</div>
                <div><span className="text-gray-600">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Activity</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Completed Courses:</span> {user.completedCourses.length}</div>
                <div><span className="text-gray-600">Quiz Attempts:</span> {user.quizAttempts.length}</div>
                <div><span className="text-gray-600">Games Played:</span> {user.gameScores.length}</div>
                <div><span className="text-gray-600">Total Transactions:</span> {user.transactions.length}</div>
                <div><span className="text-gray-600">TLC Balance:</span> {user.tlcBalance}</div>
                <div><span className="text-gray-600">Last Login:</span> {user.lastLoginDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Admin Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Add Sample Data</h3>
                  <p className="text-sm text-gray-600">Add test tokens and transactions</p>
                </div>
              </div>
              <button
                onClick={handleAddSampleData}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                Add 1000 TLC + Sample Data
              </button>
            </div>
            
            <div className="border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Reset All Data</h3>
                  <p className="text-sm text-gray-600">Clear all localStorage data</p>
                </div>
              </div>
              <button
                onClick={handleResetData}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                ⚠️ Reset Everything
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Important Notes</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All data is stored in localStorage (browser storage)</li>
              <li>• Resetting data will log you out and clear all progress</li>
              <li>• This is a demo app - no real transactions are processed</li>
              <li>• Refresh the page after making changes to see updates</li>
            </ul>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Export</h2>
          <p className="text-gray-600 mb-4">Export your data for backup or analysis:</p>
          
          <button
            onClick={() => {
              const dataExport = {
                user,
                tracks: tlcService.getTracks(),
                redemptionItems: tlcService.getRedemptionItems(),
                leaderboard: tlcService.getLeaderboard(),
                exportDate: new Date().toISOString()
              };
              
              const dataStr = JSON.stringify(dataExport, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `telcolearn-data-${new Date().toISOString().split('T')[0]}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            📁 Download Data Export
          </button>
        </div>
      </div>
    </div>
  );
};