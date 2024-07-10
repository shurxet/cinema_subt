from django.contrib import admin

from lesson.models import Lesson, Section, Dialogue, Exercise, Suggested, Replica, WordAnalysis

admin.site.register(Lesson)

admin.site.register(Section)

admin.site.register(Dialogue)

admin.site.register(Exercise)

admin.site.register(Suggested)

admin.site.register(Replica)

admin.site.register(WordAnalysis)
