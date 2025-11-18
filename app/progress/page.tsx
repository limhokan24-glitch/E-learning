"use client";
import Image from "next/image";
import Link from "next/link";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressPage() {
  // Chart data
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Scores",
        data: [65, 70, 63, 78, 85, 90],
        borderColor: "#C1282D",
        backgroundColor: "rgba(193, 40, 45, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#C1282D",
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours",
        data: [2.5, 3, 2, 4, 3.5, 5, 3],
        backgroundColor: "#C1282D",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#666" },
        grid: { color: "#eee" },
      },
      x: { ticks: { color: "#666" }, grid: { color: "#f5f5f5" } },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress" className="font-semibold text-red-500">
            Progress
          </Link>
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
        <h2 className="text-xl font-bold text-[#1B1B3A]">
          My <span className="text-red-600">Progress</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your learning journey and performance
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-16 justify-items-center">
          <Card
            title="Lesson Complete"
            value="10/12"
            iconSrc="/book-icon.png"
          />
          <Card title="Quizzes Taken" value="8" iconSrc="/idea-icon.png" />
          <Card title="Study Time" value="30h" iconSrc="/clock-icon.png" />
        </div>

        {/* Line Chart */}
        <section className="mt-14">
          <h3 className="text-md font-semibold text-[#1B1B3A]">
            Score Progression
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Your quiz and exam scores over time
          </p>
          <div className="bg-white p-6 rounded-xl shadow">
            <Line data={lineData} options={chartOptions} height={100} />
          </div>
        </section>

        {/* Bar Chart */}
        <section className="mt-14 mb-12">
          <h3 className="text-md font-semibold text-[#1B1B3A]">
            Time-on-Task Analysis
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Hours spent studying per day
          </p>
          <div className="bg-white p-6 rounded-xl shadow">
            <Bar data={barData} options={chartOptions} height={100} />
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

// Card component
function Card({ title, value, iconSrc }: any) {
  return (
    <div className="relative bg-white w-[320px] h-[230px] p-12 pt-16 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
      {/* Floating Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#C1282D] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
        <Image
          src={iconSrc}
          alt={title}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h4 className="text-[#1B1B3A] font-medium text-base mt-3">{title}</h4>

      {/* Value */}
      <h2 className="text-[2rem] font-bold text-[#C1282D] mt-6">{value}</h2>
    </div>
  );
}
