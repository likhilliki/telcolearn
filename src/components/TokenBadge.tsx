import React from 'react';
import { Coins } from 'lucide-react';

interface TokenBadgeProps {
  balance: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export const TokenBadge: React.FC<TokenBadgeProps> = ({ 
  balance, 
  size = 'md', 
  showAnimation = false 
}) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  };

  return (
    <div className={`
      inline-flex items-center gap-1.5 
      bg-gradient-to-r from-yellow-400 to-yellow-500 
      text-yellow-900 font-semibold rounded-2xl shadow-md
      ${sizeClasses[size]}
      ${showAnimation ? 'animate-pulse' : ''}
    `}>
      <Coins size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      <span>{balance.toLocaleString()} TLC</span>
    </div>
  );
};