# ✅ Чек-лист для первого запуска и настройки проекта

## 📋 1. Подготовка окружения

- [ ] Установлен **Node.js >= 18.0.0**

  ```bash
  node --version
  ```

- [ ] Установлен **pnpm >= 8.0.0** (установится автоматически при первом `pnpm install`)

  ```bash
  pnpm --version
  ```

- [ ] Установлен **Git**

  ```bash
  git --version
  ```

- [ ] Установлен **VSCode** (рекомендуется) с расширениями:
  - ESLint
  - Prettier - Code formatter
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - Vitest (опционально)

## 📁 2. Ознакомление с проектом

- [ ] Прочитан главный **README.md** в корне проекта
- [ ] Изучена **файловая структура** проекта (см. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md))
- [ ] Ознакомлены с **архитектурой** приложения (см. [ARCHITECTURE.md](./ARCHITECTURE.md))
- [ ] Изучены основные директории:
  - `src/app/` - Инициализация приложения
  - `src/pages/` - Роуты (TanStack Router)
  - `src/modules/` - Функциональные модули
  - `src/shared/` - Общие ресурсы
  - `config/vite/` - Конфигурация Vite

## 📦 3. Установка зависимостей

- [ ] Клонирован репозиторий:

  ```bash
  git clone <repository-url>
  cd spa-module
  ```

- [ ] Установлены зависимости (используется **pnpm**):

  ```bash
  pnpm install
  ```

- [ ] Проверено, что **НЕТ** `package-lock.json` или `yarn.lock` (только `pnpm-lock.yaml`)

## 🔐 4. Настройка переменных окружения

- [ ] Создан `.env` файл (если нужен) на основе `.env.example`:

  ```bash
  cp .env.example .env
  ```

- [ ] Настроены необходимые переменные окружения:

  ```env
  VITE_API_URL=http://localhost:3000
  VITE_APP_TITLE=My Application
  ```

- [ ] Все `.env.*` файлы добавлены в `.gitignore` (уже настроено)

## 🧪 5. Проверка Husky и pre-commit хуков

- [ ] Инициализирован **Husky** (должно быть уже настроено):

  ```bash
  pnpm prepare
  ```

- [ ] Проверено, что pre-commit хуки работают:

  - Создать тестовый файл
  - Попробовать закоммитить
  - Убедиться, что запускается линтинг и форматирование

- [ ] При необходимости запустить полную подготовку к продакшену:
  ```bash
  pnpm prepare:prod
  ```
  Эта команда выполнит: форматирование + линтинг + сборку + тесты

## ⚙️ 6. Настройка @SETTING участков (если есть)

- [ ] Найдены все участки с пометкой `@SETTING` (поиск по проекту):

  ```bash
  grep -r "@SETTING" src/
  ```

- [ ] Пройдены и настроены помеченные места:
  - Конфигурации API endpoints
  - Значения по умолчанию
  - Специфичные для проекта настройки

## 🔍 7. Контроль дублирования кода (jscpd)

- [ ] Запущен анализ на дублирование:

  ```bash
  pnpm jscpd
  ```

- [ ] Убедились в отсутствии критических повторов (если есть - рефакторинг)

- [ ] При необходимости настроена интеграция с CI/CD

## 🚀 8. Первый запуск приложения

- [ ] Запущен dev-сервер:

  ```bash
  pnpm dev
  ```

- [ ] Приложение открылось в браузере на `http://localhost:5173`

- [ ] Hot Module Replacement (HMR) работает корректно

- [ ] Проверены все основные страницы приложения

## ✅ 9. Проверка качества кода

- [ ] Проверка TypeScript типов:

  ```bash
  pnpm lint:type
  ```

- [ ] Проверка ESLint:

  ```bash
  pnpm lint:eslint
  ```

- [ ] Проверка форматирования:

  ```bash
  pnpm lint:prettier
  ```

- [ ] Полная проверка (все вместе):
  ```bash
  pnpm lint
  ```

## 🧪 10. Запуск тестов

