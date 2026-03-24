from django.db import models
import datetime
# Create your models here.
class Job(models.Model):
    # stores job posting information
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=255, null=True)
    location = models.CharField(max_length=255, null=True)
    posted_date = models.DateField(null=True, blank=True)
    description = models.TextField()

class Skill(models.Model):
    # Represents a technical skill used for demand and trend analysis
    skill_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, null=True, blank=True)
    demand_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

class Technology(models.Model):
    # Stores technology domains
    technology_id = models.CharField(max_length=100, primary_key=True)
    technology_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, null=True, blank=True)
    
class SkillTrend(models.Model):
    # Tracks monthly demand trend of each skill
    skill = models.ForeignKey(
        Skill, 
        on_delete=models.CASCADE,
        related_name='trends'
    )

    # # Links skill demand to a specific job posting 
    # job = models.ForeignKey(
    #     Job, 
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True
    # )

    # Time-based tracking for trend-analysis
    year = models.IntegerField(default=datetime.datetime.now().year)
    month = models.IntegerField(default=datetime.datetime.now().month)

    # Number of times the skill was appeared in job postings
    count = models.IntegerField(default=0)

    class Meta:
        # Ensures that each skill has only one entry per month and year for accurate trend tracking
        unique_together = ('skill', 'year', 'month')

        # Orders the trends by most recent first
        ordering = ['-year', '-month']  

    def __str__(self):
        return f"{self.skill.name} - {self.year}"