from django.contrib import admin
from .models import AgeGroup, Theme, Story

@admin.register(AgeGroup)
class AgeGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'range', 'color')
    search_fields = ('name', 'range')

@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'age_group', 'theme', 'reading_time', 'is_featured', 'rating')
    list_filter = ('age_group', 'theme', 'is_featured')
    search_fields = ('title', 'content', 'summary')
    list_editable = ('is_featured', 'rating')