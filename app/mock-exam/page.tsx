"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MockExamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson">
            Lesson
          </Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam" className="font-semibold text-red-500">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/subscription">Subscription</Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Log out
          </button>
        </form>
      </header>

      {/* Main */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 md:px-0 py-10">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">
              Mock <span className="text-red-500 font-bold">Exam</span>
            </h1>
            <a href="#" className="text-sm text-blue-700 underline font-medium">
              Take timed practice exams to test your knowledge
            </a>
          </div>

          {/* Info Banner */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start gap-3 text-sm text-gray-700">
            <span className="text-black text-lg"></span>
            <p>
              Mock exams simulate real test conditions with countdown timers.
              Complete all questions before time runs out!
            </p>
          </div>

          {/* Exam Cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 min-h-[260px]">
              <h3 className="text-sm font-semibold text-center mb-4 text-[#1B1B3A]">
                First History Mock Exam
              </h3>

              <div className="text-xs text-gray-700 space-y-2 mb-6">
                <p><strong>Questions:</strong> 50</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Date:</strong> October 20 2025</p>
              </div>

              <div className="flex justify-center">
                <button className="px-6 py-2 rounded-full bg-red-500 text-white text-xs hover:bg-red-600">
                  Start
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 min-h-[260px]">
              <h3 className="text-sm font-semibold text-center mb-4 text-[#1B1B3A]">
                Second History Mock Exam
              </h3>

              <div className="text-xs text-gray-700 space-y-2 mb-6">
                <p><strong>Questions:</strong> 50</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Date:</strong> October 20 2025</p>
              </div>

              <div className="flex justify-center">
                <button className="px-6 py-2 rounded-full bg-red-500 text-white text-xs hover:bg-red-600">
                  Start
                </button>
              </div>
            </div>
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

