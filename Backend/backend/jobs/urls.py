from django.urls import path
from .views import TrendingSkills, ObsoleteSkills
from .views import RecommendSkills

urlpatterns = [
    path('skills/trending/', TrendingSkills.as_view()),
    path('skills/obsolete/', ObsoleteSkills.as_view()),
    path('recommend/', RecommendSkills.as_view())
]