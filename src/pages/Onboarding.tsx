import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { tlcService } from '../services/tlc';

export const Onboarding: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState('');
  const navigate = useNavigate();
  const tracks = tlcService.getTracks();

  const handleTrackSelection = () => {
    if (selectedTrack) {
      tlcService.updateUserTrack(selectedTrack);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a specialization that interests you most. You can always explore other tracks later!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tracks.map(track => (
            <div
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`
                relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl
                ${selectedTrack === track.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
              `}
            >
              {selectedTrack === track.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
              
              <div className={`w-16 h-16 ${track.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                {track.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {track.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {track.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  Learning Modules:
                </div>
                {track.modules.slice(0, 3).map((module, index) => (
                  <div key={module.id} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {module.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={handleTrackSelection}
            disabled={!selectedTrack}
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all
              ${selectedTrack
                ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Start Learning Journey
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};