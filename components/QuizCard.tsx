// src/components/QuizCard.tsx
import React from "react";
import { FaTrash, FaPen } from "react-icons/fa"; 

interface QuizCardProps {
  title: string;
  moduleName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function QuizCard({ title, moduleName, onEdit, onDelete }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center w-full hover:shadow-md transition-shadow">
      {/* Icon Circle */}
      <div className="w-16 h-16 rounded-full bg-[#E53E3E] flex items-center justify-center mb-4 shadow-red-200 shadow-lg">
        {/* Brain Icon Representation */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-center font-bold text-[#1B1B3A] text-lg mb-1 leading-tight line-clamp-2 min-h-[3.5rem] flex items-center">
        {title}
      </h3>
      
      {/* Module Subtitle */}
      <p className="text-xs text-gray-500 mb-6 font-medium bg-gray-100 px-2 py-1 rounded">
        {moduleName}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={onEdit}
          className="bg-[#E53E3E] text-white px-6 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition shadow-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-[#E53E3E] hover:text-red-800 transition p-2 text-lg"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
