import MockExamPlayer from "@/components/Mockexamplayer";
import Link from "next/link";

// Helper to fetch data
async function getMockExam(id: string) {
  try {
    const res = await fetch(`https://backend-rauth.vercel.app/api/mockexams/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function MockExamDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = await getMockExam(id);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-4 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Exam Not Found</h1>
        <p className="text-gray-500 mb-6 max-w-xs mx-auto">
          We couldn't locate the exam ID you are looking for. It may have been deleted.
        </p>
        <Link href="/mock-exam">
          <button className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition">
            Back to Exams
          </button>
        </Link>
      </div>
    );
  }

  return <MockExamPlayer exam={exam} />;
}
