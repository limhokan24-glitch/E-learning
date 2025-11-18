"use client";
import Image from "next/image";
import Link from "next/link";

export default function Overview({ user }: any) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />

        <nav className="flex space-x-6 text-sm">
          <Link href="/overview" className="font-semibold text-red-500">
            Overview
          </Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/mock-exam">Mock Exam</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/subscription">Subscription</Link>
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Logout
          </button>
        </form>
      </header>

      {/* Main content */}
      <main className="flex-grow px-10 mt-12">
        {/* Welcome Section */}
        <div>
          <h2 className="text-xl font-bold text-[#1B1B3A]">
            Welcome! <span className="text-red-600">Glad you’re here</span>
          </h2>
          <p className="text-sm text-gray-500">
            Here’s your learning progress overview
          </p>
        </div>

        {/* Progress Cards (Figma Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 justify-items-center">
          <Card
            title="Lesson Complete"
            value="10/12"
            iconSrc="/book-icon.png"
          />
          <Card title="Quizzes Taken" value="8" iconSrc="/idea-icon.png" />
          <Card title="Study Time" value="30h" iconSrc="/clock-icon.png" />
        </div>

        {/* Trial Notice */}
        <div className="mt-14 bg-white shadow-md rounded-none p-8 flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="flex items-center space-x-3 text-sm text-gray-700 text-center sm:text-left px-6 sm:px-12">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Free
            </span>
            <p className="max-w-[700px]">
              You have 3 days left in your trial. Upgrade to Premium for full
              access!
            </p>
          </div>

          <Link
            href="/subscription"
            className="bg-red-500 text-white px-5 py-2 rounded-full text-sm mt-4 sm:mt-0"
          >
            Upgrade
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C1282D] text-white text-center py-10 mt-auto">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-md">
          <Image
            src="/logo-icon.jpg"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        <p className="mt-4 text-xs">
          Empowering learners to grow their skills anytime, anywhere. Learn at
          your own pace and achieve your dreams.
        </p>
      </footer>
    </div>
  );
}

function Card({ title, value, iconSrc }: any) {
  return (
    <div className="relative bg-white w-[320px] h-[230px] p-12 pt-16 rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
      {/* Floating Red Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#C1282D] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
        <Image
          src={iconSrc}
          alt={title}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h4 className="text-[#1B1B3A] font-medium text-base mt-3">{title}</h4>

      {/* Value */}
      <h2 className="text-[2rem] font-bold text-[#C1282D] mt-6">{value}</h2>
    </div>
  );
}
