from rest_framework import viewsets

from lesson.models.lesson import Lesson
from lesson.serializers.lesson import LessonSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().order_by('id')
    serializer_class = LessonSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.prefetch_related(
            'sections__dialogues__replicas__interlocutor_a_analysis',
            'sections__dialogues__replicas__interlocutor_b_analysis',
            'exercises__suggested_answer'
        )
        return queryset

