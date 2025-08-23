import React, { useState, useEffect } from 'react';
import { Brain, Trophy, RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameMemoryProps {
  onGameComplete: (score: number) => void;
}

const emojis = ['🎯', '🚀', '💎', '🎨', '🔥', '⭐', '🌟', '💫'];

export const GameMemory: React.FC<GameMemoryProps> = ({ onGameComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!gameComplete) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      
      if (flippedCards[0].emoji === flippedCards[1].emoji) {
        // Match found
        setCards(prev => prev.map(card => 
          card.emoji === flippedCards[0].emoji 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(matches + 1);
        setFlippedCards([]);
        
        if (matches + 1 === emojis.length) {
          setGameComplete(true);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            flippedCards.some(fc => fc.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, matches]);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimeElapsed(0);
    setGameComplete(false);
  };

  const handleCardClick = (clickedCard: Card) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    const newFlippedCard = { ...clickedCard, isFlipped: true };
    
    setCards(prev => prev.map(card => 
      card.id === clickedCard.id ? newFlippedCard : card
    ));
    
    setFlippedCards(prev => [...prev, newFlippedCard]);
  };

  const calculateScore = () => {
    const baseScore = matches * 50;
    const timeBonus = Math.max(0, 300 - timeElapsed) * 2; // Bonus for quick completion
    const movesPenalty = Math.max(0, moves - 16) * 5; // Penalty for too many moves
    return Math.max(10, baseScore + timeBonus - movesPenalty);
  };

  if (gameComplete) {
    const finalScore = calculateScore();
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
        <div className="text-lg text-gray-600 mb-4">
          You completed the memory game!
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-semibold text-gray-800">Time</div>
            <div className="text-gray-600">{timeElapsed}s</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-semibold text-gray-800">Moves</div>
            <div className="text-gray-600">{moves}</div>
          </div>
        </div>
        <div className="text-xl font-bold text-blue-600 mb-4">
          Score: {finalScore} points
        </div>
        <div className="text-sm text-green-600 font-medium mb-6">
          You earned {Math.min(Math.floor(finalScore / 10), 30)} TLC!
        </div>
        <div className="space-y-3">
          <button
            onClick={() => onGameComplete(finalScore)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            Continue
          </button>
          <button
            onClick={initializeGame}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">Memory Match</h3>
          </div>
          <div className="text-sm text-gray-500">
            {timeElapsed}s
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
          <div>
            <div className="font-semibold text-gray-800">Matches</div>
            <div className="text-blue-600">{matches}/{emojis.length}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Moves</div>
            <div className="text-gray-600">{moves}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Score</div>
            <div className="text-green-600">{calculateScore()}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`
              aspect-square rounded-xl text-2xl font-bold transition-all duration-300
              ${card.isFlipped || card.isMatched 
                ? 'bg-white border-2 border-blue-200 shadow-md transform scale-105' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
              }
              ${card.isMatched ? 'opacity-75' : ''}
            `}
            disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
          >
            {card.isFlipped || card.isMatched ? card.emoji : ''}
          </button>
        ))}
      </div>
    </div>
  );
};