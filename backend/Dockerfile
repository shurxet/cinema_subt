FROM python:3.12.3


WORKDIR /app/cinema/backend

COPY requirements.txt .

RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt
RUN mkdir /app/cinema/backend/static && mkdir /app/media_cinema

COPY . .

CMD ["sh", "entrypoin.sh"]
