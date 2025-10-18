export default function SkillCard({ skill }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{skill.name}</h3>
      <p>Confidence: {skill.confidence}%</p>
      <p>Learning Time: {skill.duration}</p>
      <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        Save to Plan
      </button>
    </div>
  );
}
