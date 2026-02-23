from rest_framework import serializers 
from .models import Skill, SkillTrend

class SkillTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillTrend
        fields = ["year", "count"]
        
class SkillSerializer(serializers.ModelSerializer):
    trends = SkillTrendSerializer(many=True, read_only=True)

    class Meta:
        model = Skill
        fields = ["skill_id","name", "trends"]