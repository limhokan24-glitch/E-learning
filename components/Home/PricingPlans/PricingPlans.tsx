import React from 'react'

const PricingPlans = () => {
  return (
     <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-indigo-900 mb-12">
        Affordable Pricing
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-40 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="flex-1 border rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-10">
            Free Plan <span className="text-bg text-gray-500">/ 7 Days</span>
          </h3>
          <ul className="text-left mt-6 space-y-3">
            <li>✅ Limited access for 7 days</li>
            <li>✅ Access to selected lessons</li>
            <li>✅ Try quizzes and view results</li>
            <li>✅ Explore the platform before upgrading</li>
          </ul>
          <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full shadow">
            Try for free
          </button>
        </div>

        {/* Paid Plan */}
        <div className="flex-1 border rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-10">
            $5 <span className="text-bg text-gray-500">/ Month</span>
          </h3>
          <ul className="text-left mt-6 space-y-3">
            <li>✅ Full access to all history lessons</li>
            <li>✅ Mock exams and past papers included</li>
            <li>✅ Bigger quiz bank for more practice</li>
            <li>✅ Downloadable documents for offline study</li>
          </ul>
          <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full shadow">
            Subscription
          </button>
        </div>
      </div>
    </section>
  );
}
export default PricingPlans;