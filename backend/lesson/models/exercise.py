# backend/lesson/models/exercise.py
from django.db import models
from django.apps import apps

from lesson.models import BaseModel, Lesson


class Exercise(BaseModel):
    lesson = models.ForeignKey(Lesson, related_name='exercises', on_delete=models.CASCADE, blank=True, null=True)
    question = models.TextField()
    answer = models.TextField()
    suggested_answer = models.ManyToManyField('lesson.Suggested', related_name='exercises', blank=True)

    def __str__(self):
        return f"Exercise For {self.lesson}"

    class Meta:
        app_label = 'lesson'
        db_table = 'lesson_exercise'
        ordering = ['id']

    @property
    def suggested(self):
        Suggested = apps.get_model('lesson', 'Suggested')

        return Suggested.objects.filter(exercise=self)
