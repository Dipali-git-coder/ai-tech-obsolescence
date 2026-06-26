from .views import CareerCoach
from django.urls import path

urlpatterns = [
    path("", CareerCoach.as_view()),
]