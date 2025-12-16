"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseClient"; 
import { Loader2, X } from "lucide-react";

// --- CONFIG ---
const BASE_URL = "https://backend-rauth.vercel.app"; 

export default function CreateMockExamModal({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  
  // REQUIRED STATES
  const [title, setTitle] = useState("");
  const [moduleName, setModuleName] = useState("");
  
  // DUMMY STATES (Visual only)
  const [description, setDescription] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreate = async () => {
    if (!title || !moduleName) {
      alert("Please enter a Title and Module Name.");
      return;
    }
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("You must be logged in.");
        setLoading(false);
        return;
      }
      const token = await currentUser.getIdToken();
      const payload = {
        title: title,
        module: moduleName, 
        questions: [], 
      };
      const res = await fetch(`${BASE_URL}/api/mockexams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create exam");
      }
      onSuccess(); 
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // OUTLAY: Fixed position, full inset, flex centering, high z-index
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* BACKGROUND BACKDROP: Darkened with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* MODAL CARD: Relative so it sits above backdrop */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start p-8 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Create New Mock Exam
            </h3>
            <p className="text-sm text-gray-500 mt-1">Set up a timed exam details and configuration.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
          
          {/* Module Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Module Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Modern History"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition placeholder:text-gray-400"
            />
          </div>


          {/* Exam Title */}
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Exam Title <span className="text-red-500">*</span>
             </label>
            <input
              type="text"
              placeholder="e.g. Mid-Term History Exam"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Brief description of the exam..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition resize-none h-24 placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Questions</label>
              <input
                type="number"
                placeholder="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (min)</label>
              <input
                type="number"
                placeholder="60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Date</label>
               <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition text-gray-500" />
            </div>
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Pass Score (%)</label>
               <input
                type="number"
                placeholder="70"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 space-y-4">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Settings</h4>
            {[
              { l: "Timer Visibility", checked: true }, 
              { l: "Randomize Questions", checked: false }, 
              { l: "Allow Retakes", checked: true }
            ].map((item, idx) => (
              <div key={item.l} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-gray-700 font-medium text-sm">{item.l}</span>
                {/* Visual Toggle */}
                <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.checked ? 'bg-red-500' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${item.checked ? 'left-6' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Footer */}
        <div className="flex justify-end gap-3 p-8 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-white hover:border-gray-400 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Creating..." : "Create Exam"}
          </button>
        </div>

      </div>
    </div>
  );
}
