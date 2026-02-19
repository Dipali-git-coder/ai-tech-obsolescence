// ...existing code...
'use client'
import { useState } from "react";
import { mockData } from "../data/mockData";
import TrendChart from "./TrendChart";
import SkillCard from "./SkillCard";
import ObsolescenceMeter from "./ObsolescenceMeter";

export default function Analyze() {
  const [data, setData] = useState(null);
  const [skill, setSkill] = useState("");
  const [error, setError] = useState(false);

  const handleAnalyze = () => {
    if (skill.trim() === "") {
      setError(true);
      setData(null);
      return;
    }
    setError(false);
    setData(mockData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl text-center space-y-10">
        {/* header like in the image */}
        <div className="pt-8">

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-gray-900">
            Hello there!
          </h1>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-700">
            What's on your mind?
          </h2>
        </div>

        {/* centered card with glow */}
        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-3xl bg-gradient-to-r from-purple-200 via-indigo-100 to-blue-200 opacity-40 blur-3xl" />

          <div className="bg-black rounded-3xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <input
                  aria-invalid={error}
                  className={`p-4 rounded-xl w-full text-lg transition-colors outline-none ${
                    error
                      ? "border-2 border-red-500 ring-1 ring-red-200 text-gray-700"
                      : "border border-gray-200 text-gray-700 focus:ring-1 focus:ring-indigo-200"
                  }`}
                  placeholder="Enter a technology or skill (e.g., React, Python)"
                  value={skill}
                  onChange={(e) => {
                    setSkill(e.target.value);
                    if (error && e.target.value.trim() !== "") setError(false);
                  }}
                />
                {error && (
                  <p className="text-red-600 text-sm mt-1" role="alert">
                    please enter a skill before analyze
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAnalyze}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Analyze
                </button>
              </div>

              {data && (
                <>
                  <h2 className="text-xl font-semibold mt-4">Obsolescence Score</h2>
                  <ObsolescenceMeter score={data.score} />
                  <p className="mt-2">{data.summary}</p>

                  <h2 className="text-2xl mt-6">Popularity Trend</h2>
                  <TrendChart data={data.trends} />

                  <h2 className="text-2xl mt-6">Recommended Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.recommendations.map((r) => (
                      <SkillCard key={r.name} skill={r} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...