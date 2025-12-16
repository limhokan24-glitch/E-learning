"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaSave, FaEdit, FaTrash } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { auth } from "@/firebase/firebaseClient"; 

// --- CONFIG ---
const BASE_URL = "https://backend-rauth.vercel.app";

export default function EditMockExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params?.id as string;

  // UI State
  const [activeTab, setActiveTab] = useState<"details" | "questions" | "settings">("details");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    module: "",
    duration: 60,
    passingScore: 50,
    difficulty: "Medium",
    status: "Active",
    scheduleDate: "",
    questions: [] as any[], // Array to hold questions
    settings: {
        showTimer: true,
        randomize: false,
        retakes: true,
        showResults: true
    }
  });

  // 1. FETCH DATA
  useEffect(() => {
    if (!examId) return;

    const fetchExam = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mockexams/${examId}`);
        if (!res.ok) throw new Error("Failed to load exam");
        const data = await res.json();
        
        // Merge fetched data with default structure
        setFormData(prev => ({
          ...prev,
          title: data.title || "",
          module: data.module || "",
          description: data.description || "",
          duration: data.duration || 60,
          questions: data.questions || [],
          // Map other fields if they exist in your DB, otherwise keep defaults
        }));
      } catch (error) {
        console.error("Error:", error);
        alert("Could not load exam data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  // 2. HANDLE SAVE
  const handleSave = async () => {
    setSaving(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("You must be logged in.");
        return;
      }
      const token = await currentUser.getIdToken();

      const res = await fetch(`${BASE_URL}/api/mockexams/${examId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Exam updated successfully!");
      // router.push("/admin/admin-mock-exam"); // Uncomment if you want to redirect after save
    } catch (e) {
      console.error(e);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Helper to update specific fields
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-6 py-8 md:px-10 font-sans">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Link href="/admin/admin-mock" className="flex items-center text-sm text-gray-600 hover:text-red-600 transition">
          <FaArrowLeft className="mr-2" /> Back to Exams
        </Link>

        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2 justify-center disabled:opacity-70"
        >
          {saving ? <Loader2 className="animate-spin w-4 h-4" /> : "💾"}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>


      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <TabButton 
          label="Exam Details" 
          active={activeTab === "details"} 
          onClick={() => setActiveTab("details")} 
        />
        <TabButton 
          label={`Questions (${formData.questions.length})`} 
          active={activeTab === "questions"} 
          onClick={() => setActiveTab("questions")} 
        />
        <TabButton 
          label="Settings" 
          active={activeTab === "settings"} 
          onClick={() => setActiveTab("settings")} 
        />
      </div>

      {/* CONTENT SWITCH */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === "details" && (
            <ExamDetailsTab formData={formData} onChange={updateField} />
        )}
        {activeTab === "questions" && (
            <QuestionsTab questions={formData.questions} />
        )}
        {activeTab === "settings" && (
            <SettingsTab settings={formData.settings} />
        )}
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-sm rounded-full border transition whitespace-nowrap ${
        active ? "bg-white border-red-100 text-red-600 shadow-sm font-semibold" : "bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

// 1. DETAILS TAB
function ExamDetailsTab({ formData, onChange }: { formData: any, onChange: (f:string, v:any) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-5xl">
      <h3 className="text-base font-bold text-[#1B1B3A]">Basic Information</h3>
      <p className="text-sm text-gray-500 mb-6">Configure exam details and metadata</p>

      {/* Module Name */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-1.5">Module Name</label>
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
          value={formData.module}
          onChange={(e) => onChange("module", e.target.value)}
        />
      </div>

      {/* Exam Title */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-1.5">Exam Title</label>
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-1.5">Description</label>
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition resize-none"
          rows={3}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>


      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Duration (min)</label>
          <input
            type="number"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
            value={formData.duration}
            onChange={(e) => onChange("duration", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Difficulty</label>
          <div className="relative">
            <select 
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
                value={formData.difficulty}
                onChange={(e) => onChange("difficulty", e.target.value)}
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Passing Score (%)</label>
          <input
            type="number"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
            value={formData.passingScore}
            onChange={(e) => onChange("passingScore", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Schedule Date</label>
          <input
            type="date"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition text-gray-600"
            value={formData.scheduleDate}
            onChange={(e) => onChange("scheduleDate", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Status</label>
          <div className="relative">
            <select 
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 outline-none transition"
                value={formData.status}
                onChange={(e) => onChange("status", e.target.value)}
            >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. QUESTIONS TAB
function QuestionsTab({ questions }: { questions: any[] }) {
  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-[#1B1B3A]">Exam Questions</h3>
          <p className="text-sm text-gray-500">Total Questions: {questions.length}</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg transition">
          + Add Question
        </button>
      </div>


      {questions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-400">No questions added yet.</p>
          </div>
      ) : (
          <div className="space-y-4">
            {questions.map((q, idx) => (
                <QuestionCard 
                    key={idx} 
                    index={idx + 1} 
                    question={q.questionText || "Untitled Question"} 
                    type={q.type || "Multiple Choice"}
                    points={q.points || 1}
                />
            ))}
          </div>
      )}
    </div>
  );
}

function QuestionCard({ index, question, type, points }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <span className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-sm font-bold border border-red-100 shrink-0">
            {index}
          </span>
          <div>
            <p className="text-[#1B1B3A] font-medium mb-2">{question}</p>
            <div className="flex gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{points} pts</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-gray-400">
          <button className="p-2 hover:bg-gray-50 rounded-full hover:text-blue-500 transition"><FaEdit /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full hover:text-red-500 transition"><FaTrash /></button>
        </div>
      </div>
    </div>
  );
}

// 3. SETTINGS TAB
function SettingsTab({ settings }: { settings: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-5xl">
      <h3 className="text-base font-bold text-[#1B1B3A]">Exam Settings</h3>
      <p className="text-sm text-gray-500 mb-6">Configure how students will experience this exam</p>

      <div className="space-y-6 divide-y divide-gray-50">
        <SettingItem title="Show Timer" description="Display countdown timer to students" checked={settings.showTimer} />
        <SettingItem title="Randomize Questions" description="Shuffle question order for each student" checked={settings.randomize} />
        <SettingItem title="Allow Retakes" description="Let students retake the exam" checked={settings.retakes} />
        <SettingItem title="Show Results Immediately" description="Display score right after submission" checked={settings.showResults} />
      </div>
    </div>
  );
}

function SettingItem({ title, description, checked }: { title: string, description: string, checked: boolean }) {
  const [enabled, setEnabled] = useState(checked);
  return (
    <div className="flex justify-between items-center pt-4 first:pt-0">
      <div>
        <p className="text-sm font-semibold text-[#1B1B3A]">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
          enabled ? "bg-red-500" : "bg-gray-200"
        }`}
      >
        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
        }`} />
      </button>
    </div>
  );
}
