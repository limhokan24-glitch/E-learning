"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export type Lesson = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  module: string;
  order: number;
};

type Props = {
  currentLesson: Lesson;
  nextLessonId?: string;
  prevLessonId?: string;
  currentIndex: number;
  totalLessons: number;
};

export default function LessonViewer({ 
  currentLesson, 
  nextLessonId, 
  prevLessonId, 
  currentIndex, 
  totalLessons 
}: Props) {
  const router = useRouter();
  const currentProgressNum = currentIndex + 1;
  const progressPercentage = (currentProgressNum / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8">
      <Link href="/lesson" className="text-gray-700 flex items-center gap-2 mb-5 hover:text-red-600 transition">
        ← Back to Menu
      </Link>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-[#1B1B3A]">
          <span className="block text-gray-500 text-sm uppercase tracking-wider mb-1">
            {currentLesson.module}
          </span>
          {currentLesson.title}
        </h1>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Part {currentProgressNum} of {totalLessons}</span>
          <span>{Math.round(progressPercentage)}% Completed</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
          <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-10 mt-10 shadow-sm leading-relaxed min-h-[300px]">
        <h2 className="text-2xl text-red-600 font-semibold mb-6">{currentLesson.title}</h2>
        <div className="text-gray-700 whitespace-pre-wrap text-lg leading-8">
          {currentLesson.content || currentLesson.description || "No content available."}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => prevLessonId ? router.push(`/lesson/${prevLessonId}`) : router.push('/lesson')}
          className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition"
        >
          {prevLessonId ? "← Previous" : "← Back to Menu"}
        </button>

        <button
          onClick={() => nextLessonId ? router.push(`/lesson/${nextLessonId}`) : router.push('/lesson')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition text-white shadow-md
             ${!nextLessonId ? "bg-gray-800 hover:bg-gray-900" : "bg-red-600 hover:bg-red-700"}`}
        >
          {nextLessonId ? "Next Part →" : "Finish Module"}
        </button>
      </div>
    </div>
  );
}
