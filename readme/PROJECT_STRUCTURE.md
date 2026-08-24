# Структура проекта

## 📁 Корневая директория

```
spa-module/
├── src/               # Исходный код приложения
├── config/            # Конфигурационные файлы (Vite, плагины)
├── public/            # Статические файлы (index.html, assets)
├── scripts/           # Скрипты для сборки и утилиты
├── infra/             # Файлы для инфраструктуры (Docker, nginx)
├── readme/            # Документация проекта
├── .husky/            # Git hooks (pre-commit)
├── package.json       # Зависимости и скрипты
├── pnpm-lock.yaml     # Lock-файл pnpm
├── tsconfig.json      # Конфигурация TypeScript
├── vite.config.ts     # Конфигурация Vite
└── README.md          # Главная документация
```

## 📁 src/ - Исходный код

Основная директория с кодом приложения, организованная по принципам Feature-Sliced Design.

### 📁 app/ - Точка входа приложения

Инициализация и настройка приложения:

```
app/
├── providers/              # React провайдеры
│   ├── QueryProvider/      # TanStack Query provider
│   │   └── ui/
│   │       └── QueryProvider.tsx  # Provider компонент с QueryClient
│   └── index.tsx           # Экспорт всех провайдеров
├── App.tsx                 # Корневой компонент с Router
├── GlobalLayout.tsx        # Глобальный layout (опционально)
└── main.tsx                # Точка входа (ReactDOM.render)
```

**Ключевые файлы:**

- `main.tsx` - Рендерит React приложение в DOM
- `App.tsx` - Настройка TanStack Router и общий layout
- `providers/QueryProvider/` - TanStack Query client с настройками кэширования

### 📁 pages/ - Страницы приложения (TanStack Router)

File-based routing - каждый файл создает роут:

```
pages/
├── __root.tsx              # Корневой layout для всех страниц
├── index.tsx               # / - Главная страница (редирект)
├── dashboard/
│   └── index.tsx           # /dashboard - Дашборд
├── auth/
│   └── sign-in.tsx         # /auth/sign-in - Страница входа
└── _authenticated/         # Защищенные роуты (с AuthProvider)
    └── settings/
        └── index.tsx       # /settings - Настройки
```

**Особенности:**

- Автоматическая генерация роутов из файловой структуры
- Type-safe навигация и параметры
- Layout inheritance через `__root.tsx`
- Защита роутов через `_authenticated` prefix

**Пример создания страницы:**

```typescript
// pages/users/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: UsersPage,
})

function UsersPage() {
  return <div>Список пользователей</div>
}
```

### 📁 modules/ - Функциональные модули

Модули организованы по бизнес-доменам (Feature-Sliced Design):

```
modules/
├── Auth/                   # Аутентификация и авторизация
│   ├── model/             # Типы, константы
│   ├── components/        # Компоненты (SignIn, AuthProvider)
│   └── index.ts           # Публичное API модуля
├── Dashboard/             # Дашборд с метриками
│   ├── model/             # Типы, mock данные
│   ├── hooks/             # useDashboardMetrics, useVisitorData
│   └── ui/                # UI компоненты
│       ├── DashboardLayout/
│       ├── DashboardGrid/
│       ├── MetricCard/
│       ├── VisitorChart/
│       ├── Header/
│       └── Sidebar/
└── common/                # Общие модули (Layout, Sidebar)
    └── SiderDashboard/
```

