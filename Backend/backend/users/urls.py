from django.urls import path
from .views import SignupView, UserProfileView, user_profile

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('api/user-profile/', UserProfileView.as_view()),
    path('profile/', user_profile), 
]