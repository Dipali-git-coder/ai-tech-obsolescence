"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    title: "React for Beginners",
    skill: "React",
    duration: "8 hrs",
    progress: 40,
    status: "in-progress",
    category: "Frontend Development",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    skill: "JavaScript",
    duration: "6 hrs",
    progress: 0,
    status: "not-started",
    category: "Frontend Development",
  },
  {
    id: 3,
    title: "Machine Learning A-Z",
    skill: "Machine Learning",
    duration: "12 hrs",
    progress: 100,
    status: "completed",
    category: "Data Science",
  },
  {
    id: 4,
    title: "Python for Data Analysis",
    skill: "Python",
    duration: "10 hrs",
    progress: 30,
    status: "in-progress",
    category: "Data Science",
  },
];

export default function SavedCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState(initialCourses);

  const hasCourses = courses.length > 0;

  if (!hasCourses) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-xl font-semibold">
          Haven't saved any courses yet
        </h2>
        <button
          onClick={() => router.push("/recommended")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  const grouped = courses.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = [];
    acc[course.category].push(course);
    return acc;
  }, {});

  const inProgress = courses.filter((c) => c.status === "in-progress").length;
  const completed = courses.filter((c) => c.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-800 font-bold flex items-center gap-2">
          ⭐ Saved Courses
        </h1>
        <p className="text-gray-500">Your personalized learning library</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Search saved courses..."
          className="flex-1 border rounded-lg px-4 py-2 text-gray-700"
        />
        <button className="border px-4 py-2 rounded-lg text-gray-700">
          Filter
        </button>
        <button className="border px-4 py-2 rounded-lg text-gray-700">
          Sort
        </button>
        <button className="border px-4 py-2 rounded-lg text-gray-700">
          Recently Saved
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
        <span>📁 Saved {courses.length}</span>
        <span>▶ In Progress {inProgress}</span>
        <span>✅ Completed {completed}</span>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="lg:col-span-2 space-y-6">
          {Object.keys(grouped).map((category) => (
            <div key={category}>
              <h2 className="font-semibold text-lg mb-3 text-gray-800">
                {category}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {grouped[category].map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-xl p-4 bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-lg text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {course.skill}
                    </p>

                    <div className="flex justify-between text-sm mt-2 text-gray-600">
                      <span>{course.duration}</span>
                      <span>
                        {course.status === "completed"
                          ? "Completed"
                          : course.status === "not-started"
                          ? "Not Started"
                          : `Progress: ${course.progress}%`}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      {course.status === "completed" ? (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          View Certificate
                        </button>
                      ) : course.status === "not-started" ? (
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                          Start
                        </button>
                      ) : (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          Continue
                        </button>
                      )}

                      <button className="border px-4 py-2 rounded-lg text-red-500">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-800">💡 AI Insight</h3>
            <p className="text-sm text-green-600 mt-2">
              Recommended Next Step
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You should prioritize the React course based on your skill gap.
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-800">📊 Learning Stats</h3>
            <p className="text-sm mt-2 text-gray-600">
              In Progress Courses: {inProgress}
            </p>
            <p className="text-sm text-gray-600">
              Completion Rate: {Math.round((completed / courses.length) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}