from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Max

from .models import Skill, SkillTrend
from .serializers import SkillSerializer
from recommendations.ml.recommender import recommend_skills


# Create your views here.
class TrendingSkills(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        trending_skills = []

        for skill in skills:
            trends = skill.trends.order_by("year")

            if trends.count() >= 2:
                first = trends.first().count
                last = trends.last().count

                if last > first:   # 📈 Trending
                    trending_skills.append({
                        "skill_id": skill.skill_id,
                        "name": skill.name,
                        "first_year_count": first,
                        "latest_year_count": last
                    })

        return Response(trending_skills)

        
class ObsoleteSkills(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        obsolete_skills = []

        for skill in skills:
            trends = skill.trends.order_by("year")

            if trends.count() >= 2:
                first = trends.first().count
                last = trends.last().count

                if last < first:   # 📉 Declining
                    obsolete_skills.append({
                        "skill_id": skill.skill_id,
                        "name": skill.name,
                        "first_year_count": first,
                        "latest_year_count": last
                    })

        return Response(obsolete_skills)
    
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
