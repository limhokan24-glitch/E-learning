"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Trash2 
} from "lucide-react";
import { getLessonById, updateLesson, deleteLesson, Lesson } from "@/src/services/lessonservice";
import { useRouter } from "next/navigation";
import { use } from "react";

type LessonState = Pick<Lesson, 'title' | 'description' | 'module' | 'order'>;

export default function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id: lessonId } = use(params);
  
  const [lessonData, setLessonData] = useState<LessonState>({
    title: "",
    description: "",
    module: "",
    order: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const data = await getLessonById(lessonId);
        setLessonData({
          title: data.title || "",
          description: data.description || "",
          module: data.module || "",
          order: data.order || 0,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId]);
  
  const handleSaveMainLesson = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await updateLesson(lessonId, lessonData);
      alert("Lesson updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save lesson.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLesson = async () => {
    if (!confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setError(null);
      await deleteLesson(lessonId);
      alert("Lesson deleted successfully!");
      router.push("/admin/admin-lesson");
    } catch (err: any) {
      setError(err.message || "Failed to delete lesson.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-6 py-8 sm:px-10 font-sans relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header and Actions */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Link
            href="/admin/admin-lesson"
            className="text-gray-600 hover:text-black font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Lessons
          </Link>
          
          <div className="flex gap-3">
            <button 
              onClick={handleDeleteLesson}
              disabled={isDeleting || isSaving}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2 ${isDeleting ? 'bg-gray-400 text-white' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? 'Deleting...' : 'Delete Lesson'}
            </button>
            <button 
              onClick={handleSaveMainLesson}
              disabled={isSaving || isDeleting}
              className={`text-white font-medium text-sm px-5 py-2.5 rounded-lg transition shadow-sm flex items-center gap-2 ${isSaving ? 'bg-red-300' : 'bg-[#E13030] hover:bg-red-700'}`}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>


        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Content: Lesson Details */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">
                Editing: <span className="text-red-600">{lessonData.title}</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Configure the main lesson details and order.</p>
          </div>
          
          <div className="space-y-6 w-full">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title</label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none"
              />
            </div>
            
            {/* Module Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Module Name</label>
              <input
                type="text"
                value={lessonData.module}
                onChange={(e) => setLessonData({...lessonData, module: e.target.value})}
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Number</label>
              <input
                type="number"
                value={lessonData.order}
                onChange={(e) => setLessonData({...lessonData, order: Number(e.target.value)})}
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none"
              />
            </div>

            {/* Description / Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content / Description</label>
              <textarea
                value={lessonData.description}
                onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                placeholder="Write the full content of the lesson here..."
                rows={10}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed focus:border-red-500 focus:ring-1 focus:ring-red-100 transition-all outline-none resize-none placeholder:text-gray-400"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
            <p className="text-gray-500 text-lg">Loading lesson details...</p>
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9]">
            <p className="text-red-600 text-xl font-semibold mb-4">Error loading data</p>
            <p className="text-gray-500">{message}</p>
            <Link href="/admin/admin-lesson" className="mt-6 text-red-500 hover:text-red-700 font-medium flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Go back
            </Link>
        </div>
    );
}
