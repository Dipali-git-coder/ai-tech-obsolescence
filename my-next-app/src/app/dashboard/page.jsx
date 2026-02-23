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

  // ✅ SMART GROWTH CALCULATOR
  const calculateGrowth = (first, latest) => {
    if (!first || first === 0) {
      return { type: "percent", value: 0 };
    }

    const percent = ((latest - first) / first) * 100;

    // 🚀 If base very small and growth huge → show multiplier
    if (first < 5 && percent > 500) {
      return { type: "multiplier", value: latest / first };
    }

    return { type: "percent", value: percent };
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
              data={[
                { year: "First", count: skill.first_year_count },
                { year: "Latest", count: skill.latest_year_count },
              ]}
              growthData={calculateGrowth(
                skill.first_year_count,
                skill.latest_year_count
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
              data={[
                { year: "First", count: skill.first_year_count },
                { year: "Latest", count: skill.latest_year_count },
              ]}
              growthData={calculateGrowth(
                skill.first_year_count,
                skill.latest_year_count
              )}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}