import React, { useState } from 'react';
import { X, Gift, Coins, Check } from 'lucide-react';
import { RedemptionItem } from '../services/types';
import Confetti from 'react-confetti';

interface RedeemModalProps {
  item: RedemptionItem | null;
  userBalance: number;
  onClose: () => void;
  onConfirm: (itemId: string) => string | null;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  item,
  userBalance,
  onClose,
  onConfirm
}) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!item) return null;

  const canAfford = userBalance >= item.cost;

  const handleConfirmRedeem = async () => {
    if (!canAfford) return;
    
    setIsRedeeming(true);
    
    // Simulate processing time
    setTimeout(() => {
      const orderId = onConfirm(item.id);
      if (orderId) {
        setRedeemSuccess(orderId);
        setShowConfetti(true);
        
        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
      setIsRedeeming(false);
    }, 2000);
  };

  if (redeemSuccess) {
    return (
      <>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={100}
          />
        )}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎉 Redemption Successful!
              </h2>
              <p className="text-gray-600 mb-4">
                Your {item.title} has been processed successfully.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-mono font-semibold text-gray-800">{redeemSuccess}</p>
              </div>
              <p className="text-sm text-gray-500">
                You will receive your reward within 24 hours.
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Confirm Redemption</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Cost:</span>
              <span className="flex items-center gap-1 font-semibold">
                <Coins size={16} className="text-yellow-500" />
                {item.cost} TLC
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your balance:</span>
              <span className="flex items-center gap-1 font-semibold">
                <Coins size={16} className="text-yellow-500" />
                {userBalance} TLC
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="text-gray-600">After redemption:</span>
              <span className={`flex items-center gap-1 font-semibold ${
                canAfford ? 'text-green-600' : 'text-red-600'
              }`}>
                <Coins size={16} className="text-yellow-500" />
                {canAfford ? (userBalance - item.cost) : userBalance} TLC
              </span>
            </div>
          </div>
          
          {!canAfford && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                Insufficient TLC balance. You need {item.cost - userBalance} more TLC.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-2xl font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmRedeem}
            disabled={!canAfford || isRedeeming}
            className={`
              flex-1 px-4 py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2
              ${canAfford && !isRedeeming
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isRedeeming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Gift size={16} />
                Redeem Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};