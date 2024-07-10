from django.contrib import admin
from movie.models import Movie, Season, Country, Series, Genre


# Register your models here.


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'plot', 'rating', 'release_year', 'display_genre', 'display_countries', 'duration',
                    'status', 'display_seasons', 'poster_path')
    list_display_links = ('title', 'plot', 'rating', 'release_year', 'display_genre', 'display_countries', 'duration',
                          'status', 'display_seasons', 'poster_path',)
    search_fields = ('title', 'rating', 'release_year', 'display_genre', 'display_countries', 'status',)
    list_filter = ('title', 'rating', 'release_year', 'status',)
    readonly_fields = ('created', 'updated',)

    def display_seasons(self, obj):
        return ', '.join([str(season.season_number) for season in obj.seasons.all()])

    display_seasons.short_description = 'Season'

    def display_genre(self, obj):
        return ', '.join([genre.title for genre in obj.genre.all()])

    display_genre.short_description = 'Genre'

    def display_countries(self, obj):
        return ', '.join([country.title for country in obj.countries.all()])

    display_countries.short_description = 'Country'


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')


@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'season_number', 'display_series')
    list_display_links = ('title', 'season_number',)
    search_fields = ('title', 'season_number',)
    list_filter = ('title', 'season_number',)
    readonly_fields = ('created', 'updated',)

    def display_series(self, obj):
        return ', '.join([series.title for series in obj.series.all()])

    display_series.short_description = 'Series'


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)
    list_display_links = ('title',)
    search_fields = ('title',)
    list_filter = ('title',)
    readonly_fields = ('created', 'updated',)


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'series_number', 'description', 'dash_path', 'hls_path', 'ru_subt_path',
                    'en_subt_path',)
    list_display_links = ('title', 'series_number', 'description', 'dash_path', 'hls_path', 'ru_subt_path',
                          'en_subt_path',)
    search_fields = ('title',)
    list_filter = ('title',)
    readonly_fields = ('created', 'updated',)
