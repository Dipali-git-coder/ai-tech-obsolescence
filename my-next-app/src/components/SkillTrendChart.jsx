"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function SkillTrendCard({
  skillName,
  data,
  growthData,
}) {
  const isTrending = data[data.length - 1].count > data[0].count;

  return (
    <div className="relative bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-8 w-full h-64 overflow-hidden border border-gray-200">

      {/* Glow */}
      <div
        className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-20 
        ${isTrending ? "bg-green-400" : "bg-red-400"}`}
      ></div>

      <h3 className="text-2xl font-bold text-gray-800">
        {skillName}
      </h3>

      {/* ✅ FIXED Growth Display */}
      <p
        className={`text-lg font-semibold mt-2 ${
          isTrending ? "text-green-600" : "text-red-500"
        }`}
      >
        {growthData.isNegative ? "▼" : "▲"}{" "}
        {Math.abs(Number(growthData.value))}%
      </p>

      {/* ✅ CLEAN LINE CHART (NO TRIANGLE BUG) */}
      <div className="h-28 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="count"
              stroke={isTrending ? "#22c55e" : "#ef4444"}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}