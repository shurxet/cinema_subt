from django.urls import path

from movie import views

urlpatterns = [
    path('list/', views.MovieListView.as_view(), name='movie_list'),
    path('detail/<int:pk>', views.MovieDetailView.as_view(), name='movie_detail'),

    path('load/<int:pk>', views.PlayerView.as_view(), name='movie_load'),
    path('subtitles/<int:pk>', views.SubtitlesView.as_view(), name='subtitles'),


]
