"use client";
import { useState, useEffect } from "react";
// this has static data for now, will be replaced by dynamic data from backend later.
export default function RecommendSkills() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState([]);

  // 🔥 Fetch from your Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/recommendations/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skills: ["python", "django", "sql", "aws", "docker", "git"],
            role: "backend developer",
            experience: "2 years",
          }),
        });

        const result = await res.json();

        // 🔥 Map backend response to UI format
        setData({
          domain: "Backend Developer",
          readiness: 65,
          level: "Intermediate Backend Developer",
          target: "Backend Architect",
          skillGap: result.recommended_skills || [],
          nextSkill: result.recommended_skills?.[0] || "Node.js",
          why: `Based on your current skills, ${result.recommended_skills?.[0]} is highly relevant for backend growth.`,
          insight:
            "You are transitioning towards scalable backend systems.",
          phases: [
            {
              title: "Core Strength",
              status: "completed",
              skills: ["Python", "Django", "SQL"],
            },
            {
              title: "Expansion",
              status: "current",
              progress: 40,
              skills: result.recommended_skills?.slice(0, 2) || [],
            },
            {
              title: "Scalability",
              status: "locked",
              skills: ["Microservices", "Redis"],
            },
            {
              title: "DevOps Mastery",
              status: "locked",
              skills: ["Kubernetes", "CI/CD"],
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 YouTube Fetch
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

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
      {/* Profile */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-gray-800 font-semibold">👤 Your Profile</h2>
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          {data.domain}
        </span>
      </div>

      {/* Readiness */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">📊 Readiness Score</h3>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 rounded-full bg-blue-500"
            style={{ width: `${data.readiness}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-gray-600">
          You are at <b>{data.level}</b>
        </p>
      </div>

      {/* Skill Gap */}
      <div>
        <h3 className="font-medium text-gray-700">⚠ Skill Gap</h3>
        <ul className="list-disc ml-6 text-gray-700">
          {data.skillGap.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Next Step */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h3 className="font-semibold text-gray-800">🔥 Next Best Step → {data.nextSkill}</h3>
        <p className="text-sm text-gray-600 mt-2">💡 {data.why}</p>
        <p className="text-xs mt-2 text-gray-500">🧠 {data.insight}</p>
        <button
          onClick={() => fetchYouTube(data.nextSkill)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Start Learning
        </button>
      </div>

      {/* YouTube Results */}
      {videos.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700">📺 Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {videos.map((video) => (
              <a
                key={video.id.videoId}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className="border rounded-lg p-2 hover:shadow"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt="thumb"
                  className="rounded"
                />
                <p className="text-sm mt-2 text-gray-700">
                  {video.snippet.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Career Track */}
      <div>
        <h3 className="font-medium text-gray-700">🧭 Career Growth Track</h3>
        <p className="text-sm text-gray-700">
          You are: <b>{data.level}</b> → Target: <b>{data.target}</b> 🚀
        </p>
      </div>

      {/* Learning Path */}
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left font-medium text-gray-700 cursor-pointer"
        >
          📚 AI Learning Journey {open ? "▲" : "▼"}
        </button>

        {open && (
          <div className="mt-4 space-y-4">
            {data.phases.map((phase, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">
                    Phase {i + 1}: {phase.title}
                  </h4>
                  {phase.status === "current" && (
                    <span className="text-xs text-blue-600">
                      {phase.progress}% Progress
                    </span>
                  )}
                </div>

                <ul className="text-sm mt-2 text-gray-700">
                  {phase.skills.map((s, idx) => (
                    <li key={idx}>• {s}</li>
                  ))}
                </ul>

                {phase.status === "current" && (
                  <button
                    onClick={() => fetchYouTube(phase.skills[0])}
                    className="mt-3 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
                  >
                    Continue Learning
                  </button>
                )}

                {phase.status === "locked" && (
                  <span className="text-xs text-gray-400 mt-2 block">
                    🔒 Locked
                  </span>
                )}

                {phase.status === "completed" && (
                  <span className="text-xs text-green-500 mt-2 block">
                    ✔ Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
