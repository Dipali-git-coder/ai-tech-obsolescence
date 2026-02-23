from django.db import models
from users.models import UserProfile
from django.utils import timezone

# Create your models here.
class Recommendation(models.Model):

    # Target role for which recommendations is generated
    role = models.CharField(max_length=100)

    # Skills currently possessed by the user
    user_skills = models.TextField()

    # Links recommendation to a specific user profile
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    # recommend skills 
    recommended_skills = models.TextField()

    # Number of missing between user profile and target role
    skill_gap_count = models.IntegerField()

    # Tracks creation and updation of recommendation
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Recommendation {self.id}"
