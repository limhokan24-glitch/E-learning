"use client";
import React, { useState } from "react";
import { FaTimes, FaPlus, FaCheckCircle } from "react-icons/fa";
import { createQuiz } from "@/src/services/Quizservice"; // Ensure this service exists

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateQuizModal({ isOpen, onClose, onSuccess }: CreateQuizModalProps) {
  // Quiz Meta State
  const [title, setTitle] = useState("");
  
  // Stored Questions (Added via "Add Another Question")
  const [questions, setQuestions] = useState<any[]>([]);

  // Current Question Form State
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");

  if (!isOpen) return null;

  // --- HANDLERS ---

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Validates the current form inputs
  const validateCurrentForm = () => {
    if (!currentQuestion.trim()) return false;
    if (options.some((opt) => !opt.trim())) return false;
    if (correctIndex === null) return false;
    return true;
  };

  // 1. Logic for "+ Add Another Question"
  const handleAddAnotherQuestion = () => {
    if (!validateCurrentForm()) {
      alert("Please fill out the current question, all options, and select a correct answer before adding another.");
      return;
    }

    // Add current form data to the questions array
    const newQ = {
      questionText: currentQuestion,
      options,
      correctAnswerIndex: correctIndex,
      explanation,
      type: "Multiple Choice",
      points: 1,
    };

    setQuestions([...questions, newQ]);

    // Reset Form for the next question
    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setExplanation("");
    
    // Optional: Visual cue
    alert("Question added! You can now type the next one.");
  };

  // 2. Logic for "Create Quiz"
  const handleSubmitQuiz = async () => {
    if (!title.trim()) {
      alert("Please enter a Quiz Title.");
      return;
    }

    // Capture any data currently in the inputs if the user forgot to click "Add"
    let finalQuestions = [...questions];
    const isFormDirty = currentQuestion || options.some(o => o) || explanation;
    
    if (isFormDirty) {
      if (validateCurrentForm()) {
        const currentQ = {
          questionText: currentQuestion,
          options,
          correctAnswerIndex: correctIndex,
          explanation,
          type: "Multiple Choice",
          points: 1,
        };
        finalQuestions.push(currentQ);
      } else {
        alert("You have unsaved data in the current question form. Please finish filling it out or clear it.");
        return;
      }
    }

    if (finalQuestions.length === 0) {
      alert("Please add at least one question to create a quiz.");
      return;
    }

    try {
      // --- FIX: EXPANDED PAYLOAD TO MATCH BACKEND SCHEMA ---
      const quizPayload = {
        title: title,
        questions: finalQuestions,
        // REQUIRED FIELDS (Often missing)
        module: "General History", // Hardcoded for demo if no dropdown exists
        description: "A quiz about " + title, 
        quizType: "Multiple Choice", 
        
        // TIMING & SCORING
        duration: 15,          // Backend might expect 'duration' instead of 'timeLimit'
        timeLimit: 15,         // Sending both to be safe
        passingScore: 70,      // Default passing score usually required
        
        // BOOLEAN SETTINGS (From your screenshot)
        shuffleQuestions: false,
        showCorrectAnswers: true,
        allowMultipleAttempts: true,
        
        // METADATA
        createdAt: new Date().toISOString(),
        status: "published"
      };

      console.log("Sending Payload:", quizPayload); // Check console if it still fails

      await createQuiz(quizPayload);
      
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Failed to create quiz", error);
      alert("Error creating quiz. Check console for details.");
    }
  };


  const handleClose = () => {
    // Reset all states
    setTitle("");
    setQuestions([]);
    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setExplanation("");
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        
        {/* --- HEADER --- */}
        <div className="p-6 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[#E53E3E] text-xl font-bold">Create New Quiz</h2>
              <p className="text-gray-400 text-sm mt-1">Add questions and configure your quiz</p>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="p-6 pt-2 overflow-y-auto space-y-5 custom-scrollbar">
          
          {/* Quiz Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title</label>
            <input
              type="text"
              placeholder="e.g., Kingdom of Cambodia"
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <hr className="border-gray-100" />

          {/* Question Counter Badge */}
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold text-gray-800">Add Question</h3>
             {questions.length > 0 && (
               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                 {questions.length} question(s) added
               </span>
             )}
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Question</label>
            <input
              type="text"
              placeholder="Enter your question here..."
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </div>


          {/* Answer Options */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Answer Options</label>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Radio Button for Correct Answer */}
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-full checked:border-green-500 checked:bg-green-500 transition-all cursor-pointer"
                      checked={correctIndex === index}
                      onChange={() => setCorrectIndex(index)}
                    />
                    <FaCheckCircle className="absolute text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  
                  {/* Option Input */}
                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 text-sm ${
                        correctIndex === index ? 'ring-1 ring-green-500 bg-green-50/30' : 'border-transparent focus:ring-red-500'
                    }`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 ml-1">Select the correct answer via the circle.</p>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Explanation (Optional)</label>
            <textarea
              rows={3}
              placeholder="Provide an explanation for the correct answer..."
              className="w-full p-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm resize-none"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>
        </div>

        {/* --- FOOTER BUTTONS --- */}
        <div className="p-6 border-t border-gray-100 bg-white rounded-b-lg mt-auto">
          <div className="flex gap-3">
            {/* Add Another Question Button */}
            <button
              onClick={handleAddAnotherQuestion}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex-1"
            >
              <FaPlus className="text-xs" />
              <span className="whitespace-nowrap">Add Another Question</span>
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleClose}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            {/* Create Quiz Button */}
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 bg-[#E53E3E] text-white rounded-lg text-sm font-bold hover:bg-red-700 transition shadow-sm"
            >
              Create Quiz
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
