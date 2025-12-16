import { auth } from "@/firebase/firebaseClient"; // Make sure this path points to your firebase config

const API_BASE_URL = "https://backend-rauth.vercel.app/api/quizzes";

export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id?: string;
  title: string;
  module: string;
  description?: string;
  timeLimit?: number;
  passingScore?: number;
  questions: Question[];
  settings?: {
    shuffleQuestions: boolean;
    showCorrectAnswers: boolean;
    allowMultipleAttempts: boolean;
  };
}

// Helper to get the token securely every time
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

// 1. Fetch all quizzes (Public or Private depending on backend)
export const getAllQuizzes = async (): Promise<Quiz[]> => {
  // If your 'get' endpoint is public, you don't need the token here.
  // If it requires login, uncomment the lines below:
  // const headers = await getAuthHeader(); 
  // const res = await fetch(API_BASE_URL, { headers, cache: "no-store" });
  
  const res = await fetch(API_BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
};

// 2. Get single quiz
export const getQuizById = async (id: string): Promise<Quiz> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

// 3. Create quiz (NEEDS TOKEN)
export const createQuiz = async (data: Partial<Quiz>) => {
  const headers = await getAuthHeader(); // <--- Dynamically gets real token
  
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create quiz");
  }
  return res.json();
};

// 4. Update quiz (NEEDS TOKEN)
export const updateQuiz = async (id: string, data: Partial<Quiz>) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update quiz");
  }
  return res.json();
};

// 5. Delete quiz (NEEDS TOKEN)
export const deleteQuiz = async (id: string) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: headers, // Pass header object, not string
  });

  if (!res.ok) throw new Error("Failed to delete quiz");
  return res.json();
};
