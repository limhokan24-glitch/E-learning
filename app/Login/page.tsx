"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type");
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setIsLogin(formType !== "register");
  }, [formType]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      const res = await signIn("credentials", {
        username,
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/overview");
      } else {
        alert("Invalid credentials!");
      }
    } else {
      alert("Register feature coming soon!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md w-[90%] max-w-5xl flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          {isLogin ? (
            <Image
              src="/sign-in.jpg"
              alt="Students studying"
              width={800}
              height={600}
              className="object-cover w-full h-full rounded-l-xl"
              priority
            />
          ) : (
            <Image
              src="/class.jpg"
              alt="Students studying"
              width={800}
              height={600}
              className="object-cover w-full h-full rounded-l-xl"
              priority
            />
          )}
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-center text-gray-800 text-lg mb-6 font-medium">
            Welcome to History E-Learning
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

          {/* Description */}
          <p className="text-center text-sm text-red-500 mb-6">
            {isLogin
              ? "Study at your own pace with lessons, quizzes, and tips made for BACII students."
              : "Create your account to access lessons, quizzes, and tips made for BACII students."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">User name</label>
              <input
                type="text"
                value={username} // Add this
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your User name"
                className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
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
                  placeholder="Re-enter your Password"
                  className="w-full border border-red-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center space-x-1">
                  <input type="checkbox" className="accent-red-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2 font-medium mt-4 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
