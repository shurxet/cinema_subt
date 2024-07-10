from django.db import models
from movie.models import BaseModel


class Country(BaseModel):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title
