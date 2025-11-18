"use client";
import Image from "next/image";
import Link from "next/link";

export default function QuizPage() {
  const quizzes = [
    { title: "Khmer Rouge – True/False" },
    { title: "Khmer Republic Era – True/False" },
    { title: "French Colonial Era (1863–1953) – Multiple Choice" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz" className="font-semibold text-red-500">
            Quiz
          </Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/subscription">Subscription</Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Log out
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-10 mt-12">
        <h2 className="text-xl font-bold text-[#1B1B3A]">
          Practice <span className="text-red-600">Quizzes</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Test your knowledge with interactive quizzes
        </p>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 justify-items-center">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="relative bg-white w-full max-w-[280px] p-10 pt-14 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
            >
              {/* Icon circle */}
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-[#C1282D] w-14 h-14 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <Image
                  src="/idea-icon.png"
                  alt="Idea Icon"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#1B1B3A] text-sm md:text-base leading-relaxed mt-2">
                {quiz.title}
              </h3>

              {/* Button */}
              <button className="bg-[#C1282D] text-white text-sm px-8 py-2 rounded-full mt-6 shadow-md hover:scale-105 transition">
                Take
              </button>
            </div>
          ))}
        </div>
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
