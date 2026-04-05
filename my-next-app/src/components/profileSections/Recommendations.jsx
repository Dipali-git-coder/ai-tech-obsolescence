"use client";
import { useState, useEffect } from "react";

export default function RecommendSkills() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState([]);

  const [userSkills, setUserSkills] = useState([]);
  const [userRole, setUserRole] = useState("");

  // 🔹 STEP 1: Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/users/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = await res.json();
        console.log("🔥 PROFILE:", profile);

        const skillsData =
          profile.skills ||
          profile.user?.skills ||
          [];

        const roleData =
          profile.profession ||
          profile.role ||
          profile.user?.profession ||
          profile.user?.role ||
          "";

        const finalSkills =
          typeof skillsData === "string"
            ? skillsData.split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
            : skillsData;

        setUserSkills(finalSkills);
        setUserRole(roleData);

        console.log("ROLE CHECK:", {
          profession: profile.profession,
          role: profile.role,
          userRole: profile.user?.role,
        });

      } catch (err) {
        console.error("PROFILE ERROR:", err);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 STEP 2: Fetch Recommendations (DYNAMIC)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userSkills.length === 0) {
          console.log("⛔ Waiting for user skills...");
          return;
        }

        console.log("🚀 Sending:", userRole, userSkills);

        const res = await fetch("http://127.0.0.1:8000/api/recommendations/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: userRole || null,
            skills: userSkills,
          }),
        });

        const result = await res.json();
        console.log("✅ API RESULT:", result);

        setData({
          domain: result.domain,
          readiness: result.readiness,
          level: result.level,
          target: `${result.domain} Architect`,
          skillGap: result.recommended_skills || [],
          nextSkill: result.recommended_skills?.[0] || "Skill",
          why: `Based on your current skills, ${result.recommended_skills?.[0]} is highly relevant for ${result.domain}`,
          phases: result.learning_path || [],
        });

      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchData();
  }, [userSkills]);

  // 🔹 YouTube Fetch
  const fetchYouTube = async (skill) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${skill}+tutorial&type=video&maxResults=3&key=AIzaSyDovvBl0GQOObB5Mq501CASQybnwyghgIc`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Loading State
  if (!data) return <p className="text-center mt-10">Loading AI Recommendations...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* 👋 Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">👋 Welcome back</h1>
        <p className="text-gray-500">
          Let's improve your <span className="font-medium">{data.domain}</span> skills today.
        </p>
      </div>

      {/* 🚀 Cards */}
      <div className="space-y-6">

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="text-sm text-gray-500">1. Where are you now?</p>
          <h2 className="text-lg font-semibold text-gray-800 mt-2">
            {data.level}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Readiness: {data.readiness}%
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <p className="text-sm text-gray-500">2. What’s missing?</p>

          <div className="mt-3 space-y-2">
            {data.skillGap?.length > 0 ? (
              data.skillGap.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No gaps found 🎉</p>
            )}
          </div>
        </div>

      </div>

      {/* 🤖 AI Mentor */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border">

        <h2 className="text-lg font-semibold text-gray-800">
          🤖 AI Mentor
        </h2>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-500">👉 Recommendation</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            Learn {data.nextSkill}
          </h3>

          <p className="text-gray-600 text-sm mt-2">{data.why}</p>

          <button
            onClick={() => fetchYouTube(data.nextSkill)}
            className="mt-4 px-5 py-2 rounded-lg text-white 
            bg-gradient-to-r from-purple-500 to-blue-500 
            hover:opacity-90 transition"
          >
            Start Learning
          </button>
        </div>

      </div>

      {/* 📺 YouTube */}
      {videos.length > 0 && (
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📺 Learning Resources
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {videos.map((video) => (
              <a
                key={video.id.videoId}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  className="rounded-lg"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {video.snippet.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 📚 Learning Journey */}
      <div className="bg-white shadow-md rounded-2xl p-5 border">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            📚 AI Learning Journey
          </h3>
          <span className="text-gray-500 text-sm">
            {open ? "▲" : "▼"}
          </span>
        </button>

        {open && (
          <div className="mt-5 space-y-4">
            {data.phases?.map((phase, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 shadow-sm"
              >
                <h4 className="font-semibold text-gray-800">
                  Phase {i + 1}: {phase.title}
                </h4>

                <div className="flex flex-wrap gap-2 mt-3">
                  {phase.skills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white px-2 py-1 rounded-md text-gray-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}