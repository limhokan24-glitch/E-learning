"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseClient"; 
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type");
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(formType !== "register");
  }, [formType]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 🔐 LOGIN FLOW
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get Token to read database
        const token = await user.getIdToken();

        // 🛑 FETCH REAL DATABASE ROLE (More reliable than claims)
        // This ensures if you manually edited the DB, it works immediately.
        const res = await fetch("https://backend-rauth.vercel.app/api/auth/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("User Profile from DB:", data);
            
            // Check the 'Role' field exactly as it appears in Firestore
            if (data.Role === "Admin") {
                router.push("/admin/admin-dashboard");
            } else {
                router.push("/overview");
            }
        } else {
            console.error("Could not fetch user profile to check role.");
            router.push("/overview"); // Fallback
        }

      } else {
        // 🆕 REGISTER FLOW
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // 2. Get Token for API
        const token = await user.getIdToken();

        // 3. Create Firestore Profile (Default role: Student)
        const res = await fetch("https://backend-rauth.vercel.app/api/auth/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            email: email,
            // If your backend supports fullName, add it here:
            // fullName: fullName 
          }),
        });

        if (!res.ok) throw new Error("Failed to create user profile");

        alert("Account created successfully!");
        router.push("/overview");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md w-[90%] max-w-5xl flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block relative">
          <Image
            src={isLogin ? "/sign-in.jpg" : "/class.jpg"}
            alt="Students studying"
            fill
            className="object-cover"
            priority
          />
        </div>


        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-center text-gray-800 text-lg mb-6 font-medium">
            {isLogin ? "Welcome Back" : "Start Learning Today"}
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6 space-x-3">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                isLogin
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-red-200 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                !isLogin
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-red-200 text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2 font-medium mt-4 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (isLogin ? "Logging in..." : "Creating Account...") : (isLogin ? "Login" : "Register")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
