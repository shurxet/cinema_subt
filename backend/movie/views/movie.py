# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.views.generic import ListView, DetailView

from movie.models import Movie


class MovieListView(ListView):
    model = Movie

    def get(self, request, *args, **kwargs):
        movies = self.model.objects.all().order_by('id')
        response = []

        for movie in movies:
            poster_url = None
            if movie.poster_image and hasattr(movie.poster_image, 'url'):
                poster_url = request.build_absolute_uri(movie.poster_image.url)
            response.append(
                {
                    'id': movie.id,
                    'title': movie.title,
                    'poster': poster_url
                }
            )
        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})


class MovieDetailView(DetailView):
    model = Movie

    def get(self, request, *args, **kwargs):
        movie_id = self.kwargs['pk']
        movie = self.model.objects.prefetch_related('genre', 'countries', 'seasons', 'seasons__series').get(pk=movie_id)

        poster_url = None
        if movie.poster_image and hasattr(movie.poster_image, 'url'):
            poster_url = request.build_absolute_uri(movie.poster_image.url)

        response = {
            'title': movie.title,
            'poster': poster_url,
            'plot': movie.plot,
            'rating': movie.rating,
            'release_year': movie.release_year,
            'duration': movie.duration,
            'status': movie.status,
            'genres': [
                {
                    'id': i.id,
                    'title': i.title
                }
                for i in movie.genre.all()
            ],
            'countries': [
                {
                    'id': i.id,
                    'title': i.title
                }
                for i in movie.countries.all()
            ],
            'seasons': [
                {
                    'id': i.id,
                    'title': i.title,
                    'season_number': i.season_number,
                    'series': [
                        {
                            'id': i.id,
                            'title': i.title,
                            'series_number': i.series_number,
                            'description': i.description,
                            'dash_path': i.dash_path,
                            'hls_path': i.hls_path,
                            'ru_subt_path': i.ru_subt_path,
                            'en_subt_path': i.en_subt_path,
                        }
                        for i in i.series.all().order_by('id')
                    ]

                }
                for i in movie.seasons.all().order_by('id')
            ]
        }

        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
