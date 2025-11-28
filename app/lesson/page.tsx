import Image from "next/image";
import Link from "next/link";

// Define the shape of a Lesson
interface Lesson {
  id: string;
  title: string;
  module: string;
  description: string;
  order: number;
}

// Fetch data on the server
async function getLessons(): Promise<Lesson[]> {
  try {
    const res = await fetch("https://backend-rauth.vercel.app/api/lessons", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch lessons");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}

export default async function LessonListPage() {
  const lessons = await getLessons();
  const validLessons = Array.isArray(lessons) ? lessons : [];
  
  // 1. Slice the first two lessons for the featured section
  const featuredLessons = validLessons.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />
        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson" className="font-semibold text-red-500">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/Subscription">Subscription</Link>
        </nav>
        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">Log out</button>
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-10 mt-10">
        <h2 className="text-xl font-bold text-[#1B1B3A]">
          My <span className="text-red-600">Lessons</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">Access your courses and study materials</p>

        {/* 2. Dynamic Featured Section (First 2 Lessons) */}
        <section className="mt-24 flex flex-col md:flex-row justify-center items-start gap-10 px-6 md:px-20">
          {featuredLessons.length > 0 ? (
            featuredLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white p-10 rounded-2xl shadow-xl w-full md:w-[500px] text-center hover:shadow-2xl transition relative group">
                <h3 className="font-semibold text-[#1B1B3A] text-lg md:text-xl">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-4">
                  {lesson.description || "No description available."}
                </p>
                {/* Made the card clickable by adding a full-cover link */}
                <Link href={`/lesson/${lesson.id}`} className="absolute inset-0" aria-label={`View ${lesson.title}`} />
              </div>
            ))
          ) : (
             <div className="text-gray-400 italic">No featured lessons available yet.</div>
          )}
        </section>

        {/* Dynamic Lesson List */}
        <h3 className="text-lg font-semibold text-[#1B1B3A] mt-16">
          Lesson <span className="text-red-600">Content</span>
        </h3>


        <div className="mt-6 space-y-5">
          {validLessons.length === 0 ? (
            <p className="text-gray-500">No lessons found.</p>
          ) : (
            validLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white shadow rounded-xl flex justify-between items-center px-6 py-4 hover:shadow-md transition">
                <div>
                  <span className="text-sm text-[#1B1B3A] font-medium block">{lesson.title}</span>
                  <span className="text-xs text-gray-400 mt-1">{lesson.module}</span>
                </div>
                <Link href={`/lesson/${lesson.id}`}>
                  <button className="bg-red-500 text-white text-sm px-6 py-2 rounded-full hover:bg-red-600 transition">View</button>
                </Link>
              </div>
            ))
          )}
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
