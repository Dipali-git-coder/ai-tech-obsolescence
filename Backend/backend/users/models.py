from django.db import models

# Create your models here.
class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    
    skills = models.TextField()

    def __str__(self):
        return self.name
    
    