from django.contrib import admin
from .models import UserProfile

# Register models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'profession', 'skills')

    def email(self, obj):
        return obj.user.email
    
admin.site.register(UserProfile, UserProfileAdmin)