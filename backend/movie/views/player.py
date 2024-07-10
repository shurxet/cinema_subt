# -*- coding: utf-8 -*-
import json
import os

from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView


from backend.settings import MEDIA_PARENT_DIR, MEDIA_ROOT
from movie.models import Series
from movie.utils import read_srt_file


@method_decorator(csrf_exempt, name="dispatch")
class PlayerView(DetailView):
    template_name = '../templates/player.html'
    model = Series
    context_object_name = 'response'

    def get(self, request, *args, **kwargs):
        try:
            series_id = self.kwargs['pk']
            series = self.model.objects.get(pk=series_id)
            response = {
                "id": series.id,
                "title": series.title,
                "video_path": {
                    "dash_path": series.dash_path,
                    "hls_path": series.hls_path,
                },
                "subt": {}
            }

            for i in series.subt_path:
                try:
                    path = os.path.join(MEDIA_PARENT_DIR, MEDIA_ROOT, 'videos/', i['path'])
                    response["subt"][i['lang']] = read_srt_file(path)
                except Exception as e:
                    print(e)

            response = {'response': json.dumps(response)}

            return render(request, self.template_name, response)

        except Exception as e:
            print(e)
