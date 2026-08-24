# Деплой

## 🚀 Обзор процесса деплоя

Процесс деплоя включает следующие этапы:

1. Подготовка и проверка кода
2. Сборка production версии
3. Тестирование сборки
4. Создание Docker образа (опционально)
5. Деплой на сервер
6. Проверка работоспособности

## 📦 Локальная сборка

### 1. Подготовка к сборке

```bash
# Установка зависимостей
pnpm install

# Проверка типов TypeScript
pnpm lint:type

# Запуск линтера
pnpm lint:eslint

# Форматирование кода
pnpm prettier

# Запуск тестов
pnpm test:vitest
```

### 2. Production сборка

```bash
# Полная сборка с проверками
pnpm build

# Или отдельные команды:
# 1. Проверка типов
pnpm exec tsc -b

# 2. Сборка Vite
pnpm exec vite build
```

### 3. Превью production сборки

```bash
# Запустить локальный сервер с production сборкой
pnpm preview

# Откроется на http://localhost:4173
```

### Результат сборки

После сборки в директории `dist/` будут:

```
dist/
├── index.html              # Главный HTML файл
├── assets/                 # Собранные JS и CSS файлы
│   ├── index-[hash].js    # Основной бандл
│   ├── vendor-[hash].js   # Зависимости
│   └── index-[hash].css   # Стили
├── locales/               # Переводы i18n
└── stats.html             # Анализ бандла (rollup-plugin-visualizer)
```

## 🎯 Оптимизация сборки

### 1. Разделение чанков (Code Splitting)

Настроено в `config/vite/buildOptions.ts`:

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-query': ['@tanstack/react-query'],
        'vendor-router': ['@tanstack/react-router'],
        'vendor-ui': ['radix-ui', 'lucide-react'],
      },
    },
  },
}
```

### 2. Минификация и компрессия

**Минификация (Terser):**

```typescript
// config/vite/buildPlugins.ts
import terser from '@rollup/plugin-terser'

terser({
  compress: {
    drop_console: true, // Удаление console.log в production
    drop_debugger: true,
  },
})
```

**Gzip/Brotli компрессия:**

```typescript
import { compression } from 'vite-plugin-compression2'

compression({
  algorithm: 'gzip',
  exclude: [/\.(br)$/, /\.(gz)$/],
})

compression({
  algorithm: 'brotli',
  exclude: [/\.(br)$/, /\.(gz)$/],
})
```

### 3. Анализ размера бандла

```bash
# Сборка с визуализацией
pnpm build

# Открыть stats.html для анализа
open dist/stats.html
```

## 🐳 Docker

### Dockerfile

```dockerfile
# Многоэтапная сборка для оптимизации размера образа

# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Копирование файлов зависимостей
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install --frozen-lockfile

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN pnpm build

# Этап 2: Production образ с Nginx
FROM nginx:alpine

# Копирование собранного приложения
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации Nginx
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Сборка Docker образа

```bash
# Сборка образа
docker build -t spa-module:latest .

# Сборка с тегом версии
docker build -t spa-module:1.0.0 .

# Запуск контейнера
docker run -d -p 80:80 --name spa-module spa-module:latest

# Проверка логов
docker logs spa-module

# Остановка и удаление
docker stop spa-module
docker rm spa-module
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: spa-module:latest
    container_name: spa-module
    ports:
      - '80:80'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test:
        ['CMD', 'wget', '--quiet', '--tries=1', '--spider', 'http://localhost/']
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

Запуск:

```bash
# Запуск с docker-compose
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

## 🌐 Nginx конфигурация

### infra/nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/json application/javascript;
    gzip_comp_level 6;

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Обработка HTML (не кэшируем)
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # SPA routing - все запросы на index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Заголовки безопасности
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Content Security Policy (настройте под свои нужды)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" always;

    # Отключение показа версии Nginx
    server_tokens off;
}
```

### SSL/TLS (HTTPS)

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    root /usr/share/nginx/html;
    index index.html;

    # SSL сертификаты (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;

    # SSL оптимизации
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Остальная конфигурация...
}
```

## 🔄 CI/CD

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm lint:type

      - name: Lint
        run: pnpm lint:eslint

      - name: Run tests
        run: pnpm test:vitest

      - name: Build
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t spa-module:${{ github.sha }} .

      - name: Tag as latest
        run: docker tag spa-module:${{ github.sha }} spa-module:latest

      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push spa-module:latest

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull spa-module:latest
            docker stop spa-module || true
            docker rm spa-module || true
            docker run -d -p 80:80 --name spa-module spa-module:latest
