import LessonViewer, { Lesson } from "@/components/lessonviewer";
import Link from "next/link";

// Server-side logic to find neighbors
async function getLessonContext(currentId: string) {
  try {
    // OPTIMIZATION: Cache this request for 1 hour (3600 seconds).
    // This makes navigation instant because we don't hit the DB every time.
    const res = await fetch("https://backend-rauth.vercel.app/api/lessons", {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) return null;

    const allLessons: Lesson[] = await res.json();

    // 1. Find current lesson
    const currentLesson = allLessons.find((l) => l.id === currentId);
    if (!currentLesson) return null;

    // 2. Filter by Module
    const moduleLessons = allLessons.filter(
      (l) => l.module === currentLesson.module
    );

    // 3. Sort by Order
    moduleLessons.sort((a, b) => a.order - b.order);

    // 4. Find Next/Prev
    const currentIndex = moduleLessons.findIndex((l) => l.id === currentId);
    const nextLesson = moduleLessons[currentIndex + 1];
    const prevLesson = moduleLessons[currentIndex - 1];

    return {
      currentLesson,
      nextLessonId: nextLesson?.id,
      prevLessonId: prevLesson?.id,
      currentIndex,
      totalLessons: moduleLessons.length,
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getLessonContext(id);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F7]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
        <Link href="/lesson">
          <button className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">Back to Lessons</button>
        </Link>
      </div>
    );
  }

  return (
    <LessonViewer
      currentLesson={data.currentLesson}
      nextLessonId={data.nextLessonId}
      prevLessonId={data.prevLessonId}
      currentIndex={data.currentIndex}
      totalLessons={data.totalLessons}
    />
  );
}
