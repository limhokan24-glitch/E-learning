// src/components/AddQuestionModal.tsx
"use client";
import React, { useState } from "react";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: any) => void;
}

export default function AddQuestionModal({ isOpen, onClose, onAdd }: AddQuestionModalProps) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [points, setPoints] = useState(1);
  const [explanation, setExplanation] = useState("");

  if (!isOpen) return null;

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || correctAnswerIndex === null || options.some((opt) => !opt)) {
      alert("Please fill in the question, all options, and select a correct answer.");
      return;
    }

    const newQuestion = {
      questionText,
      options,
      correctAnswerIndex,
      points,
      explanation,
      type: "Multiple Choice", // Hardcoded based on image
    };

    onAdd(newQuestion);
    
    // Reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
    setPoints(1);
    setExplanation("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-[#1B1B3A]">Add New Question</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <p className="text-sm text-gray-500 mb-6">Create a new question for this quiz</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question Type */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Question Type</label>
            <div className="w-full p-3 bg-gray-100 border border-transparent rounded-lg text-gray-700">
              Multiple Choice
            </div>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Question</label>
            <input
              type="text"
              placeholder="Enter your question here..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>


          {/* Answer Options */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Answer Options</label>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswerIndex === index}
                    onChange={() => setCorrectAnswerIndex(index)}
                    className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300"
                    title="Select as correct answer"
                  />
                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`} // Option A, B, C...
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-1">Select the correct answer via the radio button</p>
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Points</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Explanation (Optional)</label>
            <textarea
              rows={3}
              placeholder="Provide an explanation for the correct answer..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E53E3E] text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
