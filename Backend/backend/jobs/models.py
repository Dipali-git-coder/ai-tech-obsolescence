from django.db import models
import datetime
# Create your models here.
class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=255, null=True)
    location = models.CharField(max_length=255, null=True)
    posted_date = models.DateField(null=True, blank=True)
    description = models.TextField()

class Skill(models.Model):
    skill_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, null=True, blank=True)
    demand_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

class Technology(models.Model):
    technology_id = models.CharField(max_length=100, primary_key=True)
    technology_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, null=True, blank=True)
    
class SkillTrend(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    job = models.ForeignKey(
        Job, 
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    year = models.IntegerField(default=datetime.datetime.now().year)
    month = models.IntegerField(default=datetime.datetime.now().month)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.skill.name} - {self.year}"