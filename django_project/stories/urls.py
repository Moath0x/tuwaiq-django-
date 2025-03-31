from django.urls import path
from . import views

app_name = 'stories'

urlpatterns = [
    path('', views.home, name='home'),
    path('story/<int:story_id>/', views.story_detail, name='story_detail'),
    path('age-group/<str:age_group>/', views.stories_by_age_group, name='stories_by_age_group'),
    path('theme/<str:theme>/', views.stories_by_theme, name='stories_by_theme'),
    
    # API URLs
    path('api/age-groups/', views.api_age_groups, name='api_age_groups'),
    path('api/themes/', views.api_themes, name='api_themes'),
    path('api/stories/', views.api_stories, name='api_stories'),
    path('api/stories/featured/', views.api_featured_stories, name='api_featured_stories'),
    path('api/stories/recent/<int:count>/', views.api_recent_stories, name='api_recent_stories'),
    path('api/stories/<int:story_id>/', views.api_story_detail, name='api_story_detail'),
]