> **Примечание:** API хуки генерируются централизованно из OpenAPI спецификации в `src/shared/services/api/`. Смотрите раздел [API генерация](#api-генерация).

**Структура типичного модуля:**

```
ModuleName/
├── model/                 # Бизнес-логика
│   ├── types.ts          # TypeScript интерфейсы
│   ├── constants.ts      # Константы модуля
│   └── mockData.ts       # Mock данные для разработки
├── hooks/                 # Кастомные React хуки
│   └── useModuleData.ts  # Переиспользуемая логика
├── components/            # Сложные компоненты с логикой
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── index.ts
├── ui/                    # Презентационные UI компоненты
│   └── UiComponent/
│       ├── UiComponent.tsx
│       └── index.ts
└── index.ts               # Публичный API (что экспортируется наружу)
```

### 📁 shared/ - Общие ресурсы

Переиспользуемые компоненты, утилиты и конфигурации:

```
shared/
├── api/                        # API клиент и конфигурация
│   └── client/
│       └── apiClient.ts       # HTTP клиент (axios instance)
├── services/                   # Сервисы приложения
│   └── api/                   # Сгенерированные API хуки
│       ├── apiComponents.ts   # TanStack Query хуки (сгенерировано)
│       ├── apiSchemas.ts      # TypeScript типы (сгенерировано)
│       ├── apiContext.ts      # Контекст и queryKeyFn
│       └── apiFetcher.ts      # Fetcher для API запросов
├── config/                     # Конфигурации
│   ├── i18n/
│   │   ├── i18n.ts            # Настройка i18next
│   │   └── i18nForTests.ts    # i18n для тестов
│   └── routes/                # Конфигурация роутов (опционально)
├── hooks/                      # Общие React хуки
│   ├── useAppSearchParams/
│   │   ├── useAppSearchParams.ts
│   │   └── usePaginationQuery.tsx
│   └── useDateRangeFilters/
│       └── useDateRangeFilters.tsx
├── libs/                       # Утилиты и библиотеки
│   ├── dayjs/                 # Работа с датами
│   │   ├── displayDate/
│   │   ├── todayDate/
│   │   └── ...
│   ├── displaySum/            # Форматирование чисел
│   │   └── displaySum.ts
│   └── tree/                  # Работа с деревьями
│       └── formatDataTree.tsx
└── ui/                         # Переиспользуемые UI компоненты
    ├── App/                   # App-специфичные компоненты
    │   └── logo-main/
    ├── form-query/            # Форм-элементы с query params
    │   ├── select-query/
    │   └── text-filed-query/
    ├── error-info/            # Компонент ошибок
    └── appearance-animation/  # Анимации
```

**Основные категории shared:**

#### api/

- `apiClient.ts` - Axios instance с базовой конфигурацией

#### services/api/ (API генерация) {#api-генерация}

- `apiComponents.ts` - Сгенерированные TanStack Query хуки из OpenAPI
- `apiSchemas.ts` - Сгенерированные TypeScript типы из OpenAPI
- `apiContext.ts` - Контекст и функция генерации ключей кэша
- `apiFetcher.ts` - HTTP fetcher для выполнения API запросов

#### hooks/

- `useAppSearchParams` - Работа с URL query параметрами
- `useDateRangeFilters` - Фильтры по датам
- `usePaginationQuery` - Пагинация через query params

#### libs/

- `dayjs/` - Утилиты для работы с датами
- `displaySum/` - Форматирование чисел (с разделителями)
- `tree/` - Работа с древовидными структурами

#### ui/

- Переиспользуемые UI компоненты
- shadcn primitives и переиспользуемые композиции
- Компоненты для работы с формами и query parameters

### 📁 @types/ - Глобальные типы

TypeScript определения и глобальные типы:

```
@types/
├── global.d.ts            # Глобальные типы
├── vite-env.d.ts          # Типы для Vite
└── images.d.ts            # Типы для импорта изображений
```

## 📁 config/ - Конфигурация

Модульная конфигурация Vite и build tools:

```
config/
├── vite/                       # Конфигурация Vite
│   ├── buildOptions.ts        # Опции сборки (outDir, sourcemaps)
│   ├── buildDefine.ts         # Глобальные переменные (process.env)
│   ├── buildPlugins.ts        # Vite плагины (React, Router, Tailwind)
│   ├── buildResolve.ts        # Алиасы путей (@shared, @modules)
│   ├── buildServer.ts         # Dev server конфигурация
│   ├── buildCss.ts            # CSS/PostCSS конфигурация
│   ├── buildTest.ts           # Vitest конфигурация
│   └── buildOptimizeDeps.ts   # Оптимизация зависимостей
└── plugins/                    # Кастомные Vite плагины
    └── нет кастомных palette-плагинов
```

**Основные конфигурации:**

- `buildPlugins.ts` - Регистрация всех плагинов (React-SWC, TanStack Router, Tailwind, etc)
- `buildResolve.ts` - Path aliases (`@shared`, `@modules`, `@pages`)
- `buildTest.ts` - Настройка Vitest (environment: happy-dom, coverage)

## 📁 public/ - Статические файлы

Публичные файлы, доступные по корневому URL:

```
public/
├── index.html             # HTML шаблон
├── favicon.ico            # Иконка сайта
├── locales/               # Переводы i18n
│   ├── ru/
│   │   ├── common.json
│   │   └── ...
│   └── en/
│       ├── common.json
│       └── ...
└── assets/                # Статические ресурсы
    ├── images/
    └── fonts/
```

## 📁 scripts/ - Скрипты

Вспомогательные скрипты для разработки:

```
scripts/
├── check.js               # Проверка pnpm версии (preinstall)
└── ...
```

## 📁 infra/ - Инфраструктура

Файлы для деплоя и инфраструктуры:

```
infra/
├── Dockerfile             # Docker образ для продакшена
├── docker-compose.yml     # Композиция Docker сервисов
└── nginx.conf             # Конфигурация Nginx
```

## 📁 readme/ - Документация

Подробная документация проекта:

```
readme/
├── ARCHITECTURE.md        # Архитектура приложения
├── PROJECT_STRUCTURE.md   # Структура проекта (этот файл)
├── TESTING.md             # Гайд по тестированию
├── DEPLOYMENT.md          # Инструкции по деплою
├── DEVELOPMENT.md         # Процесс разработки
└── checklist.md           # Чек-лист для первого запуска
```

## 🗂 Ключевые файлы корня

### package.json

Зависимости и скрипты проекта:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test:vitest": "vitest --run",
    "lint": "pnpm eslint:fix && pnpm lint:type && pnpm lint:eslint",
    "prettier": "prettier --write ."
  }
}
```

### tsconfig.json

Конфигурация TypeScript:

- Strict mode включен
- Path aliases (@shared, @modules, @pages)
- JSX: react-jsx
- Module: ESNext

### vite.config.ts

Главная конфигурация Vite, импортирующая модульные конфиги из `config/vite/`

### .husky/

Git hooks для автоматических проверок:

- `pre-commit` - Линтинг и форматирование перед коммитом

## 📊 Диаграмма зависимостей

```
┌─────────────────────────────────────────────┐
│               pages/ (Routes)               │
│     TanStack Router file-based routing      │
└──────────────────┬──────────────────────────┘
                   │ uses
                   ▼
