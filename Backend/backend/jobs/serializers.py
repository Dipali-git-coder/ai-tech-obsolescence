from rest_framework import serializers 
from .models import Skill, SkillTrend

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"
        
class SkillTrendSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source="skill.name")

    class Meta:
        model = SkillTrend
        fields = ["skill_name", "year", "count"]