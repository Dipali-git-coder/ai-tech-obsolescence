"use client";

import {
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function SkillTrendCard({
  skillName,
  data,
  growthData,
}) {
  const isTrending = data[1].count > data[0].count;

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

      {/* 🔥 Smart Growth Display */}
      <p
        className={`text-lg font-semibold mt-2 ${
          isTrending ? "text-green-600" : "text-red-500"
        }`}
      >
        {isTrending ? "▲" : "▼"}{" "}
        {growthData.type === "multiplier"
          ? `${growthData.value.toFixed(1)}x`
          : `${Math.abs(growthData.value).toFixed(0)}%`}
      </p>

      {/* Chart */}
      <div className="h-28 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`gradient-${skillName}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={isTrending ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={isTrending ? "#22c55e" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="count"
              stroke={isTrending ? "#22c55e" : "#ef4444"}
              strokeWidth={4}
              fill={`url(#gradient-${skillName})`}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}