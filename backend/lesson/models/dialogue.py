# backend/lesson/models/dialogue.py
from django.db import models
from lesson.models import BaseModel, Section


class Dialogue(BaseModel):
    section = models.ForeignKey(Section, related_name='dialogues', on_delete=models.CASCADE)
    dialogue = models.TextField()
    replicas = models.ManyToManyField('lesson.Replica', related_name='dialogues', blank=True)

    def __str__(self):
        return f"Dialogue: {self.dialogue}"

    class Meta:
        app_label = 'lesson'
        db_table = 'lesson_dialogue'
        ordering = ['id']

    @property
    def replica(self):
        return self.replicas.all()

