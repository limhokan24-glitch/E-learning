"use client";

import { X } from "lucide-react";
import { useState } from "react";
import AddQuestionModal from "@/components/AddQuestionModal";
interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateQuizModal({
  isOpen,
  onClose,
}: CreateQuizModalProps) {
  const [quizTitle, setQuizTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-red-600">
              Create New Quiz
            </h2>
            <p className="text-sm text-gray-500">
              Add questions and configure your quiz
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Quiz Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Quiz Title</label>
            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="e.g., Kingdom of Cambodia"
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
            />
          </div>

          {/* Question */}
          <div>
            <label className="mb-1 block text-sm font-medium">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              rows={2}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
            />
          </div>

          {/* Options */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Answer Options
            </label>

            <div className="space-y-2">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={correctIndex === index}
                    onChange={() => setCorrectIndex(index)}
                  />
                  <input
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Select the correct answer
            </p>
          </div>

          {/* Explanation */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Explanation (Optional)
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Provide an explanation for the correct answer..."
              rows={2}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setOpenQuestionModal(true)}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            + Add Another Question
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log({
                  quizTitle,
                  question,
                  options,
                  correctIndex,
                  explanation,
                });
                onClose();
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Create Quiz
              <AddQuestionModal
                isOpen={openQuestionModal}
                onClose={() => setOpenQuestionModal(false)}
                onAdd={(newQuestion) => {
                  setQuestions((prev) => [...prev, newQuestion]);
                  console.log("All questions:", [...questions, newQuestion]);
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
