'use client';
import { useEffect, useState } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Keep everything lowercase for perfect matching
  const skillCategories = {
    frontend: ["react", "next.js", "html", "css", "javascript"],
    backend: ["django", "node.js", "express", "rest api"],
    ai: ["python", "machine learning", "deep learning"],
  };

  // ✅ Normalize function (core fix)
  const normalize = (skill) => skill.toLowerCase().trim();

  // ✅ Capitalize for UI only
  const formatSkill = (skill) => {
    return skill
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // ✅ Fixed progress calculation
  const calculateProgress = () => {
    const result = {};
    const normalizedSkills = skills.map(normalize);

    for (let category in skillCategories) {
      const required = skillCategories[category];

      const matched = required.filter(skill =>
        normalizedSkills.includes(skill)
      );

      result[category] = Math.round(
        (matched.length / required.length) * 100
      );
    }

    return result;
  };

  const progress = calculateProgress();

  // ✅ Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://127.0.0.1:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // normalize while storing
        const skillsArray = Array.isArray(data.skills)
          ? data.skills
          : typeof data.skills === 'string'
          ? data.skills.split(',').map(s => s.trim())
          : [];
        const normalized = skillsArray.map(s => normalize(s));
        setSkills(normalized);

      } catch (err) {
        console.error(err);
      }
    };

    fetchSkills();
  }, []);

  // ✅ Add skill
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    const normalized = normalize(newSkill);

    if (skills.includes(normalized)) return;

    const updatedSkills = [...skills, normalized];
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      await fetch('http://127.0.0.1:8000/api/update-skills/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });

      setSkills(updatedSkills);
      setNewSkill('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove skill
  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = skills.filter(s => s !== skillToRemove);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      await fetch('http://127.0.0.1:8000/api/update-skills/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills: updatedSkills }),
      });

      setSkills(updatedSkills);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Skills</h2>
        <p className="text-gray-500 mb-6">Manage your current tech stack</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full shadow-md hover:scale-105 transition"
            >
              <span>{formatSkill(skill)}</span>
              <button onClick={() => handleRemoveSkill(skill)}>✕</button>
            </div>
          ))}
        </div>

        {/* Add Skill */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. React, Django"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-xl placeholder-gray-400 text-gray-700"
          />

          <button
            onClick={handleAddSkill}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:scale-105 transition"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Skill Progress
          </h3>

          {Object.keys(progress).map((category) => (
            <div key={category}>
              <div className="flex justify-between mb-1">
                <span className="capitalize font-medium text-gray-700">
                  {category}
                </span>
                <span className="text-sm text-gray-500">
                  {progress[category]}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${progress[category]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}