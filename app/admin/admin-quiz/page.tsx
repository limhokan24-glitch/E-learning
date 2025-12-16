"use client";
import QuizCard from "@/components/QuizCard";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import CreateQuizModal from "@/components/CreateQuizModal";

const quizzes = [
  { title: "Khmer Rouge – True/False question" },
  { title: "Khmer Republic Era – True/False" },
  { title: "French Colonial Era – Multiple Choice" },
];

export default function AdminQuizPage() {
  // ✅ STATE MUST LIVE HERE
  const [openQuizModal, setOpenQuizModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin/admin-dashboard">Admin Dashboard</Link>
          <Link href="/admin/admin-lesson">Lesson</Link>
          <Link href="/admin/admin-quiz" className="font-semibold text-red-500">
            Quiz
          </Link>
          <Link href="/admin/admin-mock">Mock Exam</Link>
          <Link href="/admin/admin-subscription">Subscription</Link>
        </nav>

        <button
          onClick={() => setOpenQuizModal(true)}
          className="flex items-center space-x-2 bg-red-500 text-white text-sm px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition"
        >
          <span className="text-lg">+</span>
          <span>Create Quiz</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow px-10 mt-12 mb-16">
        <section className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1B1B3A]">
                Quiz <span className="text-red-600">Management</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create and manage quizzes and assessments
              </p>
            </div>
          </div>

          {/* Quiz cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 justify-items-center">
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                title={quiz.title}
                onEdit={() => setOpenQuizModal(true)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <p className="text-xs">
          Empowering learners to grow their skills anytime, anywhere.
        </p>
      </footer>

      {/* ✅ MODAL MUST BE HERE */}
      <CreateQuizModal
        isOpen={openQuizModal}
        onClose={() => setOpenQuizModal(false)}
      />
    </div>
  );
}
