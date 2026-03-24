from django.db import models 
from django.contrib.auth.models import User

# Create your models here. 
class UserProfile(models.Model): 
    # Stores basic user infomaation for recommendation 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile/', null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    profession = models.CharField(max_length=100, null=True, blank=True) 
    
    # comma-separated list of user skills 
    skills = models.JSONField(default=list, blank=True) 
    
    def __str__(self): 
        if self.user:
            return self.user.username
        return "No User"
