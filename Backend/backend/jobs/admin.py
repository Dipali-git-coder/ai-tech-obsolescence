from django.contrib import admin
from .models import Skill, SkillTrend, Technology, Job

# Registering models here.
admin.site.register(Skill)
admin.site.register(SkillTrend)
admin.site.register(Technology)
admin.site.register(Job)