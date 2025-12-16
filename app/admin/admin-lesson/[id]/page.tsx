"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Pencil, 
  Trash2, 
  UploadCloud,
  X 
} from "lucide-react";

// Mock Data Type
type SubLesson = {
  id: number;
  title: string;
  parentLesson: string;
  description: string;
};

export default function EditLessonPage({
  params,
}: {
  params: { id: string };
}) {
  // VIEW STATE: 'main' (tabs) or 'edit-sublesson' (focused view)
  const [view, setView] = useState<"main" | "edit-sublesson">("main");
  const [activeTab, setActiveTab] = useState<"details" | "lessons">("lessons"); // Defaulted to lessons to see button easier

  // MODAL STATE
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // MAIN LESSON STATE
  const [lessonTitle, setLessonTitle] = useState("French Colonial Era (1863–1953)");
  const [lessonDescription, setLessonDescription] = useState("");

  // SUB-LESSON STATE
  const [currentSubLesson, setCurrentSubLesson] = useState<SubLesson | null>(null);
  const [subLessons, setSubLessons] = useState<SubLesson[]>([
    { 
      id: 1, 
      title: "Introduction", 
      parentLesson: "French Colonial Era (1863–1953)",
      description: "The French Colonial Era was an important period in Cambodian history..."
    },
    { 
      id: 2, 
      title: "Conclusion", 
      parentLesson: "French Colonial Era (1863–1953)",
      description: "In conclusion, the era left a lasting impact on modern Cambodia."
    },
  ]);

  // HANDLERS
  const handleEditSubLesson = (lesson: SubLesson) => {
    setCurrentSubLesson(lesson);
    setView("edit-sublesson");
  };

  const handleBackToMain = () => {
    setCurrentSubLesson(null);
    setView("main");
  };

  const handleCreateLesson = (newLessonData: any) => {
    // In a real app, you would send this to your API
    const newId = subLessons.length + 1;
    const newLesson: SubLesson = {
      id: newId,
      title: newLessonData.title,
      parentLesson: lessonTitle,
      description: newLessonData.description
    };
    setSubLessons([...subLessons, newLesson]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-6 py-8 sm:px-10 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* VIEW 1: MAIN LESSON MANAGEMENT                            */}
        {/* ========================================================= */}
        {view === "main" && (
          <>
            {/* Header */}
            <div className="flex justify-between items-center">
              <Link
                href="/admin/admin-lesson"
                className="text-gray-600 hover:text-black font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Lessons
              </Link>
              <button className="bg-[#E13030] text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-red-700 transition shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="bg-gray-100 p-1.5 rounded-full inline-flex">
                <Tab
                  label="Lesson Details"
                  active={activeTab === "details"}
                  onClick={() => setActiveTab("details")}
                />
                <Tab
                  label={`Lessons (${subLessons.length})`}
                  active={activeTab === "lessons"}
                  onClick={() => setActiveTab("lessons")}
                />
              </div>
            </div>


            {/* Content: Details */}
            {activeTab === "details" && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
                  <p className="text-gray-500 text-sm mt-1">Configure course details and settings</p>
                </div>
                <div className="space-y-6 w-full">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title</label>
                    <input
                      type="text"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={lessonDescription}
                      onChange={(e) => setLessonDescription(e.target.value)}
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none resize-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content: Lessons List */}
            {activeTab === "lessons" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B1B3A]">Total Lessons</h3>
                    <p className="text-sm text-gray-500 mt-1">{subLessons.length} lessons</p>
                  </div>
                  
                  {/* ADD LESSON BUTTON - Triggers Modal */}
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#E13030] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lesson
                  </button>
                </div>

                <div className="space-y-4">
                  {subLessons.map((lesson, index) => (
                    <SubLessonCard 
                      key={lesson.id}
                      index={index + 1}
                      title={lesson.title}
                      subtitle={lesson.parentLesson}
                      onEdit={() => handleEditSubLesson(lesson)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}


        {/* ========================================================= */}
        {/* VIEW 2: EDIT SUB-LESSON                                   */}
        {/* ========================================================= */}
        {view === "edit-sublesson" && currentSubLesson && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackToMain}
                className="text-gray-600 hover:text-black font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Lesson
              </button>
              <button className="bg-[#E13030] text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-red-700 transition shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                <p className="text-gray-500 text-sm mt-1">Configure sub-lesson details</p>
              </div>
              <div className="space-y-6 w-full"> 
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title</label>
                  <input
                    type="text"
                    value={currentSubLesson.title}
                    onChange={(e) => setCurrentSubLesson({...currentSubLesson, title: e.target.value})}
                    className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg px-4 py-3 text-sm transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={currentSubLesson.description}
                    onChange={(e) => setCurrentSubLesson({...currentSubLesson, description: e.target.value})}
                    rows={12}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed focus:border-red-500 focus:ring-1 focus:ring-red-100 transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* COMPONENT: ADD LESSON MODAL                               */}
      {/* ========================================================= */}
      <AddLessonModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreateLesson}
      />

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

// 1. Tab Component
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
      }`}
    >
      {label}
    </button>
  );
}


// 2. Lesson Card Component
function SubLessonCard({ index, title, subtitle, onEdit }: { index: number; title: string; subtitle: string; onEdit: () => void; }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:border-red-100 transition-colors flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-600 font-bold text-lg">
          {index}
        </span>
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-50">
          <Pencil size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-red-50">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// 3. Add Lesson Modal Component (NEW)
function AddLessonModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSave({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-red-600">Add New Lesson</h3>
            <p className="text-sm text-gray-500 mt-1">Add a new lesson to your platform</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-2 space-y-4">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title</label>
            <input 
              type="text" 
              placeholder="e.g., Khmer Rouge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              rows={3}
              placeholder="Brief description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:border-red-500 outline-none transition-all resize-none placeholder:text-gray-400"
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Documentation</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>


        {/* Modal Footer */}
        <div className="px-6 py-4 flex gap-3 mt-2">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-[#E13030] text-white text-sm font-medium rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            Create Lesson
          </button>
        </div>

      </div>
    </div>
  );
}
