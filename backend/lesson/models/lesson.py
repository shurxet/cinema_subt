# backend/lesson/models/lesson.py
from django.db import models
from lesson.models import BaseModel


class Lesson(BaseModel):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='trainer/images/', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']


class Section(BaseModel):
    lesson = models.ForeignKey(Lesson, related_name='sections', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']
