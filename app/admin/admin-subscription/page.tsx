"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  X, 
  Search, 
  Filter, 
  Download,
  Loader2,
  AlertCircle
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { onAuthStateChanged } from "firebase/auth";
// Importing from your specific client file path
import { auth } from "@/firebase/firebaseClient"; 

// Backend URL
const API_URL = "https://backend-rauth.vercel.app"; 

// Data Types based on your Backend "USERS" collection
type UserData = {
  id: string;
  Username: string;
  Email: string;
  Role: "Student" | "Premium" | "Admin";
  // Firebase timestamp usually comes back as _seconds when fetched via REST, or ISO string
  CreatedAt: { _seconds: number } | string | Date; 
};

export default function AdminSubscriptionPage() {
  // STATE
  const [openStudentDetail, setOpenStudentDetail] = useState(false);
  const [students, setStudents] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, premium: 0, revenue: 0 });

  // FETCH DATA
  useEffect(() => {
    // 1. Wait for Firebase to restore the session
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser) {
          setError("You must be logged in to view subscriptions.");
          setLoading(false);
          return;
        }

        // 2. Get the ID Token
        const token = await currentUser.getIdToken();

        // 3. Call Backend
        const res = await fetch(`${API_URL}/api/auth/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Failed to fetch users");
        }

        const data: UserData[] = await res.json();
        
        // 4. Process Data for UI
        setStudents(data);
        
        // Calculate Stats
        const premiumCount = data.filter(u => u.Role === "Premium").length;
        
        // Mocking revenue calc: $10 for Premium
        const estimatedRevenue = premiumCount * 10; 

        setStats({
          total: data.length,
          premium: premiumCount,
          revenue: estimatedRevenue
        });
        
        setError(""); // Clear previous errors

      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred fetching subscriptions");
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Filter recent subscriptions (Top 3 most recently created)
  const recentSubscriptions = [...students]
    .sort((a, b) => {
        const dateA = new Date(formatDate(a.CreatedAt)).getTime();
        const dateB = new Date(formatDate(b.CreatedAt)).getTime();
        return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9] font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky top-0 z-30">
        {/* Restored your original Logo Image */}
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} className="object-contain" />


        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
          <Link href="/admin/admin-dashboard" className="hover:text-red-600 transition">Admin Dashboard</Link>
          <Link href="/admin/admin-lesson" className="hover:text-red-600 transition">Lesson</Link>
          <Link href="/admin/admin-quiz" className="hover:text-red-600 transition">Quiz</Link>
          <Link href="/admin/admin-mock" className="hover:text-red-600 transition">Mock Exam</Link>
          <Link
            href="/admin/admin-subscription"
            className="text-red-600 border-b-2 border-red-600 pb-1"
          >
            Subscription
          </Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-6 py-2 rounded-full text-sm hover:bg-red-600 transition shadow-sm font-medium">
            Log out
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 sm:px-10 mt-12 mb-16">
        <section className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1B1B3A]">
              Subscription <span className="text-red-600">Management</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Monitor subscription plans, revenue, and student status.
            </p>
          </div>

          {/* LOADING / ERROR STATE */}
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-red-600" />
              <p>Loading subscription data...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 mb-8 border border-red-100">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                <StatCard
                  title="Total Users"
                  value={stats.total.toString()}
                  icon={<Users className="w-8 h-8 text-white" />}
                />
                <StatCard
                  title="Premium Users"
                  value={stats.premium.toString()}
                  icon={<TrendingUp className="w-8 h-8 text-white" />}
                />
                <StatCard
                  title="Est. Revenue"
                  value={`$${stats.revenue}`}
                  icon={<CreditCard className="w-8 h-8 text-white" />}
                />
              </div>

              {/* Recent Subscriptions Header */}
              <div className="mt-16 flex items-end justify-between border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B1B3A]">
                    Recent <span className="text-red-600">Activity</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest students joining or upgrading plans
                  </p>
                </div>
                
                <button
                  onClick={() => setOpenStudentDetail(true)}
                  className="bg-[#1B1B3A] text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <Users size={16} />
                  View All Students
                </button>
              </div>


              {/* Recent Subscriptions List */}
              <div className="mt-6 space-y-4">
                {recentSubscriptions.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">No recent users found.</p>
                ) : (
                  recentSubscriptions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 hover:border-red-100 hover:shadow-md transition cursor-default group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-red-50 group-hover:text-red-500 transition">
                            <span className="font-bold">{(item.Username || "U").charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-base font-bold text-[#1B1B3A]">
                            {item.Username || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">{item.Email}</p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-400">Role</p>
                            <p className="text-sm font-semibold text-gray-700">{item.Role || "Student"}</p>
                        </div>
                        <span
                          className={`text-xs font-bold px-4 py-1.5 rounded-full border ${
                            item.Role === "Premium"
                              ? "bg-red-50 text-red-600 border-red-100"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {item.Role || "Student"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Modal Integration */}
          {openStudentDetail && (
            <StudentDetailModal 
              onClose={() => setOpenStudentDetail(false)} 
              studentData={students}
            />
          )}

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
           {/* Restored your original Footer Icon */}
           <Image
            src="/logo-icon.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-xs opacity-90 max-w-md mx-auto leading-relaxed">
          Empowering learners to grow their skills anytime, anywhere. <br/>
          Learn at your own pace and achieve your dreams.
        </p>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */


function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="relative bg-white w-full max-w-[320px] h-[200px] p-8 pt-12 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C1282D] w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-white">
        {icon}
      </div>
      <h4 className="text-gray-500 font-medium text-sm mt-4 uppercase tracking-wider">{title}</h4>
      <h2 className="text-4xl font-extrabold text-[#1B1B3A] mt-4">{value}</h2>
    </div>
  );
}

// Helper to format date safely from different formats
const formatDate = (dateInput: any) => {
  if (!dateInput) return "N/A";
  try {
    // 1. Handle Firebase Timestamp (has _seconds)
    if (dateInput._seconds) {
        return new Date(dateInput._seconds * 1000).toLocaleDateString();
    }
    // 2. Handle ISO String or Date Object
    return new Date(dateInput).toLocaleDateString();
  } catch (e) {
    console.log(e);
    return "Invalid Date";
  }
};


function StudentDetailModal({ 

  onClose, 

  studentData 

}: { 

  onClose: () => void;

  studentData: UserData[];

}) {

  const [searchTerm, setSearchTerm] = useState("");



  const filteredStudents = studentData.filter(student => 

    (student.Username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||

    (student.Email || "").toLowerCase().includes(searchTerm.toLowerCase())

  );



const getStatusConfig = (role: string) => {

    if (role === "Premium") {

      return { text: "Active", color: "text-green-600", dot: "bg-green-600" };

    }

    // All other roles (Student, Admin, etc.) are considered Inactive

    return { text: "Inactive", color: "text-gray-400", dot: "bg-gray-400" };

  };



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">

        

        {/* Modal Header */}

        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">

          <div>

            <h3 className="text-xl font-bold text-[#1B1B3A]">All Students</h3>

            <p className="text-sm text-gray-500 mt-1">Manage and view all registered users</p>

          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition">

            <X size={24} />

          </button>

        </div>



        {/* Toolbar */}

        <div className="px-8 py-4 flex gap-4 border-b border-gray-100">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

            <input 

              type="text" 

              placeholder="Search by name or email..." 

              value={searchTerm}

              onChange={(e) => setSearchTerm(e.target.value)}

              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-red-500 outline-none transition"

            />

          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">

            <Filter size={16} /> Filter

          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">

            <Download size={16} /> Export

          </button>


        </div>
{/* Table Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Student Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                // 1. Call your helper function here
                const status = getStatusConfig(student.Role);
                
                return (
                  <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-2 font-medium text-[#1B1B3A]">{student.Username || "No Name"}</td>
                    <td className="py-4 text-sm text-gray-500">{student.Email}</td>
                    
                    {/* Role Column */}
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.Role === "Premium" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-800"
                      }`}>
                        {student.Role || "Student"}
                      </span>
                    </td>

                    {/* Status Column - Using the simple "Active/Inactive" logic */}
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 text-sm ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.text}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-gray-400">{formatDate(student.CreatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>{`No students found matching ${searchTerm}`}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <p>Showing {filteredStudents.length} students</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

