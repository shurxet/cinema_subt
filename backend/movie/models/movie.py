# -*- coding: utf-8 -*-
from django.db import models

from movie.models.base import BaseModel
from movie.models.genre import Genre
from movie.models.country import Country
from movie.models.season import Season


class Movie(BaseModel):
    title = models.CharField(max_length=100)
    plot = models.TextField(max_length=1000)
    rating = models.FloatField(default=0)
    release_year = models.IntegerField(default=0)
    genre = models.ManyToManyField(Genre)
    countries = models.ManyToManyField(Country, 'countries')
    duration = models.IntegerField(default=0)
    status = models.CharField(max_length=100)

    seasons = models.ManyToManyField(Season, 'seasons')
    poster_image = models.ImageField(upload_to='poster/', null=True, verbose_name="movie poster")
    poster_path = models.CharField(max_length=1000)

    class Meta:
        verbose_name = 'Фильм'
        verbose_name_plural = 'Фильмы'

    def __str__(self):
        return self.title

