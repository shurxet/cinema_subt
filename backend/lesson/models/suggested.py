# backend/lesson/models/suggested.py
from django.db import models
from lesson.models.base import BaseModel


class Suggested(BaseModel):
    option_text = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"Suggested Answer: {self.option_text}"

    class Meta:
        app_label = 'lesson'
        db_table = 'lesson_suggested'
        ordering = ['id']
