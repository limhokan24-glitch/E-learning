import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/TopNav";
interface MockExam {
  id: string;
  title: string;
  module: string;
  questions: any[];
  createdAt?: string; // Optional because old data might miss it
}
export const dynamic = 'force-dynamic';
async function getMockExams(): Promise<MockExam[]> {
  try {
    const res = await fetch("https://backend-rauth.vercel.app/api/mockexams", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch exams");

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function MockExamPage() {
  const exams = await getMockExams();
  const validExams = Array.isArray(exams) ? exams : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 md:px-0 py-10">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">
              Mock <span className="text-red-500 font-bold">Exam</span>
            </h1>
            <p className="text-sm text-blue-700 underline font-medium mt-1">
              Take timed practice exams to test your knowledge
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start gap-3 text-sm text-gray-700 mb-10">
            <span className="text-xl">⏱️</span>
            <p>
              Mock exams simulate real test conditions with countdown timers.
              Complete all questions before time runs out!
            </p>
          </div>

          {/* Dynamic Exam Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {validExams.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500 py-10 bg-white rounded-xl border border-dashed">
                No mock exams available at the moment.
              </div>
            ) : (
              validExams.map((exam) => {
                // Calculate estimated time: 1.5 mins per question
                const questionCount = exam.questions?.length || 0;
                const duration = Math.ceil(questionCount * 1.5);
                
                // Format Date
                const dateString = exam.createdAt 
                  ? new Date(exam.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
                  : "Available Now";

                return (
                  <div key={exam.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 min-h-[260px] flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-center mb-4 text-[#1B1B3A] line-clamp-2 min-h-[40px]">
                        {exam.title}
                      </h3>


                      <div className="text-xs text-gray-700 space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
                        <p className="flex justify-between">
                          <strong>Questions:</strong> 
                          <span>{questionCount}</span>
                        </p>
                        <p className="flex justify-between">
                          <strong>Duration:</strong> 
                          <span>{duration} minutes</span>
                        </p>
                        <p className="flex justify-between">
                          <strong>Date:</strong> 
                          <span>{dateString}</span>
                        </p>
                        <p className="flex justify-between">
                           <strong>Module:</strong>
                           <span className="text-red-500 font-medium">{exam.module}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Link href={`/mock-exam/${exam.id}`}>
                        <button className="px-8 py-2.5 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600 hover:shadow-md transition">
                          Start Exam
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
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
