# -*- coding: utf-8 -*-
from django.db import models

from movie.models import BaseModel


class Genre(BaseModel):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

