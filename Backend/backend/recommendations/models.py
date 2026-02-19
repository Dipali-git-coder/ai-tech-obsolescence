from django.db import models
from users.models import UserProfile
from django.utils import timezone

# Create your models here.
class Recommendation(models.Model):

    role = models.CharField(max_length=100)
    user_skills = models.TextField()

    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    recommended_skills = models.TextField()

    skill_gap_count = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Recommendation {self.id}"
