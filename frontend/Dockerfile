# Используем Node.js образ для сборки фронтенда
FROM node:latest as build

# Устанавливаем директорию для приложения в контейнере
WORKDIR /app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы фронтенда в директорию приложения
COPY . .

# Собираем фронтенд
RUN npm run build


# Второй этап Dockerfile: создаем легкий образ для запуска фронтенда
FROM node:latest

# Устанавливаем директорию для приложения в контейнере
WORKDIR /app

# Копируем собранные файлы фронтенда из предыдущего этапа
COPY --from=build /app ./

# Копируем entrypoint.sh в контейнер
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Указываем порт, на котором будет работать фронтенд
EXPOSE 3000

# Указываем точку входа
ENTRYPOINT ["entrypoint.sh"]




















## Второй этап Dockerfile: создаем образ с Nginx
#FROM nginx:latest
#
## Копируем собранные файлы фронтенда из предыдущего этапа в директорию Nginx
#COPY --from=build /app /usr/share/nginx/html
#
#RUN rm /etc/nginx/conf.d/default.conf
#
## Копируем конфигурационный файл Nginx
#COPY default.conf /etc/nginx/conf.d/default.conf

# Указываем порт, на котором будет работать фронтенд
#EXPOSE 80





