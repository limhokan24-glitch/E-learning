"use client";

import { useEffect, useRef } from "react";
import { auth } from "@/firebase/firebaseClient";

export default function SessionTracker() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to send time to backend
    const sendHeartbeat = async () => {
      const user = auth.currentUser;
      if (!user || document.hidden) return; // Don't track if tab is hidden or user logged out

      try {
        const token = await user.getIdToken();
        await fetch("https://backend-rauth.vercel.app/api/progress/time", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ seconds: 60 }), // Log 1 minute
        });
        // console.log("tracked 1 min"); // Uncomment for debugging
      } catch (error) {
        console.error("Failed to track time", error);
      }
    };

    // Run every 60 seconds (60000 ms)
    intervalRef.current = setInterval(sendHeartbeat, 60000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null; // This component renders nothing visibly
}
