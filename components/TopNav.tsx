"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient"; // Adjust path if needed

export default function TopNav() {
  const pathname = usePathname(); // Gets the current path (e.g. "/lesson")
  const router = useRouter();

  // Define navigation items here for easy management
  const navItems = [
    { name: "Overview", href: "/overview" },
    { name: "Lesson", href: "/lesson" },
    { name: "Quiz", href: "/quiz" },
    { name: "Mock Exam", href: "/mock-exam" },
    { name: "Progress", href: "/progress" },
    { name: "Subscription", href: "/subscription" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/Login");
  };

  return (
    <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white sticky top-0 z-40">
      <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />

      <nav className="flex space-x-6 text-sm">
        {navItems.map((item) => {
          // Check if the current path matches the link
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 ${
                isActive
                  ? "font-bold text-red-600" // Active Style
                  : "text-gray-600 hover:text-red-500" // Inactive Style
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
      >
        Log out
      </button>
    </header>
  );
}
