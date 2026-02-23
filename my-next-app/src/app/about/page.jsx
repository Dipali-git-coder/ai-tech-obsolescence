"use client";

export default function AboutPage() {
  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 text-gray-800">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Don't Chase Trends. <br />
          <span className="bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text">
            Predict Them.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          AI-Powered Tech Obsolescence & Skill Recommender System
          analyzes evolving industry trends to recommend future-ready skills
          using intelligent machine learning models.
        </p>

        <button className="mt-8 px-6 py-3 rounded-full bg-rose-500 text-white shadow-lg hover:scale-105 transition duration-300">
          Explore Intelligence
        </button>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Skills Expire Faster Than Degrees
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          The rapid evolution of technology leaves students and professionals
          uncertain about which skills will remain relevant. This creates a
          widening gap between academic learning and industry demand.
        </p>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Intelligence That Anticipates Change
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Analyzes real-time job market data",
              "Predicts tech obsolescence patterns",
              "Generates personalized skill roadmaps",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-rose-50 to-purple-50 p-6 rounded-2xl shadow-md hover:scale-105 transition duration-300"
              >
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Core Innovation Engine
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Tech Obsolescence Prediction Engine",
            "Personalized AI Skill Recommendation",
            "Industry Demand Analytics Dashboard",
            "Resume Skill Gap Analyzer",
            "Trend Forecasting Model",
            "Data-Driven Career Intelligence",
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-2">{feature}</h3>
              <p className="text-gray-600 text-sm">
                Powered by machine learning algorithms and predictive analytics.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}