import { mockData } from "../../data/mockData";
import SkillCard from "../../components/SkillCard";
// import Navbar from "../../components/Navbar";

export default function RecommendPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Recommended Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.recommendations.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
