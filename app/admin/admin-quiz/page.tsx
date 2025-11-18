"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

const quizzes = [
  { title: "Khmer Rouge – True/False question" },
  { title: "Khmer Republic Era – True/False" },
  { title: "French Colonial Era – Multiple Choice" },
];

export default function AdminQuizPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin-dashboard">Admin Dashboard</Link>
          <Link href="/admin-lesson">Lesson</Link>
          <Link href="/admin-quiz" className="font-semibold text-red-500">
            Quiz
          </Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/subscription">Subscription</Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Log out
          </button>
        </form>
      </header>

      {/* Main */}
      <main className="flex-grow px-10 mt-12 mb-16">
        <section className="max-w-6xl mx-auto">
          {/* Page heading */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1B1B3A]">
                Quiz <span className="text-red-600">Management</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Create and manage quizzes and assessments
              </p>
            </div>

            <button className="flex items-center space-x-2 bg-red-500 text-white text-sm px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition">
              <span className="text-lg">+</span>
              <span>Create Quiz</span>
            </button>
          </div>

          {/* Quiz cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 justify-items-center">
            {quizzes.map((quiz, index) => (
              <QuizCard key={index} title={quiz.title} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-xs">
          Empowering learners to grow their skills anytime, anywhere. Learn at
          your own pace and achieve your dreams.
        </p>
      </footer>
    </div>
  );
}

function QuizCard({ title }: { title: string }) {
  return (
    <div className="relative bg-white w-[280px] h-[220px] p-10 pt-16 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
      {/* Floating icon */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#C1282D] w-14 h-14 rounded-full flex items-center justify-center shadow-md">
        <Image
          src="/idea-icon.png"
          alt="Quiz Icon"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm md:text-base text-[#1B1B3A] leading-relaxed mt-2">
        {title}
      </h3>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button className="bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600 transition">
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-600 hover:scale-110 transition"
          aria-label="Delete quiz"
        >
          <FaTrashAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
