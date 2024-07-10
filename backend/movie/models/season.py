# -*- coding: utf-8 -*-
from django.db import models

from movie.models.series import Series
from movie.models.base import BaseModel


class Season(BaseModel):
    title = models.CharField(max_length=100)
    season_number = models.IntegerField('Season Number')
    series = models.ManyToManyField(Series, 'series')

    class Meta:
        verbose_name = 'Сезон'
        verbose_name_plural = 'Сезоны'

    def __str__(self):
        return self.title
