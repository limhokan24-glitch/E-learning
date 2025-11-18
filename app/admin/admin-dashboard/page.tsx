"use client";

import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Students",
        data: [80, 130, 180, 260, 330, 390],
        borderColor: "#C1282D",
        backgroundColor: "rgba(193, 40, 45, 0.08)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#C1282D",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
      },
      x: {
        ticks: { color: "#6B7280" },
        grid: { color: "#F3F4F6" },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin-dashboard" className="font-semibold text-red-500">
            Admin Dashboard
          </Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
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
      <main className="flex-grow px-10 mt-12">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-[#1B1B3A]">
            Admin <span className="text-red-600">Dashboard</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Overview of platform performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 justify-items-center">
          <StatCard title="Total Student" value="10" iconSrc="/student-icon.png" />
          <StatCard title="Total Quizzes" value="8" iconSrc="/idea-icon.png" />
          <StatCard title="Total Lesson" value="7" iconSrc="/book-icon.png" />
        </div>

        {/* Enrollment Chart */}
        <section className="mt-14 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-8 w-full md:w-[80%] mx-auto border border-gray-100">
            <h3 className="text-md font-semibold text-[#1B1B3A]">
              Student Enrollment Trend
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              New student registrations over time
            </p>
            <Line data={lineData} options={lineOptions} height={120} />
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
      {/* Floating Icon */}
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
