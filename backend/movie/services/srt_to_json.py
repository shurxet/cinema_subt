# -*- coding: utf-8 -*-
import json

path_srt = 'The.Boys.s01s04.en.subt.srt'
path_json = 'The.Boys.s01s03.en.subt.json'


def read_srt_file(path):
    subtitles = []
    with open(path, 'r', encoding='utf-8-sig') as file:  # Используем utf-8-sig для игнорирования BOM
        lines = file.readlines()
        index = 0
        while index < len(lines):
            # Читаем номер строки субтитра
            subtitle_id = lines[index].strip()
            index += 1

            # Читаем временные метки
            time_line = lines[index].strip()
            start, end = time_line.split(' --> ')
            index += 1

            # Читаем текст субтитра
            text = ''
            while index < len(lines) and lines[index].strip() != '':
                text += lines[index].strip() + ' '
                index += 1

            # Добавляем субтитр в список
            subtitles.append({
                'id': int(subtitle_id),
                'start': start,
                'end': end,
                'text': text.strip()
            })

            # Переходим к следующему субтитру
            index += 1

    return subtitles


subtitles = read_srt_file(path_srt)


def srt_to_json(path, subtitles):
    with open(path, 'w', encoding='utf-8') as file:
        subt = []

        for subtitle in subtitles:
            subt.append(
                {
                    "id": subtitle['id'],
                    "start": subtitle['start'],
                    "end": subtitle['end'],
                    "text": subtitle['text']
                }
            )
        file.write(json.dumps(subt, ensure_ascii=False, indent=4))


srt_to_json(path_json, subtitles)
