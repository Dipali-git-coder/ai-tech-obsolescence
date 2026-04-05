"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900">
      {/* NAVBAR
      <nav className="flex justify-between items-center px-10 py-4 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-xl font-bold">Tech Skill Analyzer</h1>
        <div className="flex gap-6 items-center">
          <a href="#">Home</a>
          <a href="#" className="text-purple-600 font-semibold">About Us</a>
          <a href="#">Contact</a>
          <Button className="rounded-full">Sign In</Button>
        </div>
      </nav> */}

      {/* HERO SECTION */}
      <section className="text-center py-28 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-widest text-purple-500 mb-4"
        >
          MAXIMIZE YOUR POTENTIAL WITH AI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Empowering Careers <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            with AI
          </span>
        </motion.h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-600">
          We help students and professionals identify skill gaps and stay ahead
          in a rapidly evolving tech landscape using AI-driven insights.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="relative py-32 px-6 text-center overflow-hidden min-h-[500px]">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mountain.jpg"
            alt="mission"
            className="w-full h-full object-cover"
          />
          
          {/* Soft overlay (NO BLUR) */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
            Our Mission
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-gray-900 text-lg leading-relaxed">
            Our mission is to bridge the gap between current skills and industry demand
            by using intelligent AI systems that guide users toward the most relevant
            and future-proof skills.
          </p>
        </div>

      </section>

      {/* PROBLEM + SOLUTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Bridging the Skill Gap with AI
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Skill Gap",
              desc: "Skills are evolving faster than people can keep up.",
            },
            {
              title: "Outdated Knowledge",
              desc: "Many learners rely on outdated technologies.",
            },
            {
              title: "Career Confusion",
              desc: "Students don’t know what to learn next.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-md"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW AI WORKS */}
      <section className="py-20 px-6 bg-white/40 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-12">
          How AI Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {[
            "Input Your Profile",
            "AI Analysis",
            "Market Comparison",
            "Skill Recommendations",
          ].map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white shadow-md"
            >
              <div className="text-2xl font-bold text-purple-500 mb-2">
                {i + 1}
              </div>
              <p className="text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Our Vision for the Future
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          We aim to build a system where AI predicts future skill trends,
          provides real-time career guidance, and helps individuals stay ahead
          in the global job market.
        </p>
      </section>
    </div>
  );
}
