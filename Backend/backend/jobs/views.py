from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum

from .models import Skill, SkillTrend
from .serializers import SkillTrendSerializer
from recommendations.ml.recommender import recommend_skills


# Create your views here.
class TrendingSkills(APIView):
    def get(self, request):
        trends = (
            SkillTrend.objects
            .values("skill__name")
            .annotate(total=Sum("count"))
            .order_by("-total")[:10]
        )
        return Response(trends)
        
class ObsoleteSkills(APIView):
    def get(self, request):
        data = []

        skill_ids = (
            SkillTrend.objects
            .values_list("skill_id", flat=True)
            .distinct()
        )

        for skill_id in skill_ids:
            trends = (
                SkillTrend.objects
                .filter(skill_id=skill_id)
                .order_by("year")
            )

            # must have data for multiple years
            if trends.count() < 2:
                continue

            first_count = trends.first().count
            last_count = trends.last().count

            total_count = sum(t.count for t in trends)  # 🔑 added

            # 🔑 NEW RULES (MINIMAL + CORRECT)
            if total_count < 30:
                continue  # Insufficient data → NOT obsolete

            if total_count >= 100:
                continue  # High-demand skill → NEVER obsolete

            # obsolete only if low-demand AND declining
            if last_count < first_count:
                data.append({
                    "skill": trends.first().skill.name,
                    "status": "Obsolete"
                })

        return Response(data)


class RecommendSkills(APIView):
    def post(self, request):
        user_skills = request.data.get("skills", [])

        trending = (
            SkillTrend.objects
            .values_list("skill__name", flat=True)
            .distinct()
        )

        recommendations = recommend_skills(user_skills, trending.first())

        return Response({
            "recommended_skills": recommendations
        })

# # the below is the test data to check if obsolete logic is working or not
# skill = Skill.objects.first()
# # you can erase this testing logic later this is only for testing
# SkillTrend.objects.create(skill=skill, year=2022,  count=100)
# SkillTrend.objects.create(skill=skill, year=2024, count=30)
