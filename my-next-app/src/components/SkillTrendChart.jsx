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
  const isTrending =
    data[data.length - 1].count > data[0].count;

  return (
    <div className="relative bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-8 w-full h-64 overflow-hidden border border-gray-200 hover:scale-105 transition-all duration-300">

      {/* Glow */}
      <div
        className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-20
        ${isTrending ? "bg-green-400" : "bg-red-400"}`}
      ></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <h3 className="text-2xl font-bold text-gray-800 capitalize">
          {skillName}
        </h3>

        <p
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            isTrending
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {growthData.isNegative ? "▼" : "▲"}{" "}
          {Math.abs(Number(growthData.value))}%
        </p>
      </div>

      {/* Chart */}
      <div className="relative z-10 h-28 mt-8">
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