```

## 📊 Мониторинг

### 1. Логи приложения

```bash
# Docker логи
docker logs spa-module

# Логи в реальном времени
docker logs -f spa-module

# Последние 100 строк
docker logs --tail 100 spa-module
```

### 2. Nginx логи

```bash
# Внутри контейнера
docker exec spa-module cat /var/log/nginx/access.log
docker exec spa-module cat /var/log/nginx/error.log

# Мониторинг в реальном времени
docker exec spa-module tail -f /var/log/nginx/access.log
```

### 3. Метрики производительности

Используйте инструменты для мониторинга:

- **Lighthouse** - Аудит производительности
- **Web Vitals** - Core Web Vitals метрики
- **Google Analytics** - Аналитика пользователей
- **Sentry** - Мониторинг ошибок (опционально)

### 4. Health checks

```bash
# Проверка доступности
curl http://localhost/

# Проверка с заголовками
curl -I http://localhost/

# Docker healthcheck
docker inspect --format='{{.State.Health.Status}}' spa-module
```

## 🔧 Переменные окружения

### Vite Environment Variables

Создайте файлы для разных окружений:

- `.env` - Общие переменные
- `.env.development` - Для разработки
- `.env.production` - Для продакшена

```env
# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Production App
VITE_ENABLE_ANALYTICS=true
```

Использование в коде:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

### Docker runtime переменные

```bash
docker run -d \
  -p 80:80 \
  -e VITE_API_URL=https://api.example.com \
  --name spa-module \
  spa-module:latest
```

## 🔄 Процесс обновления

### 1. Blue-Green Deployment

```bash
# Запуск новой версии (green)
docker run -d -p 8080:80 --name spa-module-green spa-module:new

# Проверка работоспособности
curl http://localhost:8080/

# Переключение трафика (обновление nginx upstream)
# Остановка старой версии (blue)
docker stop spa-module-blue
docker rm spa-module-blue

# Переименование green в blue
docker rename spa-module-green spa-module-blue
```

### 2. Rolling Update

```bash
# Обновление с помощью docker-compose
docker-compose pull
docker-compose up -d

# Проверка статуса
docker-compose ps
```

### 3. Откат (Rollback)

```bash
# Откат к предыдущей версии
docker stop spa-module
docker rm spa-module

# Запуск предыдущего образа
docker run -d -p 80:80 --name spa-module spa-module:previous-version

# Или через docker-compose
docker-compose down
docker-compose up -d --force-recreate
```

## 📋 Checklist перед деплоем

- [ ] Все тесты проходят (`pnpm test:vitest`)
- [ ] TypeScript проверка без ошибок (`pnpm lint:type`)
- [ ] ESLint проверка пройдена (`pnpm lint:eslint`)
- [ ] Код отформатирован (`pnpm prettier`)
- [ ] Production сборка успешна (`pnpm build`)
- [ ] Превью сборки проверен (`pnpm preview`)
- [ ] Размер бандла оптимизирован (проверить `dist/stats.html`)
- [ ] Переменные окружения настроены
- [ ] Создан Git tag для версии
- [ ] Обновлен CHANGELOG (если есть)
- [ ] Создан backup текущей версии

## 🚨 Troubleshooting

### Проблема: Белый экран после деплоя

**Решение:**

1. Проверьте пути к assets в `index.html`
2. Убедитесь, что base URL правильный в `vite.config.ts`
3. Проверьте Nginx конфигурацию для SPA routing

### Проблема: 404 на роутах

**Решение:**
Убедитесь, что Nginx настроен на `try_files $uri $uri/ /index.html`

### Проблема: Большой размер бандла

**Решение:**

1. Проверьте `dist/stats.html`
2. Используйте dynamic imports для тяжелых библиотек
3. Проверьте настройки code splitting

### Проблема: Медленная загрузка

**Решение:**

1. Включите Gzip/Brotli сжатие
2. Настройте кэширование в Nginx
3. Используйте CDN для статических файлов
4. Оптимизируйте изображения

## 📚 Дополнительные ресурсы

- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt SSL](https://letsencrypt.org/)
