"use client";

import Image from "next/image";
import Link from "next/link";
import CreateLessonModal from "@/components/createlessonModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllLessons, Lesson } from "@/src/services/lessonservice"; // Import service

export default function AdminLessonPage() {
  const [openModal, setOpenModal] = useState(false);
  
  // --- NEW: State for real data ---
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  // --- NEW: Fetch lessons on page load ---
  const fetchLessons = async () => {
    try {
      setLoading(true);
      const data = await getAllLessons();
      setLessons(data);
    } catch (err: any) {
      setError(err.message || "Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/admin/admin-dashboard">Admin Dashboard</Link>
          <Link
            href="/admin/admin-lesson"
            className="font-semibold text-red-500"
          >
            Lesson
          </Link>
          <Link href="/admin/admin-quiz">Quiz</Link>
          <Link href="/admin/admin-mock">Mock Exam</Link>
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
        {/* Top heading */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#1B1B3A]">
            Lesson <span className="text-red-600">Management</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage the educational content
          </p>
        </section>

        {/* All Lessons header + button */}
        <section className="max-w-5xl mx-auto mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1B1B3A]">
                All <span className="text-red-600">Lessons</span>
              </h3>
              <p className="text-sm text-gray-500">Manage the lesson catalog</p>
            </div>

            <div className="p-6">
              {/* Create Lesson Button */}
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center space-x-2 bg-red-500 text-white text-sm px-5 py-2 rounded-full shadow-md hover:bg-red-600 transition"
              >
                <span className="text-lg">+</span>
                <span>Create Lesson</span>
              </button>

              {/* Modal - Now refreshes list on success */}
              <CreateLessonModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={() => {
                  setOpenModal(false);
                  fetchLessons(); // Refresh list after create
                }}
              />
            </div>
          </div>


          {/* Lesson list */}
          <div className="mt-8 space-y-5">
            {loading ? (
              <p className="text-center text-gray-500">Loading lessons...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : lessons.length === 0 ? (
              <p className="text-center text-gray-400">No lessons found. Create one!</p>
            ) : (
              lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl shadow flex items-center justify-between px-6 py-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium text-[#1B1B3A]">
                      {lesson.title}
                    </span>
                    {/* Optional: Show module name if you want */}
                    <span className="text-xs text-gray-400">
                      {lesson.module}
                    </span>
                  </div>
                  
                  <button
                    onClick={() =>
                      router.push(`/admin/admin-lesson/${lesson.id}`)
                    }
                    className="bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600 transition"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
           {/* Replaced logo-icon.png with logo.jpg as requested if icon missing, but kept your code */}
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
