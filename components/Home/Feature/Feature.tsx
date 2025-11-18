import React from 'react'

const Feature = () => {
  return (
    <main className='bg-white'>
     <section className="flex flex-col items-center text-center py-16 px-6 bg-white">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1B1B3A]">
        What is History <span className="text-red-500">E-Learning?</span>
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-gray-600">
        History E-Learning is a modern way of studying history through online lessons and digital tools.
        It helps students explore the past using timelines, quizzes, and interactive materials anytime,
        anywhere.
      </p>

      {/* Image Section */}
      <div className="mt-10 flex justify-center">
        <div className="relative rounded-xl overflow-hidden shadow-md w-150">
          <img
            src="/teaching.jpg"
            alt="Teacher helping students in class"
            className="w-full h-auto"
          />
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-10 rounded-full shadow-md transition-all">
              Join now
            </button>
          
        </div>
      </div>
    </section>

    {/* --- Section 2: Everything you can do in a physical classroom --- */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-6 md:px-20 bg-white">
        {/* Left text section */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B1B3A] leading-snug">
            <span className="text-blue-700">
              Everything you can do in a physical classroom,
            </span>{" "}
            <span className="text-red-500">you can do with History E-Learning</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            <a href="#" className="text-blue-600 underline">
              History E-Learning
            </a>{" "}
            brings the classroom to your screen. Whether it’s learning from expert teachers,
            sharing ideas, or exploring ancient civilizations, you can experience it all,
            just with a click.
          </p>
        </div>

        {/* Right image section */}
        <div className="md:w-1/2 relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-red-500 rounded-md"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-red-500 rounded-md"></div>
          <img
            src="class.jpg"
            alt="Students in classroom"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* --- Section 3: Our Features --- */}
      <section className="text-center py-20 px-6 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B1B3A]">
          Our <span className="text-red-500">Features</span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          This very extraordinary feature can make learning activities more efficient.
        </p>
        <div className="relative flex justify-left mt-30 left-30">
          <div className="absolute top-1 left-60 w-16 h-16   bg-red-500 rounded-full"></div>
          <div className="absolute bottom-0 right-370 w-16 h-16 bg-red-500 rounded-full"></div>
          <img
            src="book.png" // <-- replace with your image path
            alt="History Book"
            className="relative z-15 w-70 rounded shadow-lg"
          />
          <div className="w-full md:w-1/2 md:pl-20 ml-auto">
        <h2 className="text-5xl font-semibold text-gray-900 mb-15 text-left">
          Access <span className="text-red-500">history</span> lessons
        </h2>

        <ul className="space-y-5">
          {[
            "Learn anytime, anywhere with easy-to-follow history lessons.",
            "Explore key events, people, and eras through interactive content.",
            "Enjoy clear explanations designed to make learning history simple."
          ].map((text, index) => (
            <li key={index} className="flex items-start">
              <span className="w-10 h-10 bg-red-500 rounded-full mt-1 mr-3"></span>
              <p className="text-lg text-gray-600 leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </div>
        </div>

         

      {/* Second Section */}
      <div className="grid md:grid-cols-2 gap-50 items-center mt-20">
        {/* Left - Text */}
        <div>
          <h2 className="text-3xl font-semibold">
            Do <span className="text-red-500">Practice Quizzes</span>{" "}
            <span className="text-blue-900">(True/False and Multiple Choice)</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Test your knowledge with quick and engaging quizzes. Get instant feedback
            to see what you’ve mastered. Challenge yourself and make learning feel like a game.
          </p>
        </div>

        {/* Right - Image */}
        <div className="relative flex justify-center">
          <div className="absolute top-0 left-10 w-16 h-16 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-0 right-11 w-16 h-16 bg-red-500 rounded-full"></div>
          <img
            src="student.jpg" // <-- replace with your image path
            alt="Student using laptop"
            className="relative z-20 w-150 rounded shadow-lg"
          />
        </div>
      </div>
       {/* 1️⃣ Mock Exams Section */}
      <div className="grid md:grid-cols-2 items-center gap-15 max-w-7xl">
        {/* Image Left */}
        <div className="relative order-2 md:order-10">
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-500 rounded-full" />
          <img
            src="mnus.jpg"
            alt="Mock Exams"
            className="rounded-lg shadow-md w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-red-500 rounded-full" />
        </div>
        {/* Text Right */}
        <div className="flex justify-end items-start md:order-10 order-10">
  <div className="text-right md:text-right space-y-10">
    <h2 className="text-xl md:text-2xl font-bold text-[#1B1B3A] text-left">
      Take <span className="text-red-500">Mock Exams</span> with a Countdown Timer
    </h2>
    <p className="text-gray-600 leading-relaxed text-lg text-left">
    Experience real exam conditions with a live timer.Practice managing your time and improve your
      confidence. Track your scores and prepare smarter for the BACII exam.
    </p>
        </div>
       
  </div>
</div>

      {/* 2️⃣ Progress Chart Section */}
      <div className="grid md:grid-cols-2 items-center gap-12 max-w-6xl">
        {/* Text Left */}
        <div className="text-center md:text-left space-y-4 mb-10">
          <h2 className=" mb-10 text-xl md:text-3xl font-bold text-[#1B1B3A]">
            View <span className="text-blue-700">Personal</span>{" "}
            <span className="text-red-500">Progress</span> Chart
          </h2>
          <p className="text-gray-600 leading-relaxed">
            See how much you’ve improved after every lesson or quiz. Identify your strengths and focus on
            areas that need more work. Stay motivated as your progress grows week by week.
          </p>
        </div>

        {/* Image Right */}
        <div className="relative left-100">
          <img
            src="/chart.jpg"
            className="rounded-lg shadow-md w-full object-cover "
          />
        
        </div>
      </div>

      </section>
      
      
    </main>
    
  );
}


export default Feature;