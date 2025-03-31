from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import AgeGroup, Theme, Story

def home(request):
    featured_stories = Story.objects.filter(is_featured=True)
    recent_stories = Story.objects.all()[:4]
    age_groups = AgeGroup.objects.all()
    themes = Theme.objects.all()
    
    context = {
        'featured_stories': featured_stories,
        'recent_stories': recent_stories,
        'age_groups': age_groups,
        'themes': themes,
    }
    
    return render(request, 'stories/home.html', context)

def story_detail(request, story_id):
    story = get_object_or_404(Story, id=story_id)
    return render(request, 'stories/story_detail.html', {'story': story})

def stories_by_age_group(request, age_group):
    stories = Story.objects.filter(age_group=age_group)
    return render(request, 'stories/filtered_stories.html', {
        'stories': stories,
        'filter_type': 'age_group',
        'filter_value': age_group
    })

def stories_by_theme(request, theme):
    stories = Story.objects.filter(theme=theme)
    return render(request, 'stories/filtered_stories.html', {
        'stories': stories,
        'filter_type': 'theme',
        'filter_value': theme
    })

# API Views
def api_age_groups(request):
    age_groups = AgeGroup.objects.all()
    data = list(age_groups.values())
    return JsonResponse(data, safe=False)

def api_themes(request):
    themes = Theme.objects.all()
    data = list(themes.values())
    return JsonResponse(data, safe=False)

def api_stories(request):
    stories = Story.objects.all()
    data = list(stories.values())
    return JsonResponse(data, safe=False)

def api_featured_stories(request):
    stories = Story.objects.filter(is_featured=True)
    data = list(stories.values())
    return JsonResponse(data, safe=False)

def api_recent_stories(request, count):
    stories = Story.objects.all()[:count]
    data = list(stories.values())
    return JsonResponse(data, safe=False)

def api_story_detail(request, story_id):
    story = get_object_or_404(Story, id=story_id)
    data = {
        'id': story.id,
        'title': story.title,
        'content': story.content,
        'summary': story.summary,
        'image_url': story.image_url,
        'age_group': story.age_group,
        'reading_time': story.reading_time,
        'theme': story.theme,
        'is_featured': story.is_featured,
        'rating': story.rating,
    }
    return JsonResponse(data)