from django.urls import path, include
from rest_framework.routers import SimpleRouter

from lesson import views


lesson_router = SimpleRouter()
lesson_router.register('', views.LessonViewSet)


urlpatterns = [
    path("", include(lesson_router.urls)),
]

# urlpatterns = [
#     path("", views.LessonViewSet.as_view({'get': 'retrieve'}), name="LessonViewSet"),
# ]
