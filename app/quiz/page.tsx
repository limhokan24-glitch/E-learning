import Image from "next/image";
import Link from "next/link";

interface Quiz {
  id: string;
  title: string;
  module: string;
  questions: any[];
}

// Fetch quizzes from your backend
async function getQuizzes(): Promise<Quiz[]> {
  try {
    const res = await fetch("https://backend-rauth.vercel.app/api/quizzes", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch quizzes");

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function QuizPage() {
  const quizzes = await getQuizzes();
  const validQuizzes = Array.isArray(quizzes) ? quizzes : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        {/* Using logo-icon.png to match footer consistency */}
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz" className="font-semibold text-red-500">
            Quiz
          </Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/Subscription">Subscription</Link>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 mt-16 justify-items-center">
          {validQuizzes.length === 0 ? (
            <p className="text-gray-500 col-span-full">No quizzes available yet.</p>
          ) : (
            validQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="relative bg-white w-full max-w-[280px] p-10 pt-14 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
              >
                {/* Icon circle - Positioned absolutely at the top */}
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
                <h3 className="font-semibold text-[#1B1B3A] text-sm md:text-base leading-relaxed mt-2 min-h-[3rem] flex items-center justify-center">
                  {quiz.title}
                </h3>

                {/* Button wrapped in Link to make it functional */}
                <Link href={`/quiz/${quiz.id}`}>
                  <button className="bg-[#C1282D] text-white text-sm px-8 py-2 rounded-full mt-6 shadow-md hover:scale-105 transition">
                    Take
                  </button>
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
