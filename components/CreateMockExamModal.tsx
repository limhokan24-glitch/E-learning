"use client";
export default function CreateMockExamModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-red-600">
            Create New Mock Exam
          </h3>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Exam Title"
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Brief description of the exam..."
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Number of Questions"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              className="border rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded-lg px-4 py-2" />
            <input
              type="number"
              placeholder="Passing Score (%)"
              className="border rounded-lg px-4 py-2"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2">
            {[
              "Timer Visibility",
              "Randomize Questions",
              "Allow Retakes",
              "Show Results Immediately",
            ].map((label) => (
              <div key={label} className="flex justify-between items-center">
                <span>{label}</span>
                <input type="checkbox" className="accent-red-500" />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium text-[#1B1B3A] mb-2">
              Question Selection
            </h4>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <span className="text-lg">+</span>
              <span>Add Questions</span>
            </button>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4">
            <button onClick={onClose} className="px-6 py-2 rounded-full border">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600">
              Create Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
