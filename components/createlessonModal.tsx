"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createLesson } from "@/src/services/lessonservice";

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export default function CreateLessonModal({
  isOpen,
  onClose,
  onCreate,
}: CreateLessonModalProps) {
  const [title, setTitle] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title || !moduleName || !order) {
      setError("Please fill in Title, Module, and Order.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const newLesson = {
        title,
        module: moduleName,
        description,
        order: Number(order),
      };

      const result = await createLesson(newLesson);
      onCreate(result);
      
      // Reset form
      setTitle("");
      setModuleName("");
      setDescription("");
      setOrder("");
      setFile(null);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-red-600">
              Create New Lesson
            </h2>
            <p className="text-sm text-gray-500">
              Add a new lesson to your platform
            </p>
          </div>
          <button onClick={onClose} disabled={loading}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Lesson Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lesson Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Introduction to Khmer Rouge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Module Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Module Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Khmer Rouge History"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Order Number */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Order Number *
            </label>
            <input
              type="number"
              placeholder="e.g., 1"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>


          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Brief description of the lesson"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Documentation
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-8 text-center hover:border-red-400">
              <Upload className="mb-2 h-6 w-6 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">(Optional)</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition ${
              loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Creating..." : "Create Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
}
