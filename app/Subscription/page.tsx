"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRModal from "@/components/QRModal";
import { auth } from "@/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function SubscriptionPage() {
  const [showQR, setShowQR] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check User Role on Load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Force refresh to get the latest claims (in case they just upgraded)
          const tokenResult = await user.getIdTokenResult(true);
          setIsPremium(tokenResult.claims.role === "Premium");
        } catch (e) {
          console.error("Error checking role", e);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // DEMO FUNCTION: Downgrade user back to Student
  const handleCancelSubscription = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!confirm("Are you sure you want to cancel your Premium subscription?")) return;

    // Use a local loading state for the button if needed, or re-use page loading
    // For simplicity in this demo function:
    try {
      const token = await user.getIdToken();
      const res = await fetch("https://backend-rauth.vercel.app/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: "Student", // Reset role
        }),
      });

      if (!res.ok) throw new Error("Failed to cancel Subscription");

      // Refresh token to update UI
      await user.getIdToken(true);
      alert("Subscription canceled. You are now a Student.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error cancelling Subscription.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky top-0 z-40">
        <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview">Overview</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/Subscription" className="font-semibold text-red-500">
            Subscription
          </Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Log out
          </button>
        </form>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 md:px-0 py-10 md:py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1B3A]">
              Affordable <span className="text-red-500">Pricing</span>
            </h1>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              {isPremium 
                ? "You are currently enjoying full Premium access." 
                : "Choose the plan that fits your learning needs. Upgrade anytime to unlock unlimited access."}
            </p>
          </div>


          {/* Conditional Layout: Centered if Premium, Grid if Free */}
          <div className={`gap-8 max-w-4xl mx-auto ${isPremium ? 'flex justify-center' : 'grid md:grid-cols-2'}`}>
            
            {/* Free Plan (Hide if Premium) */}
            {!isPremium && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <div className="mb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Basic
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#1B1B3A] mb-1">Free</p>
                  <p className="text-gray-400 text-sm mb-6">
                    Forever free, no credit card required.
                  </p>

                  <hr className="border-gray-100 mb-6" />

                  <ul className="space-y-4 text-sm text-gray-600">
                    {[
                      "Access to intro lessons",
                      "Limited quizzes (3 per day)",
                      "Basic progress tracking",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-1 min-w-[16px] h-4 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px]">✓</span>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  disabled 
                  className="mt-8 w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-500 py-3 font-semibold cursor-default"
                >
                  Current Plan
                </button>
              </div>
            )}

            {/* Premium Plan */}
            <div className={`bg-white rounded-3xl shadow-lg border-2 border-red-500 p-8 flex flex-col justify-between relative overflow-hidden transform transition duration-300 ${!isPremium ? 'hover:-translate-y-1' : ''} ${isPremium ? 'w-full max-w-md' : ''}`}>
              {!isPremium && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  POPULAR
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Premium
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#1B1B3A]">$10</span>
                  <span className="text-gray-500 font-medium">/ month</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Unlock your full potential.
                </p>

                <hr className="border-gray-100 mb-6" />


                <ul className="space-y-4 text-sm text-gray-600">
                  {[
                    "Unlimited access to ALL lessons",
                    "Unlimited Mock Exams & Quizzes",
                    "Detailed Answer Reviews",
                    "Priority Support",
                    "Offline Downloads (Coming Soon)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Button Based on Role */}
              {isPremium ? (
                <div className="flex flex-col gap-3 mt-8">
                  <button
                    disabled
                    className="w-full rounded-xl bg-green-100 text-green-700 border border-green-200 py-3 font-bold flex items-center justify-center gap-2 cursor-default"
                  >
                    <span>✅</span> Current Active Plan
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    className="text-xs text-gray-400 hover:text-red-500 hover:underline transition text-center"
                  >
                    Cancel Subscription (Demo: Downgrade)
                  </button>
                </div>
              ) : (
                <button
                  className="mt-8 w-full rounded-xl bg-red-500 text-white py-3 font-bold hover:bg-red-600 hover:shadow-lg transition flex items-center justify-center gap-2"
                  onClick={() => setShowQR(true)}
                >
                  Subscribe Now <span>→</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* QR modal */}
      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} />

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-xs opacity-80">
          Empowering learners to grow their skills anytime, anywhere.
        </p>
      </footer>
    </div>
  );
}
