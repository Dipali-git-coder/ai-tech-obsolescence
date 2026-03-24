from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer
from .models import UserProfile

#GET the users data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):

    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)

    profile_pic = None
    if profile.profile_picture:
        profile_pic = request.build_absolute_uri(profile.profile_picture.url)
    return Response({
        "name": user.username,
        "email": user.email,
        "profile_pic": profile_pic,
        "skills": profile.skills,
    })

# 🔹 SIGNUP VIEW
class SignupView(APIView):
    def post(self, request):
        # Extract data from request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        skills = request.data.get('skills')
        profession = request.data.get('profession')
        gender = request.data.get('gender')
        
        # Create Django User
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Create UserProfile linked to User
        UserProfile.objects.create(
            user=user,
            skills=skills,
            gender=gender,
            profession=profession
        )

        return Response({'message': 'User created successfully'})


# 🔹 USER PROFILE VIEW
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    # GET → Return stored user data
    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)

        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "skills": profile.skills,
            "profession": profile.profession,
        })

    # (Optional) POST → If you still want manual profile creation
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)