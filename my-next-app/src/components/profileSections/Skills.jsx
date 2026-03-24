'use client';
import { useEffect, useState } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const skillCategories = {
    frontend: ["React", "Next.js", "HTML", "CSS", "JavaScript"],
    backend: ["Django", "Node.js", "Express", "REST API"],
    ai: ["Python", "Machine Learning", "Deep Learning"],
  };

  const calculateProgress = () => {
    const result = {};

    for (let category in skillCategories) {
      const required = skillCategories[category];
      const matched = required.filter(skill => skills.includes(skill));

      result[category] = Math.round((matched.length / required.length) * 100);
    }

    return result;
  };

  const progress = calculateProgress();

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
        setSkills(data.skills || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSkills();
  }, []);

  const formatSkill = (skill) => {
    return skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    const formatted = formatSkill(newSkill.trim());
    if (skills.includes(formatted)) return;

    const updatedSkills = [...skills, formatted];
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Skills</h2>
        <p className="text-gray-500 mb-6">Manage your current tech stack</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full shadow-md hover:scale-105 transition"
            >
              <span>{skill}</span>
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
                <span className="capitalize font-medium text-gray-700">{category}</span>
                <span className="text-sm text-gray-500">{progress[category]}%</span>
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
