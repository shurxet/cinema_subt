# serializers.py
from rest_framework import serializers
from lesson.models import Lesson, Section, Dialogue, Exercise, Suggested, Replica, WordAnalysis


class WordAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordAnalysis
        fields = '__all__'


class ReplicaSerializer(serializers.ModelSerializer):
    interlocutor_a_analysis = WordAnalysisSerializer(many=True, read_only=True)
    interlocutor_b_analysis = WordAnalysisSerializer(many=True, read_only=True)

    class Meta:
        model = Replica
        fields = '__all__'


class DialogueSerializer(serializers.ModelSerializer):
    replicas = ReplicaSerializer(many=True, read_only=True)

    class Meta:
        model = Dialogue
        fields = '__all__'


class SuggestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggested
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    suggested_answer = SuggestedSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    dialogues = DialogueSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'
