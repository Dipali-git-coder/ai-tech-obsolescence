from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from recommendations.ml.recommender import recommend_skills
from recommendations.models import Recommendation
import json


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

        # Run recommender
        result = recommend_skills(
            user_skills=skills,
            target_role=role,
            experience=experience
        )

        print("ML Result:", result)
        print("Result Full: ", result)
        print("Type of Result:", type(result))

        recommended_skills = result["recommended_skills"]
        skill_gap_count = int(result["skill_gap_count"])

        print("Recommended Skills:", recommended_skills)
        print("Skill Gap Count:", skill_gap_count)

        print("VIEW IS RUNNING")

        # Save to DB
        try:
            obj = Recommendation.objects.create(
                role="backend developer",
                user_skills="python, django",
                recommended_skills="docker, api",
                skill_gap_count=2,
            )
            print("Saved:", obj.id)
        except Exception as e:
            print("ERROR:", e)

        # Return response
        return Response({"status": "saved"})