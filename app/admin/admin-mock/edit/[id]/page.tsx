"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EditMockExamPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<
    "details" | "questions" | "settings"
  >("details");

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-10 py-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/admin-mock-exam" className="text-sm text-gray-600">
          ← Back to Exams
        </Link>

        <button className="bg-red-500 text-white text-sm px-5 py-2 rounded-lg">
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

      {/* CONTENT SWITCH */}
      {activeTab === "details" && <ExamDetails />}
      {activeTab === "questions" && <QuestionsTab />}
      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

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
      className={`px-4 py-2 text-sm rounded-full border ${
        active ? "bg-white shadow font-medium" : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

/* ----------- TAB CONTENT ----------- */

function ExamDetails() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-5xl">
      <h3 className="text-base font-semibold text-[#1B1B3A]">
        Basic Information
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Configure exam details and metadata
      </p>

      {/* Exam Title */}
      <div className="mb-4">
        <label className="text-sm font-medium">Exam Title</label>
        <input
          className="mt-1 w-full border rounded-lg px-4 py-2"
          defaultValue="Mid-Term History Exam"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="mt-1 w-full border rounded-lg px-4 py-2"
          rows={3}
          defaultValue="Comprehensive exam covering units 1–5"
        />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium">Duration (minutes)</label>
          <input
            type="number"
            className="mt-1 w-full border rounded-lg px-4 py-2"
            defaultValue={60}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Difficulty</label>
          <select className="mt-1 w-full border rounded-lg px-4 py-2">
            <option>Easy</option>
            <option selected>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Passing Score (%)</label>
          <input
            type="number"
            className="mt-1 w-full border rounded-lg px-4 py-2"
            defaultValue={70}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Schedule Date</label>
          <input
            type="date"
            className="mt-1 w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Status</label>
          <select className="mt-1 w-full border rounded-lg px-4 py-2">
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function QuestionsTab() {
  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold">Exam Questions</h3>
          <p className="text-sm text-gray-500">Total Points: 3</p>
        </div>

        <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg">
          + Add Question
        </button>
      </div>

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
        type="True / False"
        points={1}
        question="Lon Nol led Khmer Republic Era (1970–1975)"
        options={[
          { label: "A", text: "True", correct: true },
          { label: "B", text: "False", correct: false },
        ]}
      />
    </div>
  );
}
function SettingsTab() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-5xl">
      <h3 className="text-base font-semibold text-[#1B1B3A]">Exam Settings</h3>
      <p className="text-sm text-gray-500 mb-6">
        Configure how students will experience this exam
      </p>

      <div className="space-y-6">
        <SettingItem
          title="Show Timer"
          description="Display countdown timer to students"
          defaultChecked
        />

        <SettingItem
          title="Randomize Questions"
          description="Shuffle question order for each student"
        />

        <SettingItem
          title="Allow Retakes"
          description="Let students retake the exam"
          defaultChecked
        />

        <SettingItem
          title="Show Results Immediately"
          description="Display score right after submission"
          defaultChecked
        />
      </div>
    </div>
  );
}

function SettingItem({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-[#1B1B3A]">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-red-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
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
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold">
            {index}
          </span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{type}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {points} point{points > 1 && "s"}
          </span>
        </div>

        <div className="flex gap-3 text-gray-500">
          <FaEdit />
          <FaTrash />
        </div>
      </div>

      <p className="mb-3 text-sm font-medium">{question}</p>

      <div className="space-y-2">
        {options.map((o) => (
          <div
            key={o.label}
            className={`px-4 py-2 rounded border text-sm ${
              o.correct
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-gray-50"
            }`}
          >
            {o.label}. {o.text}
            {o.correct && (
              <span className="ml-2 text-xs font-medium">✓ Correct</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
