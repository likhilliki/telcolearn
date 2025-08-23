import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Lock, CheckCircle, Award, ArrowLeft } from 'lucide-react';
import { tlcService } from '../services/tlc';
import { TokenBadge } from '../components/TokenBadge';
import { ProgressBar } from '../components/ProgressBar';

export const Courses: React.FC = () => {
  const user = tlcService.getCurrentUser();
  const tracks = tlcService.getTracks();
  const selectedTrack = user?.selectedTrack ? tracks.find(t => t.id === user.selectedTrack) : tracks[0];

  if (!user || !selectedTrack) {
    return <div>Loading...</div>;
  }

  const handleLessonComplete = (lessonId: string) => {
    tlcService.completeLesson(lessonId);
    window.location.reload(); // Simple refresh to update UI
  };

  const getTotalProgress = () => {
    const totalLessons = selectedTrack.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = selectedTrack.modules.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => lesson.isCompleted).length, 0
    );
    return { completed: completedLessons, total: totalLessons };
  };

  const { completed, total } = getTotalProgress();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="text-3xl">{selectedTrack.icon}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{selectedTrack.name}</h1>
              <p className="text-gray-600">{selectedTrack.description}</p>
            </div>
            <TokenBadge balance={user.tlcBalance} />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-500">{completed}/{total} lessons</span>
            </div>
            <ProgressBar progress={completed} total={total} color="bg-green-500" />
          </div>
          
          {completed === total && (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Award className="w-5 h-5" />
              <span>Track Completed! 🎉</span>
            </div>
          )}
        </div>

        {/* Track Selection */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Switch Learning Track</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {tracks.map(track => (
              <button
                key={track.id}
                onClick={() => {
                  tlcService.updateUserTrack(track.id);
                  window.location.reload();
                }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  track.id === selectedTrack.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{track.icon}</div>
                <div className="text-sm font-medium text-gray-800">{track.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {selectedTrack.modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden ${
                module.isLocked ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    module.isLocked ? 'bg-gray-200' : 'bg-blue-100'
                  }`}>
                    {module.isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                </div>
                
                {!module.isLocked && (
                  <>
                    <div className="mb-4">
                      <ProgressBar 
                        progress={module.lessons.filter(l => l.isCompleted).length}
                        total={module.lessons.length}
                        size="sm"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                            lesson.isCompleted
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              lesson.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                            }`}>
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : (
                                <BookOpen className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                              <p className="text-sm text-gray-600">{lesson.content.substring(0, 80)}...</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm font-medium text-yellow-600">
                                +{lesson.tlcReward} TLC
                              </div>
                            </div>
                            
                            {!lesson.isCompleted ? (
                              <button
                                onClick={() => handleLessonComplete(lesson.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                              >
                                Study
                              </button>
                            ) : (
                              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                                ✓ Done
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {module.isLocked && (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">Complete the previous module to unlock</p>
                    <p className="text-sm text-gray-400">
                      Finish all lessons in Module {moduleIndex} first
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};