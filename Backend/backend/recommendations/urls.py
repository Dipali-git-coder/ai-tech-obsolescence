from django.urls import path
from .views import SkillRecommendationAPIView

urlpatterns = [
    path('', SkillRecommendationAPIView.as_view()),
]