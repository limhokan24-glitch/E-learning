"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaTrashAlt, FaPlus, FaInfoCircle } from "react-icons/fa"; // FontAwesome icons
import { Loader2 } from "lucide-react"; // Loading spinner
import CreateMockExamModal from "@/components/CreateMockExamModal"; // Your existing modal
import { auth } from "@/firebase/firebaseClient"; // Firebase Auth for token
import Image from "next/image";
// --- CONFIG ---
const BASE_URL = "https://backend-rauth.vercel.app";

export default function AdminMockExamPage() {
  const [openModal, setOpenModal] = useState(false);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH EXAMS
  const fetchExams = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/mockexams`);
      if (res.ok) {
        const data = await res.json();
        setExams(data);
      }
    } catch (err) {
      console.error("Failed to fetch exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // 2. DELETE EXAM
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const token = await currentUser.getIdToken();

      const res = await fetch(`${BASE_URL}/api/mockexams/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        // Remove from UI immediately
        setExams((prev) => prev.filter((exam) => exam.id !== id));
      } else {
        alert("Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  // Helper to format date exactly like screenshot: "October 20 2025"
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "Date N/A";
    const date = dateInput._seconds ? new Date(dateInput._seconds * 1000) : new Date(dateInput);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-white p-8 md:p-12 font-sans">
      
       {/* Header */}
            <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky top-0 z-30">
              {/* Restored your original Logo Image */}
              <Image src="/logo.jpg" alt="Logo" width={50} height={50} className="object-contain" />
      
      
              <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
                <Link href="/admin/admin-dashboard" className="hover:text-red-600 transition">Admin Dashboard</Link>
                <Link href="/admin/admin-lesson" className="hover:text-red-600 transition">Lesson</Link>
                <Link href="/admin/admin-quiz" className="hover:text-red-600 transition">Quiz</Link>
                <Link href="/admin/admin-mock" className="text-red-600 border-b-2 border-red-600 pb-1">Mock Exam</Link>
                <Link
                  href="/admin/admin-subscription"
                  className="hover:text-red-600 transition"
                >
                  Subscription
                </Link>
              </nav>
      
              <form action="/api/auth/signout" method="post">
                <button className="bg-red-500 text-white px-6 py-2 rounded-full text-sm hover:bg-red-600 transition shadow-sm font-medium">
                  Log out
                </button>
              </form>
            </header>

        {/* INFO BANNER */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm mb-8">
            <div className="mt-1">
                {/* Outlined Exclamation Icon */}
                <div className="border-2 border-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs text-black">!</div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-black pt-1">
                Mock exams simulate real test conditions with countdown timers. Complete all questions before time runs out!
            </p>
        </div>

        {/* CREATE BUTTON (Right Aligned) */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#EE342F] hover:bg-red-700 text-white text-sm font-bold py-2 px-6 rounded-full shadow-md flex items-center gap-2 transition"
          >
            <FaPlus className="text-xs" /> Create Mock Exam
          </button>
        </div>


        {/* CONTENT GRID */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#EE342F] w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exams.map((exam) => (
              <div 
                key={exam.id} 
                className="bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center w-full"
              >
                {/* Title */}
                <h3 className="text-[#484885] font-bold text-lg mb-8 text-center">
                  {exam.title || "Untitled Mock Exam"}
                </h3>

                {/* Details Row 1: Questions */}
                <div className="w-full flex justify-between items-center text-sm font-bold text-black mb-2">
                  <span>Questions:</span>
                  <span>{exam.questions?.length || 0}</span>
                </div>

                {/* Details Row 2: Duration */}
                <div className="w-full flex justify-between items-center text-sm font-bold text-black mb-2">
                  <span>Duration:</span>
                  <span>{exam.duration || 60} minutes</span>
                </div>

                {/* Date (Right Aligned) */}
                <div className="w-full text-right text-xs font-bold text-black mb-10">
                   {formatDate(exam.createdAt)}
                </div>

                {/* Actions (Centered Bottom) */}
                <div className="flex items-center gap-8 mt-auto">
                  <Link href={`/admin/admin-mock/edit/${exam.id}`}>
                    <button className="bg-[#EE342F] hover:bg-red-700 text-white font-bold text-xs py-2 px-10 rounded-full shadow-md transition">
                      Edit
                    </button>
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(exam.id)}
                    className="text-[#EE342F] hover:text-red-800 text-xl transition flex items-center justify-center border-2 border-[#EE342F] w-9 h-9 rounded-md p-1.5"
                    title="Delete Exam"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && exams.length === 0 && (
            <div className="text-center text-gray-400 py-20 font-medium">
                No mock exams found. Create one to get started.
            </div>
        )}
      

      {/* Modal Injection */}
      {openModal && (
        <CreateMockExamModal 
          onClose={() => setOpenModal(false)} 
          onSuccess={() => {
            setOpenModal(false);
            fetchExams();
          }}
        />
      )}
    </div>
  );
}
