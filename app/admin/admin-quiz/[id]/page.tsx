// src/app/admin/admin-quiz/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaTrash, FaPen, FaCheckCircle, FaSave } from "react-icons/fa";
import { getQuizById, updateQuiz, Quiz, Question } from "@/src/services/Quizservice";
import AddQuestionModal from "@/components/AddQuestionModal"; // <--- IMPORT THE NEW MODAL

export default function EditQuizPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"details" | "questions" | "settings">("details");
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false); // <--- MODAL STATE

  useEffect(() => {
    if (id) fetchQuizData(id as string);
  }, [id]);

  const fetchQuizData = async (quizId: string) => {
    try {
      const data = await getQuizById(quizId);
      if (!data.settings) {
        data.settings = { shuffleQuestions: false, showCorrectAnswers: true, allowMultipleAttempts: true };
      }
      if (!data.questions) data.questions = [];
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!quizData || !id) return;
    try {
      await updateQuiz(id as string, quizData);
      alert("Changes saved successfully!");
    } catch (error) {
      alert("Error updating quiz");
    }
  };

  // Called when "Add Question" inside the modal is clicked
  const handleAddQuestionFromModal = (newQuestion: any) => {
    if (!quizData) return;
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
    // Ensure we stay on the questions tab to see the new item
    setActiveTab("questions"); 
  };

  if (loading) return <div className="p-10 text-center">Loading quiz data...</div>;
  if (!quizData) return <div className="p-10 text-center">Quiz not found</div>;

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-10 font-sans">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/admin/admin-quiz" className="flex items-center text-gray-600 hover:text-black gap-2 font-medium transition">
          <FaArrowLeft /> Back to Quizzes
        </Link>
        <button 
          onClick={handleSave}
          className="bg-[#E53E3E] text-white px-6 py-2.5 rounded shadow-sm hover:bg-red-700 transition flex items-center gap-2 font-semibold"
        >
           <FaSave /> Save Changes
        </button>
      </div>

      {/* Tabs Header */}
      <div className="bg-transparent mb-4">
        <div className="flex gap-4">
            <TabButton label="Quiz Details" isActive={activeTab === "details"} onClick={() => setActiveTab("details")} />
            <TabButton label={`Questions (${quizData.questions.length})`} isActive={activeTab === "questions"} onClick={() => setActiveTab("questions")} />
            <TabButton label="Settings" isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
        
        {/* --- TAB 1: DETAILS --- */}
        {activeTab === "details" && (
          <div className="max-w-4xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1B1B3A]">Basic Information</h3>
                <p className="text-gray-400 text-sm">Configure quiz details and metadata</p>
            </div>


            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Quiz Title</label>
                    <input
                        type="text"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                        value={quizData.title}
                        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                    <textarea
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-1 focus:ring-red-500"
                        value={quizData.description || ""}
                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Module</label>
                        <input
                        type="text"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                        value={quizData.module}
                        onChange={(e) => setQuizData({ ...quizData, module: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Time Limit (minutes)</label>
                        <input
                        type="number"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                        value={quizData.timeLimit || 15}
                        onChange={(e) => setQuizData({ ...quizData, timeLimit: parseInt(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: QUESTIONS --- */}
        {activeTab === "questions" && (
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#1B1B3A]">Quiz Questions</h3>
                <p className="text-gray-400 text-sm">Total Points: {quizData.questions.length}</p>
              </div>
              <button 
                onClick={() => setIsQuestionModalOpen(true)} // <--- OPENS MODAL
                className="bg-[#E53E3E] text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition font-medium flex items-center gap-2"
              >
                + Add Question
              </button>
            </div>


            <div className="space-y-6">
              {quizData.questions.map((q, qIndex) => (
                <div key={qIndex} className="border border-gray-200 rounded-xl p-6 relative hover:border-red-200 transition bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-bold text-sm">
                            {qIndex + 1}
                        </div>
                        <span className="bg-gray-100 text-xs font-semibold px-3 py-1 rounded-full text-gray-600">Multiple Choice</span>
                        {/* Display Points if available, defaulting to 1 */}
                        <span className="bg-gray-100 text-xs font-semibold px-3 py-1 rounded-full text-gray-600">{(q as any).points || 1} point</span>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                      <FaPen className="cursor-pointer hover:text-gray-600 transition" />
                      <FaTrash 
                        className="cursor-pointer hover:text-red-500 transition" 
                        onClick={() => {
                           const newQuestions = [...quizData.questions];
                           newQuestions.splice(qIndex, 1);
                           setQuizData({...quizData, questions: newQuestions});
                        }}
                      />
                    </div>
                  </div>

                  <p className="font-semibold text-gray-800 mb-4 text-lg">{q.questionText}</p>

                  <div className="space-y-3 pl-2">
                    {q.options.map((opt, oIndex) => {
                      const isCorrect = q.correctAnswerIndex === oIndex;
                      return (
                        <div 
                          key={oIndex} 
                          className={`p-3 rounded-lg border flex items-center justify-between text-sm ${
                            isCorrect ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-600'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + oIndex)}. {opt}</span>
                          {isCorrect && <span className="text-xs font-bold flex items-center gap-1"><FaCheckCircle /> Correct</span>}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Show explanation if it exists */}
                  {q.explanation && (
                     <div className="mt-4 bg-blue-50 p-3 rounded text-xs text-blue-800">
                        <span className="font-bold">Explanation:</span> {q.explanation}
                     </div>
                  )}
                </div>
              ))}
              
              {quizData.questions.length === 0 && (
                  <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      No questions yet. Click "Add Question" to start.
                  </div>
              )}
            </div>
          </div>
        )}


        {/* --- TAB 3: SETTINGS --- */}
        {activeTab === "settings" && (
          <div className="max-w-3xl">
             <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1B1B3A]">Quiz Settings</h3>
                <p className="text-gray-400 text-sm">Configure how students will experience this quiz</p>
            </div>
            <div className="space-y-8 bg-white">
              <ToggleRow 
                label="Shuffle Questions" 
                desc="Randomize question order for each attempt"
                checked={quizData.settings?.shuffleQuestions || false}
                onChange={(val) => setQuizData({ ...quizData, settings: { ...quizData.settings!, shuffleQuestions: val }})}
              />
              <ToggleRow 
                label="Show Correct Answers" 
                desc="Display correct answers after submission"
                checked={quizData.settings?.showCorrectAnswers || false}
                onChange={(val) => setQuizData({ ...quizData, settings: { ...quizData.settings!, showCorrectAnswers: val }})}
              />
              <ToggleRow 
                label="Allow Multiple Attempts" 
                desc="Let students retake the quiz"
                checked={quizData.settings?.allowMultipleAttempts || false}
                onChange={(val) => setQuizData({ ...quizData, settings: { ...quizData.settings!, allowMultipleAttempts: val }})}
              />
              <div className="pt-4 border-t border-gray-100">
                 <label className="block text-sm font-semibold mb-2 text-gray-700">Passing Score (%)</label>
                 <input 
                    type="number" 
                    className="w-full max-w-xs p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={quizData.passingScore || 70}
                    onChange={(e) => setQuizData({ ...quizData, passingScore: Number(e.target.value) })}
                 />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- RENDER THE ADD QUESTION MODAL --- */}
      <AddQuestionModal 
        isOpen={isQuestionModalOpen} 
        onClose={() => setIsQuestionModalOpen(false)} 
        onAdd={handleAddQuestionFromModal} 
      />

    </div>
  );
}

// Subcomponents
function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isActive ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100"}`}>{label}</button>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <div className="flex justify-between items-center group">
      <div><h4 className="font-semibold text-gray-800">{label}</h4><p className="text-xs text-gray-400">{desc}</p></div>
      <div className={`w-14 h-7 rounded-full cursor-pointer p-1 transition-colors duration-300 ${checked ? 'bg-[#E53E3E]' : 'bg-gray-300'}`} onClick={() => onChange(!checked)}><div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-7' : 'translate-x-0'}`} /></div>
    </div>
  )
}
