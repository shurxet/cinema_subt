# backend/lesson/models/word_analysis.py
from django.db import models
from lesson.models import BaseModel


class WordAnalysis(BaseModel):
    # replica = models.ForeignKey('lesson.Replica', on_delete=models.CASCADE)
    word = models.TextField()
    translation = models.TextField()
    analysis = models.TextField()

    def __str__(self):
        # return f"Word: {self.word} For {self.replica}"
        return f"{self.word} {self.translation}"

    class Meta:
        app_label = 'lesson'
        db_table = 'lesson_word_analysis'
        ordering = ['id']
