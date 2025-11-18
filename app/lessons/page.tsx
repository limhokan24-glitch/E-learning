"use client";
import Image from "next/image";
import Link from "next/link";

export default function LessonPage() {
  const lessons = [
    { title: "French Colonial Era (1863–1953)" },
    { title: "Sangkum Reastr Niyum Era (1953–1970)" },
    { title: "Khmer Republic Era (1970–1975)" },
    { title: "Democratic Kampuchea (Khmer Rouge Era) (1975–1979)" },
    { title: "People’s Republic of Kampuchea (1979–1989)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson" className="font-semibold text-red-500">
            Lesson
          </Link>
          <Link href="/quiz">Quiz</Link>
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

      {/* Main */}
      <main className="flex-grow px-10 mt-10">
        <h2 className="text-xl font-bold text-[#1B1B3A]">
          My <span className="text-red-600">Lessons</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Access your courses and study materials
        </p>

        {/* Highlighted Lessons */}
        <section className="mt-24 flex flex-col md:flex-row justify-center items-start gap-10 px-6 md:px-20">
          <div className="bg-white p-10 rounded-2xl shadow-xl w-full md:w-[500px] text-center hover:shadow-2xl transition">
            <h3 className="font-semibold text-[#1B1B3A] text-lg md:text-xl">
              Democratic Kampuchea (1975–1979)
            </h3>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              The Khmer Rouge was a brutal communist regime that ruled Cambodia
              from 1975 to 1979, led by Pol Pot. They aimed to create a
              classless society but caused the deaths of about 1.7 million
              people through starvation, forced labor, and executions.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-xl w-full md:w-[500px] text-center hover:shadow-2xl transition">
            <h3 className="font-semibold text-[#1B1B3A] text-lg md:text-xl">
              French Colonial Era (1863–1953)
            </h3>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Cambodia became a French protectorate in 1863. The French built
              roads, schools, and modern infrastructure but controlled the
              government. Cambodians gradually pushed for independence, which
              was achieved in 1953 under King Norodom Sihanouk.
            </p>
          </div>
        </section>

        {/* Lesson List */}
        <h3 className="text-lg font-semibold text-[#1B1B3A] mt-16">
          Lesson <span className="text-red-600">Content</span>
        </h3>

        <div className="mt-6 space-y-5">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl flex justify-between items-center px-6 py-4 hover:shadow-md transition"
            >
              <span className="text-sm text-[#1B1B3A] font-medium">
                {lesson.title}
              </span>
              <button className="bg-red-500 text-white text-sm px-6 py-2 rounded-full">
                View
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
