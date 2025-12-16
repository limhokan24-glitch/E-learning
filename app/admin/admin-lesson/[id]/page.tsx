"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EditMockExamQuestionsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<"details" | "questions" | "settings">(
    "questions"
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-10 py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/admin/admin-mock-exam"
          className="text-sm text-gray-600 flex items-center gap-2"
        >
          ← Back to Exams
        </Link>

        <button className="bg-red-500 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-600 transition">
          💾 Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <Tab
          label="Exam Details"
          active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        />
        <Tab
          label="Questions (2)"
          active={activeTab === "questions"}
          onClick={() => setActiveTab("questions")}
        />
        <Tab
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </div>

      {/* Questions Header */}
      <div className="flex justify-between items-center mb-4 max-w-5xl">
        <div>
          <h3 className="text-base font-semibold text-[#1B1B3A]">
            Exam Questions
          </h3>
          <p className="text-sm text-gray-500">Total Points: 3</p>
        </div>

        <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition">
          + Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6 max-w-5xl">
        {/* Question 1 */}
        <QuestionCard
          index={1}
          type="Multiple Choice"
          points={2}
          question="When did World War II begin?"
          options={[
            { label: "A", text: "1937", correct: false },
            { label: "B", text: "1939", correct: true },
            { label: "C", text: "1941", correct: false },
            { label: "D", text: "1943", correct: false },
          ]}
        />

        {/* Question 2 */}
        <QuestionCard
          index={2}
          type="True/False"
          points={1}
          question="Lon Nol led Khmer Republic Era (1970–1975)"
          options={[
            { label: "A", text: "True", correct: true },
            { label: "B", text: "False", correct: false },
          ]}
        />
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full border transition ${
        active
          ? "bg-white shadow font-medium"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

function QuestionCard({
  index,
  type,
  points,
  question,
  options,
}: {
  index: number;
  type: string;
  points: number;
  question: string;
  options: { label: string; text: string; correct: boolean }[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 text-sm flex items-center justify-center font-semibold">
            {index}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
            {type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
            {points} point{points > 1 && "s"}
          </span>
        </div>

        <div className="flex gap-3 text-gray-500">
          <FaEdit className="cursor-pointer hover:text-red-500" />
          <FaTrash className="cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* Question */}
      <p className="text-sm font-medium mb-4">{question}</p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt) => (
          <div
            key={opt.label}
            className={`px-4 py-2 rounded-lg text-sm border ${
              opt.correct
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-gray-50"
            }`}
          >
            {opt.label}. {opt.text}
            {opt.correct && (
              <span className="ml-2 text-xs font-medium">✓ Correct</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
