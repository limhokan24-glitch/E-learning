// services/adminService.ts
import { auth } from "@/firebase/firebaseClient";

const API_BASE_URL = "https://backend-rauth.vercel.app/api";

const getAuthHeader = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated. Please log in.");
  }
  const token = await currentUser.getIdToken();
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

export interface DashboardStats {
  totalStudents: number;
  totalQuizzes: number;
  totalLessons: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Fetch all data in parallel
    const [usersRes, quizzesRes, lessonsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/auth/users`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/quizzes`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/lessons`, { cache: "no-store" }),
    ]);

    if (!usersRes.ok || !quizzesRes.ok || !lessonsRes.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const [users, quizzes, lessons] = await Promise.all([
      usersRes.json(),
      quizzesRes.json(),
      lessonsRes.json(),
    ]);

    return {
      totalStudents: Array.isArray(users) ? users.length : 0,
      totalQuizzes: Array.isArray(quizzes) ? quizzes.length : 0,
      totalLessons: Array.isArray(lessons) ? lessons.length : 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// Mock data for enrollment trend - replace with real API when available
export const getEnrollmentTrend = () => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [80, 130, 180, 260, 330, 390],
  };
};
