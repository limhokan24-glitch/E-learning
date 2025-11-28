"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseClient"; 

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type Quiz = {
  id: string;
  title: string;
  module: string;
  questions: Question[];
};

type AnswerRecord = {
  question: string;
  selectedOption: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export default function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Track Start Time
  const [startTime] = useState(Date.now());

  if (!quiz.questions || quiz.questions.length === 0) {
    return <p className="p-10 text-center">This quiz has no questions.</p>;
  }

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  // --- SAVE FUNCTION ---
  const saveQuizResult = async (finalScore: number) => {
    const user = auth.currentUser;
    if (!user) return; 

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

      await fetch("https://backend-rauth.vercel.app/api/progress/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: quiz.id,
          score: finalScore,
          timeTaken: timeTakenSec,
        }),
      });
      console.log("Quiz progress saved!");
    } catch (error) {
      console.error("Failed to save progress:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    
    // Calculate new score
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const newRecord: AnswerRecord = {
      question: currentQuestion.question,
      selectedOption: selectedOption,
      correctAnswer: currentQuestion.answer,
      isCorrect: isCorrect,
    };
    setHistory((prev) => [...prev, newRecord]);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // 🏁 FINISHED
      saveQuizResult(newScore);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏆</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B3A] mb-2">Quiz Completed!</h2>
            {isSaving && <p className="text-xs text-blue-500 mb-2">Saving your results...</p>}
            
            <div className="text-5xl font-black text-red-500 mb-2">
              {score}/{quiz.questions.length}
            </div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Final Score</p>
          </div>


          {/* Answer Review Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold text-[#1B1B3A] mb-6 border-b pb-4">Answer Review</h3>
            <div className="space-y-8">
              {history.map((record, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-400 min-w-[24px]">{index + 1}.</span>
                    <p className="font-medium text-[#1B1B3A] text-lg">{record.question}</p>
                  </div>

                  <div className="pl-9 space-y-2 mt-2">
                    {/* User Selection */}
                    <div className={`p-3 rounded-lg border-l-4 text-sm font-medium ${
                      record.isCorrect 
                        ? "bg-green-50 border-green-500 text-green-800" 
                        : "bg-red-50 border-red-500 text-red-800"
                    }`}>
                      <span className="block text-xs uppercase opacity-70 mb-1">Your Answer:</span>
                      {record.selectedOption} 
                      {record.isCorrect ? " ✅" : " ❌"}
                    </div>

                    {/* Show Correct Answer ONLY if user was wrong */}
                    {!record.isCorrect && (
                       <div className="p-3 rounded-lg border-l-4 border-gray-400 bg-gray-50 text-gray-700 text-sm font-medium">
                        <span className="block text-xs uppercase opacity-70 mb-1">Correct Answer:</span>
                        {record.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push("/quiz")}
            className="w-full bg-[#1B1B3A] text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition shadow-lg"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  // --- QUIZ GAME SCREEN ---
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => router.back()} className="text-gray-500 hover:text-red-500 transition">
                ← Exit Quiz
            </button>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{quiz.module}</span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
            <span>Question {currentIndex + 1}</span>
            <span>{quiz.questions.length} Total</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B1B3A] mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>


          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                    ${isSelected ? "border-red-500 bg-red-50 text-red-700 font-medium" : "border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-gray-50"}`}
                >
                  <span>{option}</span>
                  {isSelected && <span className="text-red-500 text-xl">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <button
          disabled={!selectedOption}
          onClick={handleNext}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-transform transform active:scale-95
            ${!selectedOption ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" : "bg-red-600 text-white hover:bg-red-700 hover:shadow-xl"}`}
        >
          {currentIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}
