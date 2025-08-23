import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  color = 'bg-blue-500',
  size = 'md',
  showPercentage = true
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]}`}>
        <div
          className={`${color} ${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1">
          {progress}/{total} ({percentage}%)
        </div>
      )}
    </div>
  );
};