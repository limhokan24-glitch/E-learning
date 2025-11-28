"use client";
import { useState } from "react";
import Image from "next/image";
import { auth } from "@/firebase/firebaseClient";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRModal({ isOpen, onClose }: QRModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmPayment = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to subscribe.");
      return;
    }

    setLoading(true);
    try {
      // 1. Get Token
      const token = await user.getIdToken();

      // 2. Call Backend to Upgrade Role
      const res = await fetch("https://backend-rauth.vercel.app/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: "Premium", // Force upgrade to Premium
        }),
      });

      if (!res.ok) throw new Error("Failed to activate subscription");

      // 3. Force Token Refresh so Frontend sees the new "Premium" claim immediately
      await user.getIdToken(true);

      alert("🎉 Success! You are now a Premium member.");
      onClose();
      // Reload to update the UI permissions
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert("Error activating subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-[#1B1B3A] mb-2">Complete Payment</h2>
        <p className="text-sm text-gray-500 mb-6">
          Scan to pay <strong>$10.00</strong> via KHQR
        </p>

        {/* QR Image */}
        <div className="flex justify-center mb-6 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
          <Image
            src="/qr-payment.png"
            alt="Payment QR"
            width={180}
            height={180}
            className="rounded-md object-contain"
          />
        </div>

        <div className="text-left bg-gray-50 p-4 rounded-lg text-xs space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Merchant:</span>
            <span className="font-semibold text-gray-700">History Learning App</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount:</span>
            <span className="font-semibold text-red-500">$10.00 USD</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition shadow-md
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
            `}
          >
            {loading ? "Activating..." : "I Have Completed Payment"}
          </button>
          
          <button
            onClick={onClose}
            className="text-gray-400 text-xs hover:text-gray-600 hover:underline"
          >
            Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
