"use client";
export default function StudentDetailModal({ onClose }: { onClose: () => void }) {
  const students = [
    {
      initials: "MH",
      name: "March Hour",
      email: "March.hour@email.com",
      progress: "2/3 lessons",
      progressPercent: 67,
      avgScore: 85,
      studyTime: "24h",
      plan: "Premium",
      trend: "up",
    },
    {
      initials: "UR",
      name: "Uy Reach",
      email: "reachuy@email.com",
      progress: "1/2 lessons",
      progressPercent: 50,
      avgScore: 78,
      studyTime: "18h",
      plan: "Free",
      trend: "up",
    },
    {
      initials: "FD",
      name: "Fong Dev",
      email: "fongdev@email.com",
      progress: "3/4 lessons",
      progressPercent: 75,
      avgScore: 92,
      studyTime: "32h",
      plan: "Premium",
      trend: "up",
    },
    {
      initials: "NS",
      name: "Nuon Seng",
      email: "nuon.seng@email.com",
      progress: "1/2 lessons",
      progressPercent: 50,
      avgScore: 65,
      studyTime: "12h",
      plan: "Free",
      trend: "down",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1B1B3A]">
              All Students
            </h3>
            <p className="text-sm text-gray-500">
              Overview of student performance
            </p>
          </div>
          <button onClick={onClose} className="text-xl text-gray-500">
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Student</th>
                <th>Progress</th>
                <th>Avg Score</th>
                <th>Study Time</th>
                <th>Plan</th>
                <th>Trend</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b last:border-none">
                  {/* Student */}
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                      {s.initials}
                    </div>
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-gray-500 text-xs">{s.email}</p>
                    </div>
                  </td>

                  {/* Progress */}
                  <td>
                    <p>{s.progress}</p>
                    <div className="w-28 h-1 bg-gray-200 rounded mt-1">
                      <div
                        className="h-1 bg-red-500 rounded"
                        style={{ width: `${s.progressPercent}%` }}
                      />
                    </div>
                  </td>

                  {/* Avg Score */}
                  <td>
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {s.avgScore}%
                    </span>
                  </td>

                  {/* Study Time */}
                  <td>{s.studyTime}</td>

                  {/* Plan */}
                  <td>
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${
                        s.plan === "Premium"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {s.plan}
                    </span>
                  </td>

                  {/* Trend */}
                  <td>
                    {s.trend === "up" ? (
                      <span className="text-green-500">↗</span>
                    ) : (
                      <span className="text-red-500">↘</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-full text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
