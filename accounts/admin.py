from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'institution', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Información de Rol EduQuest', {'fields': ('role', 'institution')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información de Rol EduQuest', {'fields': ('role', 'institution')}),
    )
    search_fields = ('username', 'first_name', 'last_name', 'email', 'institution')
    ordering = ('username',)
