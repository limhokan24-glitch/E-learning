// app/subscription/page.tsx   (Next.js App Router)
// or pages/subscription.tsx   (Pages Router)
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  "Overview",
  "Lesson",
  "Quiz",
  "Mock Exam",
  "Progress",
  "Subscription",
];

export default function SubscriptionPage() {
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
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/subscription" className="font-semibold text-red-500" >Subscription</Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Log out
          </button>
        </form>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 md:px-0 py-10 md:py-16">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Affordable{" "}
              <span className="text-red-500 font-bold">Pricing</span>
            </h1>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-[#1B1B3A]">
                  Free Plan{" "}
                  <span className="text-xs text-gray-400 font-normal">
                    / 7 Days
                  </span>
                </p>

                <ul className="mt-5 space-y-3 text-sm text-gray-600">
                  {[
                    "Limited access for 7 days",
                    "Access to selected lessons",
                    "Try quizzes and view results",
                    "Explore the platform before upgrading",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-8 w-full rounded-full border border-red-200 bg-pink-50 text-xs md:text-sm text-red-500 py-2.5 hover:bg-red-500 hover:text-white transition">
                Try for free
              </button>
            </div>

            {/* Paid Plan */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-400 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-[#1B1B3A] flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#1B1B3A]">
                    $10
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">
                    / MONTH
                  </span>
                </p>

                <ul className="mt-5 space-y-3 text-sm text-gray-600">
                  {[
                    "Full access to all history lessons",
                    "Mock exams and past papers included",
                    "Bigger quiz bank for more practice",
                    "Downloadable documents for offline study",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-8 w-full rounded-full bg-red-500 text-white text-xs md:text-sm py-2.5 hover:bg-red-600 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Small text under pricing */}
          <p className="mt-10 text-center text-[11px] md:text-xs text-gray-500">
            Master History subject, build confidence, and ace your BACII exams
            with ease
          </p>

          {/* Feature cards */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-3 text-lg">
                {/* small icon look */}
                <span>📝</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Interactive Learning Experience
              </h3>
              <p className="text-xs text-gray-600">
                Students can access history lessons, take quizzes, and compare
                mock exam results with real-time progress tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-3 text-lg">
                <span>📊</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Smart Analytics &amp; Insights
              </h3>
              <p className="text-xs text-gray-600">
                Highlight weak areas, and track study time so students improve
                efficiently.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-3 text-lg">
                <span>🔓</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">
                Flexible Access Plans
              </h3>
              <p className="text-xs text-gray-600">
                Choose both free and premium subscriptions, giving learners the
                freedom to explore and upgrade for full access to materials and
                resources.
              </p>
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
