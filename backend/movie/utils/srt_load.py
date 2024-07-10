# import os

# from backend.settings import MEDIA_PARENT_DIR, MEDIA_ROOT

# subt_path = os.path.join(
#     '../../../../media_cinema',
#     'videos/', 'a_beautiful_planet/seasons_1/series_1/subtitles/A.Beautiful.Planet.ru.subt.srt'
# )


def read_srt_file(path):
    subtitles = []
    with open(path, 'r', encoding='utf-8-sig') as file:  # ���������� utf-8-sig ��� ������������� BOM
        lines = file.readlines()
        index = 0
        while index < len(lines):
            # ������ ����� ������ ��������
            subtitle_id = lines[index].strip()
            index += 1

            # ������ ��������� �����
            time_line = lines[index].strip()
            start, end = time_line.split(' --> ')
            index += 1

            # ������ ����� ��������
            text = ''
            while index < len(lines) and lines[index].strip() != '':
                text += lines[index].strip() + ' '
                index += 1

            # ��������� ������� � ������
            subtitles.append({
                'id': int(subtitle_id),
                'start': start,
                'end': end,
                'text': text.strip()
            })

            # ��������� � ���������� ��������
            index += 1

    return subtitles


# print(read_srt_file(subt_path))
