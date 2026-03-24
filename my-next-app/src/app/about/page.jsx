"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative w-full bg-white text-gray-900 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Don't Chase Trends.
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Predict Them.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 max-w-2xl text-lg text-gray-600 leading-relaxed"
        >
          AI-powered intelligence that anticipates technological shifts and
          recommends future-proof skills before they become essential.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-xl"
        >
          Explore Intelligence
        </motion.button>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Skills Expire Faster Than Degrees
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Technology evolves at unprecedented speed. Traditional education
          systems struggle to keep pace, leaving professionals uncertain about
          which skills will remain relevant in the next five years.
        </p>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Intelligence That Anticipates Change
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Real-time job market intelligence",
              "Predictive tech obsolescence modeling",
              "Personalized AI-driven skill roadmaps",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-2 transition"
              >
                <p className="text-gray-700 text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Core Innovation Engine
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Tech Obsolescence Prediction Engine",
            "Personalized AI Skill Recommendation",
            "Industry Demand Analytics Dashboard",
            "Resume Skill Gap Analyzer",
            "Trend Forecasting Model",
            "Data-Driven Career Intelligence",
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-3 transition"
            >
              <h3 className="font-semibold text-xl mb-3">{feature}</h3>
              <p className="text-gray-600">
                Built on predictive modeling and intelligent data analysis.
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}