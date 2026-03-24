import Skills from "../../../components/profileSections/Skills";
import Recommendations from "../../../components/profileSections/Recommendations";
import RecommendedCourses from "../../../components/profileSections/RecommendCourses";
import SavedCourses from "../../../components/profileSections/SavedCourses";


export default async function ProfileSection({ params}){
    const { section } = await params;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
            
            {section === "skills" && <Skills />}
            {section === "recommendations" && <Recommendations />}
            {section === "recommended-courses" && <RecommendedCourses />}
            {section === "saved-courses" && <SavedCourses />}
        </div>
    );
}