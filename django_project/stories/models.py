from django.db import models

class AgeGroup(models.Model):
    name = models.CharField(max_length=50)
    range = models.CharField(max_length=10)
    color = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name

class Theme(models.Model):
    name = models.CharField(max_length=50)
    icon = models.TextField()  # SVG icon stored as text
    
    def __str__(self):
        return self.name

class Story(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    summary = models.TextField()
    image_url = models.CharField(max_length=255)
    age_group = models.CharField(max_length=10)
    reading_time = models.IntegerField()
    theme = models.CharField(max_length=50)
    is_featured = models.BooleanField(default=False)
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']