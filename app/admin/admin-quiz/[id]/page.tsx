"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, GripVertical, Plus, Pencil, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// --- Components for specific UI parts ---

// 1. Custom Toggle Switch Component (for Settings Tab)
const ToggleSwitch = ({ label, description, checked, onChange }: any) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="pr-4">
      <h3 className="text-sm font-medium text-gray-900">{label}</h3>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-red-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

// 2. Question Item Component (for Questions Tab)
const QuestionItem = ({ number, question }: any) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-4">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="text-gray-300 cursor-move" size={20} />
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-sm">
            {number}
          </span>
          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
              Multiple Choice
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
              1 point
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition">
            <Pencil size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base font-medium text-gray-900 mb-4 ml-11">
        {question.title}
      </h3>

      {/* Options List */}
      <div className="ml-11 space-y-2">
        {question.options.map((opt: any, idx: number) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C...
          const isCorrect = opt.correct;
          return (
            <div
              key={idx}
              className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                isCorrect
                  ? "bg-green-50 border border-green-100 text-green-800"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              <span className="font-semibold mr-2">{letter}.</span>
              <span className="flex-grow">{opt.text}</span>
              {isCorrect && (
                <span className="flex items-center text-green-600 text-xs font-bold">
                  <CheckCircle2 size={14} className="mr-1" /> Correct
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation (if exists) */}
      {question.explanation && (
        <div className="ml-11 mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex gap-2 items-start">
          <span className="font-bold shrink-0">Explanation:</span>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---


export default function EditQuizPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("questions"); // Defaulting to Questions to see result immediately

  // Mock State for Settings
  const [settings, setSettings] = useState({
    shuffle: true,
    showAnswers: true,
    multipleAttempts: true,
    passingScore: 70,
  });

  // Mock Data for Questions
  const questions = [
    {
      id: 1,
      title: "When did Khmer Rouge begin?",
      options: [
        { text: "1975", correct: false },
        { text: "1975", correct: true }, // Intentionally matching screenshot logic (Green B)
        { text: "1941", correct: false },
        { text: "1943", correct: false },
      ],
      explanation: "",
    },
    {
      id: 2,
      title: "Who was the leader of Khmer Rouge?",
      options: [
        { text: "Mussolini", correct: false },
        { text: "Pol Pot", correct: true },
        { text: "Stalin", correct: false },
        { text: "Churchill", correct: false },
      ],
      explanation:
        "Adolf Hitler was the Führer (leader) of Nazi Germany from 1934 to 1945.", // Matches your screenshot text (even if factually odd context for Pol Pot question)
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-black font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quizzes
          </button>
          <button className="flex items-center bg-[#E13030] text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-medium shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            {[
              { id: "details", label: "Quiz Details" },
              { id: "questions", label: `Questions (${questions.length})` },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT: QUIZ DETAILS */}
        {activeTab === "details" && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Basic Information
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Configure quiz details and metadata
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  defaultValue="Khmer Rouge - Multiple Choice"
                  className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue="Test your knowledge of Khmer Rouge"
                  rows={3}
                  className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Type
                  </label>
                  <select className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20">
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: QUESTIONS */}
        {activeTab === "questions" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Quiz Questions
                </h2>
                <p className="text-gray-500 text-sm">
                  Total Points: {questions.length}
                </p>
              </div>
              <button className="flex items-center text-sm font-medium text-white bg-[#E13030] px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </button>
            </div>

            <div>
              {questions.map((q, index) => (
                <QuestionItem key={q.id} number={index + 1} question={q} />
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Quiz Settings
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Configure how students will experience this quiz
            </p>

            <div className="space-y-2">
              <ToggleSwitch
                label="Shuffle Questions"
                description="Randomize question order for each attempt"
                checked={settings.shuffle}
                onChange={(v: boolean) =>
                  setSettings({ ...settings, shuffle: v })
                }
              />
              <ToggleSwitch
                label="Show Correct Answers"
                description="Display correct answers after submission"
                checked={settings.showAnswers}
                onChange={(v: boolean) =>
                  setSettings({ ...settings, showAnswers: v })
                }
              />
              <ToggleSwitch
                label="Allow Multiple Attempts"
                description="Let students retake the quiz"
                checked={settings.multipleAttempts}
                onChange={(v: boolean) =>
                  setSettings({ ...settings, multipleAttempts: v })
                }
              />


              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  value={settings.passingScore}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      passingScore: Number(e.target.value),
                    })
                  }
                  className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
