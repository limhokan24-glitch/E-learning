"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: any) => void;
}

export default function AddQuestionModal({
  isOpen,
  onClose,
  onAdd,
}: AddQuestionModalProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [points, setPoints] = useState(1);
  const [explanation, setExplanation] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black">
              Add New Question
            </h2>
            <p className="text-sm text-gray-500">
              Create a new question for this quiz
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Question Type */}
          <div>
            <label className="text-black block text-sm font-medium mb-1 text-left">
              Question Type
            </label>
            <input
              placeholder="Multiple Choice"
              
              className="text-black w-full rounded-lg bg-gray-50 px-4 py-3 text-sm"
            />
          </div>

          {/* Question */}
          <div>
            <label className="text-black block text-sm font-medium mb-1 text-left">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              rows={2}
              className=" text-black w-full rounded-lg bg-gray-50 px-4 py-3 text-sm
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Answer Options */}
          <div>
            <label className="text-black block text-sm font-medium mb-2 text-left">
              Answer Options
            </label>

            <div className="space-y-3">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-4">
                  {/* Radio dot */}
                  <input
                    type="radio"
                    name="correct"
                    checked={correctIndex === i}
                    onChange={() => setCorrectIndex(i)}
                    className="accent-red-500"
                  />

                  {/* Option input */}
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const copy = [...options];
                      copy[i] = e.target.value;
                      setOptions(copy);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    className="w-full rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Select the correct answer
            </p>
          </div>

          {/* Points */}
          <div>
            <label className="text-black block text-sm font-medium mb-1 text-left">
              Points
            </label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="text-black w-full rounded-lg bg-gray-50 px-4 py-3 text-sm"
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="text-black block text-sm font-medium mb-1 text-left">
              Explanation (Optional)
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Provide an explanation for the correct answer..."
              rows={2}
              className=" text-black w-full rounded-lg bg-gray-50 px-4 py-3 text-sm
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="rounded-lg border px-6 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd({
                question,
                options,
                correctIndex,
                points,
                explanation,
              });
              onClose();
            }}
            className="rounded-lg bg-red-600 px-6 py-2 text-sm text-white hover:bg-red-700"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