- [ ] Запущены все тесты:

  ```bash
  pnpm test:vitest
  ```

- [ ] Все тесты проходят успешно

- [ ] Проверено покрытие тестами:

  ```bash
  pnpm test:coverage
  ```

- [ ] (Опционально) Запущен UI для тестов:
  ```bash
  pnpm test:ui
  ```

## 📦 11. Проверка сборки

- [ ] Выполнена production сборка:

  ```bash
  pnpm build
  ```

- [ ] Сборка прошла без ошибок

- [ ] Проверен превью сборки:

  ```bash
  pnpm preview
  ```

- [ ] Приложение работает в production режиме

## 🛠 12. Настройка IDE (VSCode)

- [ ] Открыта папка проекта в VSCode

- [ ] Установлены рекомендуемые расширения (VSCode предложит автоматически)

- [ ] Проверена работа IntelliSense для:

  - TypeScript
  - Tailwind CSS
  - Import aliases (@shared, @modules)

- [ ] Настроены горячие клавиши (опционально):
  - Format Document: `Shift + Alt + F`
  - Organize Imports: `Shift + Alt + O`

## 📚 13. Изучение документации

- [ ] Прочитана документация в `readme/`:

  - [x] [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура
  - [x] [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Структура проекта
  - [x] [DEVELOPMENT.md](./DEVELOPMENT.md) - Процесс разработки
  - [x] [TESTING.md](./TESTING.md) - Тестирование
  - [x] [DEPLOYMENT.md](./DEPLOYMENT.md) - Деплой

- [ ] Изучены основные команды из `package.json`:
  ```bash
  pnpm dev           # Разработка
  pnpm build         # Сборка
  pnpm test:vitest   # Тесты
  pnpm lint          # Проверка кода
  pnpm prettier      # Форматирование
  ```

## 🎯 14. Первая задача

- [ ] Создана новая ветка для работы:

  ```bash
  git checkout -b feature/my-first-feature
  ```

- [ ] Выбрана задача из backlog

- [ ] Понятны требования к задаче

- [ ] Известно, какие модули/компоненты нужно создать или изменить

## 🔗 15. Дополнительные настройки (опционально)

- [ ] Настроен **Git config**:

  ```bash
  git config user.name "Your Name"
  git config user.email "your.email@example.com"
  ```

- [ ] Добавлены **SSH ключи** для GitHub/GitLab (если используются)

- [ ] Установлены **расширения браузера** для разработки:

  - React DevTools
  - TanStack Query Devtools (встроены в приложение)

- [ ] Настроен **debugging** в VSCode (`.vscode/launch.json` уже должен быть)

- [ ] Добавлены **code snippets** для ускорения разработки (опционально)

## 🎉 Готово!

После выполнения всех пунктов проект **полностью готов** для разработки!

### 🚀 Следующие шаги:

1. Начните разработку своей первой фичи
2. Изучите существующие модули для понимания паттернов
3. При возникновении вопросов обращайтесь к документации или команде
4. Соблюдайте code style и best practices проекта

### 📖 Полезные команды для работы:

```bash
# Разработка
pnpm dev                    # Запуск dev-сервера
pnpm build                  # Production сборка
pnpm preview                # Превью сборки

# Качество кода
pnpm lint                   # Все проверки
pnpm prettier               # Форматирование
pnpm lint:type              # Проверка типов
pnpm eslint:fix             # Автоисправление

# Тестирование
pnpm test:vitest            # Запуск тестов
pnpm test:coverage          # С покрытием
pnpm test:ui                # UI для тестов

# Анализ
pnpm jscpd                  # Дублирование кода

# Storybook (если используется)
pnpm storybook              # Запуск Storybook
pnpm build:storybook        # Сборка Storybook
```

### 💡 Советы:

- Используйте `git commit` с conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Регулярно запускайте тесты во время разработки
- Проверяйте типы перед коммитом
- Изучайте существующий код для понимания паттернов
- Не стесняйтесь задавать вопросы команде

---

**Удачи в разработке! 🚀**
