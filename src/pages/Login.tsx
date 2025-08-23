import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Mail, GraduationCap } from 'lucide-react';
import { tlcService } from '../services/tlc';

export const Login: React.FC = () => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !contact) return;

    // Check if user already exists
    const existingUser = tlcService.getCurrentUser();
    
    if (existingUser) {
      // Update login streak
      tlcService.updateLoginStreak();
      navigate('/dashboard');
    } else {
      // Create new user
      const email = isPhoneLogin ? `${contact}@telcolearn.com` : contact;
      const phone = isPhoneLogin ? contact : '+91-9999999999';
      
      tlcService.createUser(name, email, phone);
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to TelcoLearn</h1>
          <p className="text-gray-600">Learn, Quiz, Game & Earn TLC Tokens!</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setIsPhoneLogin(true)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  isPhoneLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Smartphone size={16} />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setIsPhoneLogin(false)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  !isPhoneLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail size={16} />
                Email
              </button>
            </div>
            
            <input
              type={isPhoneLogin ? 'tel' : 'email'}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={isPhoneLogin ? '+91 98765 43210' : 'your@email.com'}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
          <p className="mt-2">🔒 Mock authentication - no real data stored</p>
        </div>
      </div>
    </div>
  );
};