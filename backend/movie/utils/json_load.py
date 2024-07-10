# -*- coding: utf-8 -*-
import json


def json_load(path):
    with open(path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
        return data
