# backend/lesson/models/replica.py
from django.db import models
from lesson.models import BaseModel


class Replica(BaseModel):
    dialogue = models.ForeignKey('lesson.Dialogue', on_delete=models.CASCADE)
    interlocutor_a = models.TextField(null=True, blank=True)
    interlocutor_b = models.TextField(null=True, blank=True)
    translater_a = models.TextField(null=True, blank=True)
    translater_b = models.TextField(null=True, blank=True)
    interlocutor_a_analysis = models.ManyToManyField(
        'lesson.WordAnalysis',
        related_name='replicas_a_analysis',
        blank=True
    )
    interlocutor_b_analysis = models.ManyToManyField(
        'lesson.WordAnalysis',
        related_name='replicas_b_analysis',
        blank=True
    )

    def __str__(self):
        # return f"A/B Replicas A: {self.interlocutor_a}\n B: {self.interlocutor_b} For {self.dialogue}"
        return f"{self.interlocutor_a}, {self.interlocutor_b}"

    class Meta:
        app_label = 'lesson'
        db_table = 'lesson_replica'
        ordering = ['id']

    @property
    def a_analysis(self):
        return self.interlocutor_a_analysis.all()

    @property
    def b_analysis(self):
        return self.interlocutor_b_analysis.all()
