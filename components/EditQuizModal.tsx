"use client";

import { useState } from "react";
import Image from "next/image";

type Quiz = {
  title: string;
  description: string;
  type: string;
  timeLimit: number;
};

const quizzes: Quiz[] = [
  {
    title: "Khmer Rouge - Multiple Choice",
    description: "Test your knowledge of Khmer Rouge",
    type: "Multiple Choice",
    timeLimit: 15,
  },
  {
    title: "French Colonial Era - Multiple Choice",
    description: "History of French rule in Cambodia",
    type: "Multiple Choice",
    timeLimit: 20,
  },
];

export default function AdminQuizPage() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // ================= DETAIL VIEW =================
  if (view === "detail" && selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setView("list")}
            className="text-sm text-gray-600"
          >
            ← Back to Quizzes
          </button>

          <button className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white">
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex w-fit rounded-full bg-gray-200 p-1 text-sm">
          <span className="rounded-full bg-white px-4 py-1 shadow">
            Quiz Details
          </span>
          <span className="px-4 py-1 text-gray-600">Questions (5)</span>
          <span className="px-4 py-1 text-gray-600">Settings</span>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">Basic Information</h2>
          <p className="mb-6 text-sm text-gray-500">
            Configure quiz details and metadata
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Quiz Title
              </label>
              <input
                value={selectedQuiz.title}
                readOnly
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={selectedQuiz.description}
                readOnly
                rows={3}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quiz Type
                </label>
                <input
                  value={selectedQuiz.type}
                  readOnly
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Time Limit (minutes)
                </label>
                <input
                  value={selectedQuiz.timeLimit}
                  readOnly
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= LIST VIEW =================
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="mb-8 text-xl font-bold">
        Quiz <span className="text-red-600">Management</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            onEdit={() => {
              setSelectedQuiz(quiz);
              setView("detail");
            }}
          />
        ))}
      </div>
    </div>
  );
}

function QuizCard({
  title,
  onEdit,
}: {
  title: string;
  onEdit: () => void;
}) {
  return (
    <div className="relative bg-white w-[280px] h-[220px] p-10 rounded-2xl shadow-lg text-center">
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-red-600 w-14 h-14 rounded-full flex items-center justify-center">
        <Image src="/idea-icon.png" alt="icon" width={26} height={26} />
      </div>

      <h3 className="mt-10 text-sm text-[#1B1B3A]">{title}</h3>

      <button
        onClick={onEdit}
        className="mt-6 bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600"
      >
        Edit
      </button>
    </div>
  );
}
