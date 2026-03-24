from rest_framework import serializers 
from .models import UserProfile 

class UserProfileSerializer(serializers.ModelSerializer):
    skills = serializers.JSONField()
     
    class Meta: 
        model = UserProfile 
        fields = ['id', 'user', 'skills', 'profile_picture', 'gender', 'profession']