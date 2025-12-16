"use client";
import React, { useEffect, useState } from "react";
import QuizCard from "@/components/QuizCard";
import CreateQuizModal from "@/components/CreateQuizModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllQuizzes, deleteQuiz, Quiz } from "@/src/services/Quizservice"; // Make sure path matches your structure
import { FaPlus } from "react-icons/fa";

export default function AdminQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
      try {
        await deleteQuiz(id);
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
      } catch (error) {
        alert("Error deleting quiz");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
           <div className="font-bold text-2xl text-[#E53E3E] tracking-tight flex flex-col items-center leading-none">
             <span>HISTORY</span>
             <span className="text-[10px] text-gray-400 tracking-widest">OF CAMBODIA</span>
           </div>
        </div>

        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <Link href="/admin/admin-dashboard" className="hover:text-[#E53E3E] transition">Admin Dashboard</Link>
          <Link href="/admin/admin-lesson" className="hover:text-[#E53E3E] transition">Lesson</Link>
          <Link href="/admin/admin-quiz" className="text-[#E53E3E]">Quiz</Link>
          <Link href="/admin/admin-mock" className="hover:text-[#E53E3E] transition">Mock Exam</Link>
          <Link href="/admin/admin-subscription" className="hover:text-[#E53E3E] transition">Subscription</Link>
        </nav>

        <div>
            <button className="bg-[#E53E3E] text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-red-700 transition">
              Log out
            </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow px-10 mt-12 mb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Title & Action Button Container */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-transparent pb-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1B1B3A]">
                Quiz <span className="text-[#E53E3E]">Management</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm font-medium">
                Create and manage quizzes and assessments
              </p>
            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#E53E3E] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-red-200 hover:bg-red-700 transition transform hover:-translate-y-1"
            >
              <FaPlus className="text-lg" />
              <span>Create Quiz</span>
            </button>
          </div>


          {/* Quiz Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading quizzes...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  moduleName={quiz.module}
                  onEdit={() => router.push(`/admin/admin-quiz/${quiz.id}`)}
                  onDelete={() => handleDelete(quiz.id!)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-6 mt-auto">
        <p className="text-xs font-light tracking-wide opacity-90">
          Empowering learners to grow their skills anytime, anywhere. Learn at your own pace and achieve your dreams.
        </p>
      </footer>

      {/* Create Modal */}
      <CreateQuizModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchQuizzes}
      />
    </div>
  );
}
