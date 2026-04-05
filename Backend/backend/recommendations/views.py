from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from recommendations.ml.recommender import recommend_skills
from recommendations.models import Recommendation
import json


# 🔥 NEW: AUTO ROLE DETECTION FUNCTION
def detect_role_from_skills(skills):
    role_map = {
        "frontend developer": ["html", "css", "javascript", "react", "bootstrap"],
        "backend developer": ["python", "django", "node", "api", "sql"],
        "machine learning engineer": ["python", "pandas", "numpy", "ml", "sklearn"],
    }

    skills = [s.lower().strip() for s in skills]

    best_role = None
    max_match = 0

    for role, role_skills in role_map.items():
        match_count = len(set(skills) & set(role_skills))

        if match_count > max_match:
            max_match = match_count
            best_role = role

    return best_role if best_role else "developer"


class SkillRecommendationAPIView(APIView):

    def get(self, request):
        return Response({
            "message": "Use POST request with skills, role, experience"
        })

    def post(self, request):

        skills = request.data.get("skills", [])
        role = request.data.get("role", None)
        experience = request.data.get("experience", None)

        print("Incoming data:", request.data)

        # 🔥 AUTO DETECT ROLE IF NOT PROVIDED
        if not role:
            role = detect_role_from_skills(skills)
            print("🎯 Auto-detected role:", role)

        result = recommend_skills(
            user_skills=skills,
            target_role=role,
            experience=experience
        )

        print("ML Result:", result)

        recommended_skills = result.get("recommended_skills", [])
        skill_gap_count = int(result.get("skill_gap_count", 0))

        skill_gap = result.get("skill_gap", [])
        learning_path = result.get("learning_path", [])

        total = len(skills) + skill_gap_count
        readiness = int((len(skills) / total) * 100) if total > 0 else 0

        if readiness < 40:
            level = f"Beginner {role}"
        elif readiness < 70:
            level = f"Intermediate {role}"
        else:
            level = f"Advanced {role}"

        try:
            obj = Recommendation.objects.create(
                role=role,
                user_skills=", ".join(skills),
                recommended_skills=", ".join(recommended_skills),
                skill_gap_count=skill_gap_count,
            )
            print("Saved:", obj.id)
        except Exception as e:
            print("ERROR:", e)

        return Response({
            "status": "saved",
            "domain": role,  # ✅ now always available
            "recommended_skills": recommended_skills,
            "skill_gap": skill_gap,
            "learning_path": learning_path,
            "skill_gap_count": skill_gap_count,
            "readiness": readiness,
            "level": level,
        })