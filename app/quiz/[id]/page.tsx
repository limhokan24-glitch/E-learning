import QuizPlayer from "@/components/QuizPlayer";
import Link from "next/link";

// Server Fetcher
async function getQuiz(id: string) {
  try {
    const res = await fetch(`https://backend-rauth.vercel.app/api/quizzes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = await getQuiz(id);

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
        <h1 className="text-2xl font-bold text-[#1B1B3A] mb-2">Quiz Not Found</h1>
        <p className="text-gray-500 mb-6">We couldn't load the questions for this quiz.</p>
        <Link href="/quiz">
          <button className="px-6 py-3 bg-red-600 text-white rounded-full font-medium">
            Back to Quiz Menu
          </button>
        </Link>
      </div>
    );
  }

  return <QuizPlayer quiz={quiz} />;
}
