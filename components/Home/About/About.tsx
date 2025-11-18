import React from 'react'

const About = () => {
  return (
          <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 mb-16 text-lg">
            Master History subject, build confidence, and ace your BACII exams with ease
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 18a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Learning Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Students can access history lessons, take quizzes, and complete mock exams in real-time progress
                tracking
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="4" height="10" rx="1" fill="currentColor" />
                  <rect x="10" y="6" width="4" height="15" rx="1" fill="currentColor" />
                  <rect x="17" y="2" width="4" height="19" rx="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Analytics & Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                The system analyses performance, highlights weak areas, and tracks study time to help students improve
                effectively.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EF4444] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexible Access Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Offers both free and Premium subscriptions, giving users the freedom to explore and upgrade for full
                access to materials and resources
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About;