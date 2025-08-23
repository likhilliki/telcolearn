import React, { useState, useEffect } from 'react';
import { Clock, Zap, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface GameSpeedMCQProps {
  onGameComplete: (score: number) => void;
}

const speedQuestions: Question[] = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Unit", "Computer Processing Unit"],
    correctAnswer: 0
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2
  },
  {
    question: "What is 15 × 4?",
    options: ["45", "60", "55", "50"],
    correctAnswer: 1
  },
  {
    question: "Which programming language is known for web styling?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: 1
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2
  },
  {
    question: "Which is NOT a prime number?",
    options: ["7", "11", "13", "15"],
    correctAnswer: 3
  },
  {
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "HyperText Transport Protocol", "HighText Transfer Protocol", "HyperText Transmission Protocol"],
    correctAnswer: 0
  },
  {
    question: "Which is the smallest unit of data?",
    options: ["Byte", "Bit", "Kilobyte", "Nibble"],
    correctAnswer: 1
  },
  {
    question: "What is 2^8?",
    options: ["256", "128", "512", "64"],
    correctAnswer: 0
  },
  {
    question: "Which company created React?",
    options: ["Google", "Microsoft", "Facebook", "Apple"],
    correctAnswer: 2
  }
];

export const GameSpeedMCQ: React.FC<GameSpeedMCQProps> = ({ onGameComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, gameActive]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameActive) return;
    
    setSelectedAnswer(answerIndex);
    setGameActive(false);
    
    if (answerIndex === speedQuestions[currentQuestion].correctAnswer) {
      const timeBonus = timeLeft * 2;
      setScore(score + 10 + timeBonus);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < speedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setSelectedAnswer(null);
      setGameActive(true);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setSelectedAnswer(null);
    setGameActive(true);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Complete!</h2>
        <div className="text-lg text-gray-600 mb-4">
          Final Score: {score} points
        </div>
        <div className="text-sm text-green-600 font-medium mb-6">
          You earned {Math.min(Math.floor(score / 10), 30)} TLC!
        </div>
        <div className="space-y-3">
          <button
            onClick={() => onGameComplete(score)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            Continue
          </button>
          <button
            onClick={handlePlayAgain}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = speedQuestions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1}/{speedQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            <span className={`font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-gray-700'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / speedQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>
        
        <div className="text-right text-lg font-semibold text-blue-600">
          Score: {score}
        </div>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 ";
          
          if (selectedAnswer !== null) {
            if (index === question.correctAnswer) {
              buttonClass += "border-green-500 bg-green-50 text-green-700";
            } else if (index === selectedAnswer) {
              buttonClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              buttonClass += "border-gray-200 bg-gray-100 text-gray-500";
            }
          } else {
            buttonClass += "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100";
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={!gameActive}
              className={buttonClass}
            >
              <span className="font-medium">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};