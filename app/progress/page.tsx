"use client";
import TopNav from "@/components/TopNav";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";

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
  const [loading, setLoading] = useState(true);
  
  // Stats State
  const [examAttempts, setExamAttempts] = useState<any[]>([]);
  const [quizCount, setQuizCount] = useState(0);
  const [totalStudyHours, setTotalStudyHours] = useState("0h");

  // Chart Data
  const [lineChartData, setLineChartData] = useState<any>({ labels: [], datasets: [] });
  const [barChartData, setBarChartData] = useState<any>({ labels: [], datasets: [] });

  // --- 1. Process Scores for Line Chart ---
  const processLineChart = useCallback((exams: any[], quizzes: any[]) => {
    const combined = [
      ...exams.map(e => ({ ...e, type: 'Exam' })),
      ...quizzes.map(q => ({ ...q, type: 'Quiz' }))
    ];

    const sorted = combined.sort((a, b) => 
      (a.AttemptDate?._seconds || 0) - (b.AttemptDate?._seconds || 0)
    );

    const labels = sorted.map((item) => {
      if (item.AttemptDate && item.AttemptDate._seconds) {
        return new Date(item.AttemptDate._seconds * 1000).toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        });
      }
      return "N/A";
    });

    const scores = sorted.map((item) => item.Score);

    setLineChartData({
      labels: labels,
      datasets: [
        {
          label: "Score",
          data: scores,
          borderColor: "#C1282D",
          backgroundColor: "rgba(193, 40, 45, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 6,
          pointBackgroundColor: sorted.map(i => i.type === 'Exam' ? "#C1282D" : "#FFCDD2"),
        },
      ],
    });
  }, []);

  // --- 2. Process Time for Bar Chart & Total ---
  const processTimeData = useCallback((timeData: any[]) => {
    // A. Calculate Total Hours
    const totalSeconds = timeData.reduce((acc: number, curr: any) => acc + (curr.seconds || 0), 0);
    const hours = Math.round((totalSeconds / 3600) * 10) / 10;
    setTotalStudyHours(`${hours}h`);

    // B. Calculate Daily Bars (Last 7 Days)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const last7DaysLabels = [];
    const last7DaysValues = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateString = d.toISOString().split('T')[0]; // "2023-10-28"
      const dayName = days[d.getDay()];

      // Find data for this specific date
      const dayData = timeData.find((item: any) => item.date === dateString);
      const dayHours = dayData ? Math.round((dayData.seconds / 3600) * 10) / 10 : 0;

      last7DaysLabels.push(dayName);
      last7DaysValues.push(dayHours);
    }

    setBarChartData({
      labels: last7DaysLabels,
      datasets: [
        {
          label: "Hours Studied",
          data: last7DaysValues,
          backgroundColor: "#C1282D",
          borderRadius: 6,
        },
      ],
    });
  }, []);

  const fetchProgressData = useCallback(
    async (token: string) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const baseUrl = "https://backend-rauth.vercel.app/api/progress";

        const [examRes, quizRes, timeRes] = await Promise.all([
          fetch(`${baseUrl}/exam/all`, { headers }),
          fetch(`${baseUrl}/quiz/all`, { headers }),
          fetch(`${baseUrl}/time`, { headers }),
        ]);

        const examData = await examRes.json();
        const quizData = await quizRes.json();
        const timeData = await timeRes.json();


        processLineChart(examData, quizData);
        processTimeData(timeData);

        setExamAttempts(examData);
        setQuizCount(quizData.length || 0);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    },
    [processLineChart, processTimeData]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          await fetchProgressData(token);
        } catch (error) {
          console.error("Error getting token:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchProgressData]);

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#666" }, grid: { color: "#eee" } },
      x: { ticks: { color: "#666" }, grid: { display: false } },
    },
  };

  if (loading) return <div className="p-10 text-center">Loading progress...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      <TopNav />
      <main className="flex-grow px-10 mt-12">
        <h2 className="text-xl font-bold text-[#1B1B3A]">My <span className="text-red-600">Progress</span></h2>
        <p className="text-sm text-gray-500 mt-1">Track your learning journey and performance</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-16 justify-items-center">
          <Card title="Exams Taken" value={examAttempts.length.toString()} iconSrc="/book-icon.png" />
          <Card title="Quizzes Taken" value={quizCount.toString()} iconSrc="/idea-icon.png" />
          <Card title="Study Time" value={totalStudyHours} iconSrc="/clock-icon.png" />
        </div>

        {/* Line Chart */}
        <section className="mt-14">
          <h3 className="text-md font-semibold text-[#1B1B3A]">Score Progression</h3>
          <div className="bg-white p-6 rounded-xl shadow min-h-[300px]">
            {lineChartData.labels.length > 0 ? (
              <Line data={lineChartData} options={chartOptions} height={100} />
            ) : <div className="text-center text-gray-400 py-10">No scores recorded yet.</div>}
          </div>
        </section>

        {/* Bar Chart */}
        <section className="mt-14 mb-12">
          <h3 className="text-md font-semibold text-[#1B1B3A]">Daily Study Activity</h3>
          <div className="bg-white p-6 rounded-xl shadow">
            <Bar data={barChartData} options={chartOptions} height={100} />
          </div>
        </section>
      </main>
      
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
          <Image src="/logo-icon.png" alt="Logo" width={60} height={60} className="object-contain" />
        </div>
        <p className="mt-4 text-xs">Empowering learners to grow their skills.</p>
      </footer>
    </div>
  );
}

function Card({ title, value, iconSrc }: any) {
  return (
    <div className="relative bg-white w-[320px] h-[230px] p-12 pt-16 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#C1282D] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
        <div className="text-white text-2xl">
          {title.includes("Exams") ? "📚" : title.includes("Quiz") ? "💡" : "⏳"}
        </div>
      </div>
      <h4 className="text-[#1B1B3A] font-medium text-base mt-3">{title}</h4>
      <h2 className="text-[2rem] font-bold text-[#C1282D] mt-6">{value}</h2>
    </div>
  );
}
