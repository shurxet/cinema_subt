# -*- coding: utf-8 -*-
from django.db import models
from movie.models import BaseModel


class Series(BaseModel):
    title = models.CharField('Title', max_length=100)
    series_number = models.IntegerField('Series Number')
    description = models.TextField('Description', max_length=1000)
    dash_path = models.CharField(max_length=1000)
    hls_path = models.CharField(max_length=1000)
    ru_subt_path = models.CharField(max_length=1000)
    en_subt_path = models.CharField(max_length=1000)
    subt_path = models.JSONField()

    class Meta:
        verbose_name = 'Серия'
        verbose_name_plural = 'Серии'

    def __str__(self):
        return self.title
