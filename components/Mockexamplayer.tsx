"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseClient";

// Allow flexible types to handle messy database data
type Question = {
  question?: string;      // Option A
  questionText?: string;  // Option B
  options: string[];
  answer?: string;        // Option A (String match)
  correctAnswerIndex?: number; // Option B (Index match)
};

type MockExam = {
  id: string;
  title: string;
  module: string;
  questions: Question[];
  duration?: number;
};

type AnswerRecord = {
  question: string;
  selectedOption: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export default function MockExamPlayer({ exam }: { exam: MockExam }) {
  const router = useRouter();

  // Safety Check: If no questions exist, show a clear error
  if (!exam.questions || exam.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        This exam has no questions loaded.
      </div>
    );
  }

  const calculatedDuration = exam.duration || Math.ceil(exam.questions.length * 1.5);
  const totalSeconds = calculatedDuration * 60;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    if (secondsLeft <= 0) {
      finishExam(score);
      return;
    }
    const interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, isFinished, score]);

  // --- SAVE LOGIC ---
  const saveExamResult = async (finalScore: number) => {
    const user = auth.currentUser;
    if (!user) return;

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      const timeTakenSec = totalSeconds - secondsLeft;

      await fetch("https://backend-rauth.vercel.app/api/progress/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          examId: exam.id,
          score: finalScore,
          timeTaken: timeTakenSec,
        }),
      });
      console.log("Exam progress saved!");
    } catch (error) {
      console.error("Failed to save exam:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // --- HANDLE NEXT ---
  const handleNext = () => {
    if (selectedOptionIndex === null) return;

    const currentQuestion = exam.questions[currentIndex];
    
    // 🛠 ROBUST CHECKING: Handle both Index and String answers
    let isCorrect = false;
    let correctAnswerText = "Unknown";

    // Case 1: Database has 'correctAnswerIndex' (Number)
    if (typeof currentQuestion.correctAnswerIndex === 'number') {
        isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;
        correctAnswerText = currentQuestion.options[currentQuestion.correctAnswerIndex];
    } 
    // Case 2: Database has 'answer' (String)
    else if (currentQuestion.answer) {
        const selectedText = currentQuestion.options[selectedOptionIndex];
        isCorrect = selectedText === currentQuestion.answer;
        correctAnswerText = currentQuestion.answer;
    }

    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    // 🛠 ROBUST DISPLAY: Handle both 'question' and 'questionText'
    const questionDisplay = currentQuestion.questionText || currentQuestion.question || "Question text missing";


    const newRecord: AnswerRecord = {
      question: questionDisplay,
      selectedOption: currentQuestion.options[selectedOptionIndex],
      correctAnswer: correctAnswerText,
      isCorrect: isCorrect,
    };
    setHistory((prev) => [...prev, newRecord]);

    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      finishExam(newScore);
    }
  };

  const finishExam = (finalScore: number) => {
    saveExamResult(finalScore);
    setIsFinished(true);
  };

  const handleExit = () => {
    if (confirm("Are you sure? Your progress will NOT be saved.")) {
      router.push("/mock-exam");
    }
  };

  // --- RENDER ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Exam Completed</h2>
            {isSaving && <p className="text-xs text-blue-500 mb-2">Saving your results...</p>}
            
            <div className="my-6 p-6 bg-gray-50 rounded-xl border border-gray-100 inline-block min-w-[200px]">
              <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Your Score</span>
              <span className="text-5xl font-black text-red-600">{score} / {exam.questions.length}</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b">Detailed Review</h3>
            <div className="space-y-8">
              {history.map((record, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-400 min-w-[24px] mt-1">{index + 1}.</span>
                    <p className="font-semibold text-gray-800 text-lg leading-relaxed">{record.question}</p>
                  </div>
                  <div className="pl-9 space-y-2 mt-1">
                    <div className={`p-4 rounded-lg border-l-4 text-sm font-medium ${
                      record.isCorrect ? "bg-green-50 border-green-500 text-green-900" : "bg-red-50 border-red-500 text-red-900"
                    }`}>
                      <span className="opacity-60 text-xs uppercase mr-2 font-bold">You Selected:</span>
                      {record.selectedOption} {record.isCorrect ? "✅" : "❌"}
                    </div>
                    {!record.isCorrect && (
                       <div className="p-4 rounded-lg border-l-4 border-gray-400 bg-gray-100 text-gray-700 text-sm font-medium">
                        <span className="opacity-60 text-xs uppercase mr-2 font-bold">Correct Answer:</span>
                        {record.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => router.push("/mock-exam")} className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg text-lg">
            Return to Exam Menu
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentIndex];
  // 🛠 Normalize Text: Check both fields
  const questionText = currentQuestion.questionText || currentQuestion.question || "Question text missing";
  
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const progress = ((currentIndex + 1) / exam.questions.length) * 100;


  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 md:px-8 py-6 font-sans">
      <div className="text-xs text-gray-600 mb-4 font-medium tracking-wide">MOCK EXAM MODE</div>
      
      <div className="bg-[#FFF5E6] border border-red-200 rounded-xl px-6 py-5 flex justify-between items-start shadow-sm">
        <div className="flex-1 mr-4">
          <h2 className="text-sm font-bold text-gray-800 leading-tight">{exam.title}</h2>
          <p className="text-xs text-gray-600 mt-1">Question {currentIndex + 1} of {exam.questions.length}</p>
          <div className="mt-3 w-full bg-red-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="text-right min-w-[80px]">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Time Left</p>
          <p className={`font-mono font-bold text-lg mt-0.5 ${secondsLeft < 60 ? 'text-red-600 animate-pulse' : 'text-red-500'}`}>
            {minutes}:{seconds}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-8 mt-6">
        {/* 🛠 Display the robust text variable */}
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-8 leading-relaxed">
          {questionText}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOptionIndex(idx)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm md:text-base
                ${selectedOptionIndex === idx ? "bg-red-50 border-red-500 text-red-900 shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-gray-50"}`}
            >
              <span className="mr-3 font-bold text-gray-400">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100 gap-4">
          <button onClick={handleExit} className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Exit Exam
          </button>
          <button
            onClick={handleNext}
            disabled={selectedOptionIndex === null}
            className={`flex-1 py-3 rounded-lg text-sm font-bold shadow-md transition-all
              ${selectedOptionIndex === null ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg"}`}
          >
            {currentIndex === exam.questions.length - 1 ? "Submit Exam" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
