import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../services/types';
import { CheckCircle, XCircle, Trophy, Coins } from 'lucide-react';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete
        setQuizComplete(true);
        setShowResult(true);
      }
    }
  };

  const getQuizResults = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinishQuiz = () => {
    const correctAnswers = getQuizResults();
    const baseTokens = 5;
    const correctTokens = correctAnswers * 2;
    const perfectBonus = correctAnswers === quiz.questions.length ? 10 : 0;
    const totalTokens = baseTokens + correctTokens + perfectBonus;

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: quiz.id,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      tlcEarned: totalTokens,
      attemptDate: new Date().toISOString()
    };

    onComplete(attempt);
  };

  if (showResult) {
    const correctAnswers = getQuizResults();
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    const baseTokens = 5;
    const correctTokens = correctAnswers * 2;
    const perfectBonus = correctAnswers === quiz.questions.length ? 10 : 0;
    const totalTokens = baseTokens + correctTokens + perfectBonus;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          {percentage >= 80 ? (
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          ) : percentage >= 60 ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h2>
          
          <div className="text-lg text-gray-600 mb-4">
            You scored {correctAnswers} out of {quiz.questions.length} ({percentage}%)
          </div>
          
          <div className="flex items-center justify-center gap-2 text-yellow-600 font-semibold">
            <Coins className="w-5 h-5" />
            <span>+{totalTokens} TLC earned</span>
          </div>
          
          {perfectBonus > 0 && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              🎉 Perfect score bonus: +{perfectBonus} TLC!
            </div>
          )}
        </div>
        
        <button
          onClick={handleFinishQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h3>
      </div>
      
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`
              w-full p-4 text-left rounded-2xl border-2 transition-all duration-200
              ${selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center
                ${selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
              `}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`
            px-6 py-3 rounded-2xl font-semibold transition-all duration-200
            ${selectedAnswer !== null
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};