┌─────────────────────────────────────────────┐
│            modules/ (Features)              │
│       Auth, Dashboard, common               │
└──────────┬──────────────┬───────────────────┘
           │              │
           │ uses         │ uses
           ▼              ▼
┌──────────────────┐  ┌──────────────────────┐
│ shared/services/ │  │    shared/ui/        │
│  TanStack Query  │  │  UI Components       │
└──────────────────┘  └──────────────────────┘
           │              │
           │ uses         │ uses
           ▼              ▼
┌─────────────────────────────────────────────┐
│          shared/libs/ & shared/hooks/       │
│        Utilities, dayjs, custom hooks       │
└─────────────────────────────────────────────┘
           │
           │ uses
           ▼
┌─────────────────────────────────────────────┐
│          External dependencies              │
│  shadcn/ui, React, TanStack Query, etc   │
└─────────────────────────────────────────────┘
```

## 🎯 Правила организации кода

### 1. Модули (modules/)

- Один модуль = одна бизнес-функция
- Модуль не зависит от других модулей напрямую
- Все зависимости через `shared/`

### 2. Shared

- Только переиспользуемый код
- Не содержит бизнес-логики конкретных фич
- Минимальные зависимости между shared компонентами

### 3. Pages

- Только роутинг и композиция модулей
- Минимум логики
- Использует модули и shared

### 4. Публичное API

Каждый модуль экспортирует только то, что нужно наружу через `index.ts`:

```typescript
// modules/Dashboard/index.ts
export { DashboardLayout } from './ui/DashboardLayout'
export { useDashboardMetrics } from './hooks/useDashboardMetrics'
export type { DashboardMetrics } from './model/types'

// НЕ экспортируем внутренние компоненты
// export { MetricCard } from './ui/MetricCard' ❌
```

## 📝 Соглашения по именованию

### Файлы

- Компоненты: `PascalCase.tsx` (Button.tsx, UserCard.tsx)
- Утилиты: `camelCase.ts` (formatDate.ts, apiClient.ts)
- Типы: `types.ts`, `interfaces.ts`
- Константы: `constants.ts`, `config.ts`

### Директории

- Модули: `PascalCase` (Auth/, Dashboard/)
- Утилиты: `kebab-case` (date-utils/, api-client/)
- UI компоненты: `PascalCase` (Button/, UserCard/)

### Exports

- Named exports для компонентов
- Default export в исключительных случаях
- index.ts для переэкспорта

## 🔍 Поиск и навигация

### Быстрый поиск компонентов

- **UI компоненты модуля**: `modules/ModuleName/ui/`
- **API модуля**: `modules/ModuleName/api/`
- **Типы модуля**: `modules/ModuleName/model/types.ts`
- **Общие компоненты**: `shared/ui/`
- **Утилиты**: `shared/libs/`
- **API клиент**: `shared/api/client/apiClient.ts`
- **Конфигурация Vite**: `config/vite/`

### Алиасы путей (tsconfig.json)

```typescript
import { DashboardLayout } from '@modules/Dashboard'

import { apiClient } from '@shared/api/client/apiClient'
import { Button } from '@shared/ui/button'
```

## 📚 Дополнительные ресурсы

- [Архитектура приложения](./ARCHITECTURE.md)
- [Тестирование](./TESTING.md)
- [Процесс разработки](./DEVELOPMENT.md)
- [Деплой](./DEPLOYMENT.md)
