import { mockData } from "../../data/mockData";
// import Navbar from "../../components/Navbar";

export default function SavedPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Saved Skills Plan</h1>
        <ul className="space-y-2">
          {mockData.savedPlan.map((skill) => (
            <li key={skill.name} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{skill.name}</h2>
              <p>Progress: {skill.progress}%</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
