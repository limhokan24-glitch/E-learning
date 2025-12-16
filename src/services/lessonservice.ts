import { auth } from "@/firebase/firebaseClient"; // Ensure this path matches your project structure

// CHANGE THIS if your backend URL is different
const API_BASE_URL = "https://backend-rauth.vercel.app/api/lessons";

export interface Lesson {
  id?: string;
  title: string;
  module: string;       // e.g., "Khmer Rouge History"
  description: string;  // e.g., "Overview of the movement..."
  content?: string;     // Optional full content
  order: number;        // e.g., 1, 2, 3
}

// Helper: Gets the current user's token for every request
const getAuthHeader = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    // You might want to redirect to login here in a real app
    throw new Error("User not authenticated. Please log in.");
  }
  const token = await currentUser.getIdToken();
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

// 1. GET ALL LESSONS (Public or Private depending on your routes)
export const getAllLessons = async (): Promise<Lesson[]> => {
  // If your GET route is protected, uncomment the next line:
  // const headers = await getAuthHeader();
  
  // Currently assuming GET is public:
  const res = await fetch(API_BASE_URL, { 
    cache: "no-store" 
    // headers: headers 
  });

  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
};

// 2. GET SINGLE LESSON
export const getLessonById = async (id: string): Promise<Lesson> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch lesson");
  return res.json();
};

// 3. CREATE LESSON (Requires Token)
export const createLesson = async (data: Lesson) => {
  const headers = await getAuthHeader(); // Get fresh token
  
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create lesson");
  }
  return res.json();
};

// 4. UPDATE LESSON (Requires Token)
export const updateLesson = async (id: string, data: Partial<Lesson>) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update lesson");
  }
  return res.json();
};

// 5. DELETE LESSON (Requires Token)
export const deleteLesson = async (id: string) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!res.ok) throw new Error("Failed to delete lesson");
  return res.json();
};
