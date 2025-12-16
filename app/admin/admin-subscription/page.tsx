"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentDetailModal from "@/components/StudentDetailModal";
const recentSubscriptions = [
  {
    name: "March Lyhour",
    email: "March.lyhour@gmail.com",
    plan: "Premium",
  },
  {
    name: "Meng Fong",
    email: "Mengfong@gmail.com",
    plan: "Premium",
  },
  {
    name: "Uy Reach",
    email: "Uyreach67@gmail.com",
    plan: "Free",
  },
];

export default function AdminSubscriptionPage() {
  const [openStudentDetail, setOpenStudentDetail] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin/admin-dashboard">Admin Dashboard</Link>
          <Link href="/admin/admin-lesson">Lesson</Link>
          <Link href="/admin/admin-quiz">Quiz</Link>
          <Link href="/admin/admin-mock">Mock Exam</Link>
          <Link
            href="/admin/admin-subscription"
            className="font-semibold text-red-500"
          >
            Subscription
          </Link>
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
          {/* Title */}
          <h2 className="text-xl font-bold text-[#1B1B3A]">
            Subscription <span className="text-red-600">Management</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor subscription plans and revenue
          </p>

          {/* Top cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 justify-items-center">
            <StatCard
              title="Total Student"
              value="10"
              iconSrc="/student.png"
            />
            <StatCard
              title="Premium Users"
              value="10"
              iconSrc="/student.png"
            />
            <StatCard
              title="Monthly Revenue"
              value="10"
              iconSrc="/student.png"
            />
          </div>

          {/* Recent Subscriptions header */}
          <div className="mt-14 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1B1B3A]">
                Recent <span className="text-red-600">Subscriptions</span>
              </h3>
              <p className="text-sm text-gray-500">
                Latest students joining or upgrading plans
              </p>
            </div>
            <button
              onClick={() => setOpenStudentDetail(true)}
              className="bg-red-500 text-white text-sm px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition"
            >
              View Student Detail
            </button>
          </div>

          {/* Recent Subscriptions list */}
          <div className="mt-8 space-y-4">
            {recentSubscriptions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 hover:shadow-md transition"
              >
                <div>
                  <p className="text-sm md:text-base font-medium text-[#1B1B3A]">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#1B1B3A] mt-1">{item.email}</p>
                </div>

                <span
                  className={`mt-3 sm:mt-0 text-xs font-semibold px-4 py-1 rounded-full ${
                    item.plan === "Premium"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.plan}
                </span>
              </div>
            ))}
          </div>
          {openStudentDetail && (
            <StudentDetailModal onClose={() => setOpenStudentDetail(false)} />
          )}
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

function StatCard({
  title,
  value,
  iconSrc,
}: {
  title: string;
  value: string;
  iconSrc: string;
}) {
  return (
    <div className="relative bg-white w-[320px] h-[230px] p-12 pt-16 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
      {/* Floating icon */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#C1282D] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
        <Image
          src={iconSrc}
          alt={title}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      <h4 className="text-[#1B1B3A] font-medium text-base mt-3">{title}</h4>
      <h2 className="text-[2rem] font-bold text-[#C1282D] mt-6">{value}</h2>
    </div>
  );
}
