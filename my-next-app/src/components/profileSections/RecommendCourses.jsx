"use client";
import { useEffect, useState } from "react";

export default function RecommendedCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      // 1. Fetch user skills
      const token = localStorage.getItem("token");
      const res = await fetch('http://127.0.0.1:8000/api/users/api/user-profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const user = await res.json();

      // 2. Generate queries
      const queries = generateSearchQueries(user.skills);

      // 3. Fetch YouTube courses
      const ytCourses = await fetchCoursesFromYouTube(queries);

      setCourses(ytCourses);
    };

    loadCourses();
  }, []);

  const handleSave = (course) => {
    const saved = JSON.parse(localStorage.getItem("savedCourses")) || [];
    localStorage.setItem("savedCourses", JSON.stringify([...saved, course]));
    alert("Course Saved!");
  };

  return (
    <div>
    <h1 className="text-2xl text-gray-800 font-bold mb-4">Recommended for You</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <div className="flex gap-4">
            <img
              src={item.snippet.thumbnails.medium.url}
              className="w-40 h-24 rounded-lg"
            />

            <div>
              <h2 className="text-lg text-gray-800 font-semibold">
                {item.snippet.title}
              </h2>
              <p className="text-gray-500">YouTube</p>
            </div>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold text-gray-700">Why this course?</h3>
          <p className="text-gray-600 mb-3">
            Based on your skills, this course helps you grow further 🚀
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              ▶️ Start Learning
            </a>

            <button
              onClick={() => handleSave(item)}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              🔖 Save Course
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

// 🔥 helper functions
const generateSearchQueries = (skills) => {
  const map = {
    react: "React advanced tutorial",
    api: "REST API Node.js course",
  };
  return skills.map((s) => map[s.toLowerCase()] || `${s} course`);
};

const fetchCoursesFromYouTube = async (queries) => {
  const API_KEY = "AIzaSyDovvBl0GQOObB5Mq501CASQybnwyghgIc";

  const results = await Promise.all(
    queries.map(async (query) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`
      );
      const data = await res.json();
      return data.items;
    })
  );

  return results.flat();
};