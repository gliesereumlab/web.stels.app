# Устанавливаем базовый образ Node
FROM node:16 AS builder

# Создаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходные файлы проекта
COPY . .

# Собираем React приложение
RUN npm run build

# Этап production
FROM node:16-slim

# Устанавливаем serve
RUN npm install -g serve

# Создаем рабочую директорию
WORKDIR /app

# Копируем сборку с предыдущего этапа
COPY --from=builder /app/build ./build

# Указываем порт и команду для запуска
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
