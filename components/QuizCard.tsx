"use client";
import { FaTrashAlt } from "react-icons/fa";

export default function QuizCard({
  title,
  onEdit,
}: {
  title: string;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white w-[280px] h-[220px] p-10 rounded-2xl shadow text-center">
      <h3 className="text-sm text-[#1B1B3A] mt-6">{title}</h3>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onEdit}
          className="bg-red-500 text-white px-6 py-2 rounded-full text-sm"
        >
          Edit
        </button>

        <button className="text-red-500">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}
