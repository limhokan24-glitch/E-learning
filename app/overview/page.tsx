"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";

export default function OverviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("Student");
  
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    totalLessons: 0,
    quizzesTaken: 0,
    studyHours: "0h",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const tokenResult = await user.getIdTokenResult();
          setUserRole((tokenResult.claims.role as string) || "Student");
          await fetchDashboardData(token);
        } catch (error) {
          console.error("Error loading dashboard:", error);
        }
      } else {
        router.push("/Login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchDashboardData = async (token: string) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const baseUrl = "https://backend-rauth.vercel.app/api";

      const [allLessonsRes, myProgressRes, myQuizzesRes, myExamsRes, myTimeRes] = await Promise.all([
        fetch(`${baseUrl}/lessons`, { cache: "no-store" }),
        fetch(`${baseUrl}/progress/lesson`, { headers }),
        fetch(`${baseUrl}/progress/quiz/all`, { headers }),
        fetch(`${baseUrl}/progress/exam/all`, { headers }),
        fetch(`${baseUrl}/progress/time`, { headers }), // ✅ Fetch Real Time Data
      ]);

      const allLessons = await allLessonsRes.json();
      const myProgress = await myProgressRes.json();
      const myQuizzes = await myQuizzesRes.json();
      const myExams = await myExamsRes.json();
      const myTime = await myTimeRes.json();

      const completedCount = Array.isArray(myProgress) ? myProgress.filter((p: any) => p.isCompleted).length : 0;
      const totalCount = Array.isArray(allLessons) ? allLessons.length : 0;
      const activityCount = (Array.isArray(myQuizzes) ? myQuizzes.length : 0) + (Array.isArray(myExams) ? myExams.length : 0);

      // ✅ Calculate Total Time from Tracker
      const totalSeconds = Array.isArray(myTime) ? myTime.reduce((acc: number, curr: any) => acc + (curr.seconds || 0), 0) : 0;
      const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;

      setStats({
        lessonsCompleted: completedCount,
        totalLessons: totalCount,
        quizzesTaken: activityCount,
        studyHours: `${totalHours}h`
      });

    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/Login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading overview...</div>;

  const isPremium = userRole === "Premium";

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky top-0 z-40">
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />
        <nav className="flex space-x-6 text-sm">
          <Link href="/overview" className="font-semibold text-red-500">Overview</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/subscription">Subscription</Link>
        </nav>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">Log out</button>
      </header>


      <main className="flex-grow px-10 mt-12">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B3A]">Welcome! <span className="text-red-600">Glad you’re here</span></h2>
          <p className="text-sm text-gray-500 mt-1">Here’s your learning progress overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 justify-items-center">
          <Card title="Lessons Completed" value={`${stats.lessonsCompleted}/${stats.totalLessons}`} iconSrc="/book-icon.png" />
          <Card title="Quizzes Taken" value={stats.quizzesTaken.toString()} iconSrc="/idea-icon.png" />
          {/* ✅ REAL DATA */}
          <Card title="Study Time" value={stats.studyHours} iconSrc="/clock-icon.png" />
        </div>

        {!isPremium && (
          <div className="mt-14 bg-white shadow-md rounded-xl p-8 flex flex-col sm:flex-row justify-between items-center w-full border-l-4 border-red-500">
            <div className="flex items-center space-x-4 text-sm text-gray-700">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Student Plan</span>
              <p>You are currently on the free plan. Upgrade to <strong>Premium</strong> to unlock unlimited quizzes!</p>
            </div>
            <Link href="/subscription" className="bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 mt-4 sm:mt-0">Upgrade Now</Link>
          </div>
        )}
        
        {isPremium && (
           <div className="mt-14 bg-green-50 shadow-sm rounded-xl p-6 border border-green-200 text-center text-green-800">
              <p>🌟 You are a <strong>Premium Member</strong>. Enjoy your unlimited access!</p>
           </div>
        )}
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
    <div className="relative bg-white w-[320px] h-[230px] p-12 pt-16 rounded-2xl shadow-lg text-center hover:shadow-2xl transition border border-gray-50">
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#C1282D] w-16 h-16 rounded-full flex items-center justify-center shadow-md border-4 border-white">
        <Image src={iconSrc} alt={title} width={28} height={28} className="object-contain" />
      </div>
      <h4 className="text-[#1B1B3A] font-medium text-base mt-3">{title}</h4>
      <h2 className="text-[2.5rem] font-bold text-[#C1282D] mt-6">{value}</h2>
    </div>
  );
}
