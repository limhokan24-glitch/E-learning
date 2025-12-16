"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import CreateMockExamModal from "@/components/CreateMockExamModal";

const mockExams = [
  {
    title: "First History Mock Exam",
    questions: 50,
    duration: "60 minutes",
    date: "October 20 2025",
  },
  {
    title: "Second History Mock Exam",
    questions: 50,
    duration: "60 minutes",
    date: "October 20 2025",
  },
];

export default function AdminMockExamPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin/admin-dashboard">Admin Dashboard</Link>
          <Link href="/admin/admin-lesson">Lesson</Link>
          <Link href="/admin/admin-quiz">Quiz</Link>
          <Link
            href="/admin/admin-mock-exam"
            className="font-semibold text-red-500"
          >
            Mock Exam
          </Link>
          <Link href="/admin/admin-subscription">Subscription</Link>
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
          {/* Heading + Create button */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1B1B3A]">
                Mock <span className="text-red-600">Test</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Take timed practice exams to test your knowledge
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 bg-red-500 text-white text-sm px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition mt-2"
            >
              <span className="text-lg">+</span>
              <span>Create Mock Exam</span>
            </button>
          </div>

          {/* Info banner */}
          <div className="mt-6 bg-white rounded-xl shadow px-6 py-4 flex items-start text-sm text-gray-700">
            <div className="bg-[#C1282D] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-0.5 text-lg">
              !
            </div>
            <p>
              Mock exams simulate real test conditions with countdown timers.
              Complete all questions before time runs out!
            </p>
          </div>

          {/* Mock exam cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {mockExams.map((exam, index) => (
              <MockExamCard key={index} exam={exam} />
            ))}
          </div>
        </section>
      </main>
      {open && <CreateMockExamModal onClose={() => setOpen(false)} />}

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

function MockExamCard({
  exam,
}: {
  exam: {
    title: string;
    questions: number;
    duration: string;
    date: string;
  };
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-8 py-8 w-full max-w-[360px] hover:shadow-xl transition">
      <h3 className="text-sm md:text-base font-semibold text-[#1B1B3A] mb-6 text-center">
        {exam.title}
      </h3>

      <div className="text-sm text-[#1B1B3A] space-y-2 mb-8">
        <div className="flex justify-between">
          <span>Questions:</span>
          <span className="font-medium">{exam.questions}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span className="font-medium">{exam.duration}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span className="font-medium">{exam.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Link
          href={`/admin/admin-mock/edit/1`}
          className="bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600 transition"
        >
          Edit
        </Link>
        <button
          className="text-red-500 hover:text-red-600 hover:scale-110 transition"
          aria-label="Delete mock exam"
        >
          <FaTrashAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
