# -*- coding: utf-8 -*-
import json
import os
from django.http import HttpResponse
from django.views.generic import DetailView


from backend.settings import MEDIA_PARENT_DIR, MEDIA_ROOT
from movie.models import Series
from movie.utils import read_srt_file


class SubtitlesView(DetailView):
    model = Series

    def get(self, request, *args, **kwargs):
        id_series = self.kwargs['pk']
        series = self.model.objects.get(pk=id_series)

        response = {
        }

        for i in series.subt_path:
            try:
                path = os.path.join(MEDIA_PARENT_DIR, MEDIA_ROOT, i['path'])
                response[i['lang']] = read_srt_file(path)
            except Exception as e:
                print(e)

        json_subtitles = json.dumps(response, ensure_ascii=False)
        return HttpResponse(json_subtitles, content_type='application/json')
