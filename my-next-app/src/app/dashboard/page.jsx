"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import KPICards from "@/components/KPICards";
import SkillTrendCard from "@/components/SkillTrendChart";

export default function Dashboard() {
  const [trending, setTrending] = useState([]);
  const [obsolete, setObsolete] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/skills/trending/")
      .then((res) => res.json())
      .then((data) => {
        setTrending(data);
      })
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:8000/api/jobs/skills/obsolete/")
      .then((res) => res.json())
      .then((data) => {
        setObsolete(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Better graph data (adds middle point)
  const generateTrendData = (first, latest) => {
    return [
      { year: "Start", count: first },
      { year: "Mid", count: Math.round((first + latest) / 2) },
      { year: "Latest", count: latest },
    ];
  };

  // ✅ Get max growth for normalization
  const getMaxGrowth = (skills) => {
    const growths = skills.map((skill) => {
      if (!skill.first_year_count || skill.first_year_count <= 0) return 0;
      return (
        (skill.latest_year_count - skill.first_year_count) /
        skill.first_year_count
      );
    });

    return Math.max(...growths, 1); // avoid division by 0
  };

  const maxTrendingGrowth = getMaxGrowth(trending);
  const maxObsoleteGrowth = getMaxGrowth(obsolete);

  // ✅ FINAL: Normalized growth (REALISTIC)
  const calculateGrowth = (first, latest, maxGrowth) => {
  if (!first || first <= 0 || !maxGrowth) {
    return { type: "percent", value: 0 };
  }

  let rawGrowth = (latest - first) / first;

  // ✅ HANDLE NEGATIVE (obsolete case)
  let isNegative = rawGrowth < 0;
  let absGrowth = Math.abs(rawGrowth);

  let ratio = absGrowth / maxGrowth;

  // avoid NaN
  if (!isFinite(ratio)) ratio = 0;

  // 🔥 power scaling
  ratio = Math.pow(ratio, 0.4);

  // 🎯 range mapping
  let min = 35;
  let max = 85;

  let finalValue = min + ratio * (max - min);

  return {
    type: "percent",
    value: Math.round(finalValue),
    isNegative: isNegative, // 🔥 important
  };
};

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Skill Analytics Dashboard
      </h1>

      <KPICards trending={trending} obsolete={obsolete} />

      {/* 🔥 Trending Skills */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Top Trending Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {trending.map((skill) => (
            <SkillTrendCard
              key={`trending-${skill.skill_id}`}
              skillName={skill.name}
              data={generateTrendData(
                skill.first_year_count,
                skill.latest_year_count
              )}
              growthData={calculateGrowth(
                skill.first_year_count,
                skill.latest_year_count,
                maxTrendingGrowth
              )}
            />
          ))}
        </div>
      </div>

      {/* 🔥 Obsolete Skills */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Obsolete Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {obsolete.map((skill) => (
            <SkillTrendCard
              key={`obsolete-${skill.skill_id}`}
              skillName={skill.name}
              data={generateTrendData(
                skill.first_year_count,
                skill.latest_year_count
              )}
              growthData={calculateGrowth(
                skill.first_year_count,
                skill.latest_year_count,
                maxObsoleteGrowth
              )}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}