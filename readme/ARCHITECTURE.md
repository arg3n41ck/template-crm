# Архитектура приложения

## 🏗 Общая архитектура

Приложение построено по модульному принципу с использованием следующих ключевых концепций:

1. **Feature-Sliced Design (FSD)**

   - Разделение на независимые модули по функциональности
   - Каждый модуль отвечает за свою бизнес-задачу
   - Минимальная связность между модулями
   - Максимальная когезия внутри модуля

2. **Clean Architecture**
   - Четкое разделение на слои (UI, Business Logic, Data)
   - Независимость бизнес-логики от фреймворков
   - Инверсия зависимостей
   - Легкость тестирования и масштабирования

## 🛠 Технологический стек

### Ядро приложения

- **React 18.3.1** - UI библиотека с поддержкой Concurrent Mode
- **TypeScript 5.7.2** - Статическая типизация
- **Vite 6.2.0** - Быстрый сборщик и dev-сервер

### Роутинг

- **TanStack Router 1.131.30** - Типобезопасный роутинг
  - File-based routing
  - Type-safe навигация
  - Параметры роутов с валидацией
  - Автоматическая генерация типов

### Управление состоянием

- **TanStack Query 5** - Управление серверным состоянием
  - Автоматическое кэширование и инвалидация
  - Оптимистичные обновления
  - Дедупликация запросов
  - Автоматическая генерация хуков из OpenAPI
- **@openapi-codegen** - Генерация типов и хуков из OpenAPI спецификации

### UI библиотека

- **shadcn/ui** - Локальные UI primitives на Radix UI
- **`cn` / shared helpers** - Локальные утилиты из `@shared/libs`
- **Tailwind CSS 4.0.7** - Utility-first CSS фреймворк
- **lucide-react** - Иконки
- **Recharts 3.5.1** - Графики и визуализация данных

### Дополнительные инструменты

- **i18next 25.0.0** - Интернационализация
- **dayjs 1.11.19** - Работа с датами
- **Vitest 2.1.3** - Unit и интеграционное тестирование
- **happy-dom 15.7.4** - Легковесная DOM имплементация для тестов

## 🧩 Архитектурные слои

### 1. Presentation Layer (UI)

**Ответственность:**

- Отображение данных пользователю
- Обработка пользовательских действий
- Рендеринг компонентов
- Управление локальным UI состоянием

**Технологии:**

- React компоненты (функциональные)
- React Hooks (useState, useEffect, useMemo, useCallback)
- shadcn/ui компоненты
- Tailwind CSS для стилизации

**Примеры:**

```typescript
// Презентационный компонент
import { Button, Card, CardContent } from '@shared/ui'

export const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. Business Logic Layer

**Ответственность:**

- Бизнес-правила и валидация
- Управление состоянием приложения
- Обработка данных
- Координация между UI и Data слоями

**Технологии:**

- Custom React Hooks
- React Context (для локального состояния)
- TypeScript для типобезопасности

**Примеры:**

```typescript
// Кастомный хук для работы с данными дашборда
import { useGetDashboardMetrics } from '@shared/services/api/apiComponents'

export function useDashboardData() {
  const { data: metrics, isLoading, error } = useGetDashboardMetrics({})

  const formattedMetrics = useMemo(() => {
    if (!metrics) return []
    return metrics.map((m) => ({
      ...m,
      formattedValue: formatNumber(m.value),
    }))
  }, [metrics])

  return { metrics: formattedMetrics, isLoading, error }
}
```

### 3. Data Layer

**Ответственность:**

- Работа с API
- Кэширование данных
- Синхронизация с сервером
- Обработка ошибок запросов

**Технологии:**

- TanStack Query (useQuery, useMutation)
- @openapi-codegen для автоматической генерации хуков
- Автоматическое кэширование и инвалидация

**Примеры:**

```typescript
// Использование сгенерированных хуков из OpenAPI
import { useGetPosts, useCreatePost } from '@shared/services/api/apiComponents'

function PostsList() {
  // Query - получение данных
  const { data: posts, isLoading, error } = useGetPosts({})

  // Mutation - изменение данных
  const { mutate: createPost, isPending } = useCreatePost()

  const handleCreate = () => {
    createPost({
      body: { title: 'New Post', body: 'Content', userId: 1 }
    })
  }

  if (isLoading) return <Spinner />
  if (error) return <ErrorInfo error={error} />

  return (
    <ul>
      {posts?.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
```

## 🔄 Поток данных

### 1. Запрос данных (Query)

```
User Action → Component
    ↓
useQuery Hook (TanStack Query)
    ↓
API Request → Backend
    ↓
Cache Update
    ↓
Component Re-render → UI Update
```

### 2. Изменение данных (Mutation)

```
User Action → Component
    ↓
useMutation Hook (TanStack Query)
    ↓
API Request → Backend
    ↓
Cache Invalidation (queryClient.invalidateQueries)
    ↓
Automatic Refetch
    ↓
Component Re-render → UI Update
```

### 3. Локальное состояние (React)

```
User Action → Component
    ↓
useState / useReducer
    ↓
State Update
    ↓
Component Re-render
    ↓
UI Update
```

## 📦 Модульная структура (FSD)

### Структура модуля

```
modules/ModuleName/
├── model/            # Бизнес-логика
│   ├── types.ts      # TypeScript типы
│   └── constants.ts  # Константы модуля
├── hooks/            # Кастомные React хуки
│   └── useModule.ts  # Переиспользуемая логика
├── ui/               # UI компоненты
│   ├── Component.tsx # Компоненты модуля
│   └── styles.css    # Стили (если нужны)
└── index.ts          # Публичный API модуля
```

> **Примечание:** API хуки генерируются автоматически из OpenAPI спецификации в `src/shared/services/api/`. Для добавления новых endpoints обновите `openapi.yml` и запустите `pnpm generate:api`.

### Пример модуля Dashboard

```
modules/Dashboard/
├── model/
│   ├── types.ts           # интерфейсы Dashboard
│   └── mockData.ts        # моковые данные
├── hooks/
│   ├── useDashboardMetrics.ts
│   └── useVisitorData.ts
└── ui/
    ├── DashboardLayout/
    ├── DashboardGrid/
    ├── MetricCard/
    ├── VisitorChart/
    ├── Header/
    └── Sidebar/
```

## 🔐 Безопасность

### 1. Аутентификация

**Используемый подход:**

- Bearer Token (JWT)
- Хранение токена в памяти (не в localStorage)
- Refresh token для обновления access token

**Реализация:**

```typescript
// shared/services/api/apiFetcher.ts
// Обработка 401 ошибок происходит в axios interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Попытка обновить токен
      try {
        await refreshToken()
        // Повторить исходный запрос
        return apiClient.request(error.config)
      } catch {
        // Разлогинить пользователя
        window.location.href = '/auth/sign-in'
      }
    }
    return Promise.reject(error)
  },
)
```

### 2. Защита роутов

**Реализация:**

```typescript
// modules/Auth/components/AuthProvider/AuthProvider.tsx
export const AuthProvider = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />
  }

  return <>{children}</>
}
```

### 3. Защита от XSS

- Sanitization пользовательского ввода
- Content Security Policy (CSP)
- Использование dangerouslySetInnerHTML только в крайних случаях

## 🌐 Интернационализация (i18n)

### Структура

```
src/locales/
├── ru/
│   ├── common.json
│   ├── auth.json
│   └── dashboard.json
└── en/
    ├── common.json
    ├── auth.json
    └── dashboard.json
```

### Использование

```typescript
import { useTranslation } from 'react-i18next'

export const Component = () => {
  const { t } = useTranslation('dashboard')

  return <h1>{t('welcome')}</h1>
}
```

### Конфигурация

```typescript
// shared/config/i18n/i18n.ts
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })
```

## 🎨 Стилизация

### 1. Tailwind CSS

**Конфигурация:** `@tailwindcss/vite` плагин

**Использование:**

```typescript
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Title</h2>
</div>
```

### 2. shadcn/ui компоненты

**Преимущества:**

- Готовые компоненты с единым дизайном
- TypeScript типизация
- Accessibility из коробки
- Темизация и кастомизация

**Использование:**

```typescript
import { Button, Input, Label } from '@shared/ui'

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
<Button>Submit</Button>
```

### 3. CSS Modules (опционально)

Для специфичных стилей компонентов:

```typescript
import styles from './Component.module.css'

<div className={styles.container}>Content</div>
```

## 🧪 Тестирование

### Тестовая архитектура

```
tests/
├── unit/           # Unit тесты (компоненты, функции)
├── integration/    # Интеграционные тесты (модули)
└── setup.ts        # Настройка тестового окружения
```

### Инструменты

- **Vitest** - Тестовый раннер
- **Testing Library** - Тестирование React компонентов
- **happy-dom** - DOM имплементация

### Подход к тестированию

1. **Unit тесты** - Изолированное тестирование компонентов и функций
2. **Integration тесты** - Тестирование взаимодействия модулей
3. **Coverage** - Istanbul провайдер для отчетов о покрытии

## 📊 Производительность

### Оптимизации

1. **Code Splitting**

   - React.lazy для ленивой загрузки
   - Route-based splitting через TanStack Router
   - Dynamic imports для тяжелых библиотек

2. **Мемоизация**

   - React.memo для компонентов
   - useMemo для вычислений
   - useCallback для функций

3. **Оптимизация бандла**

   - Tree shaking (Vite)
   - Минификация (Terser)
   - Компрессия (gzip/brotli)

4. **Кэширование**
   - TanStack Query автоматическое кэширование
   - staleTime и gcTime для настройки времени жизни кэша
   - queryClient.invalidateQueries для инвалидации

## 🔌 Расширяемость

### Добавление нового модуля

1. Создать структуру в `modules/NewModule/`
2. Определить типы в `model/types.ts`
3. Добавить API endpoints в `openapi.yml` и запустить `pnpm generate:api`
4. Создать UI компоненты в `ui/`
5. Экспортировать публичное API через `index.ts`

### Добавление нового роута

1. Создать файл в `pages/new-route/index.tsx`
2. Использовать `createFileRoute`
3. TanStack Router автоматически сгенерирует типы

## 📚 Документация кода

### TypeScript типы

Все публичные API должны иметь явные типы:

```typescript
export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  revenue: number
}

export const useDashboardMetrics = (): DashboardMetrics => {
  // ...
}
```

### JSDoc комментарии

Для сложных функций:

```typescript
/**
 * Форматирует число в читаемый формат с разделителями
 * @param value - Число для форматирования
 * @param locale - Локаль (по умолчанию 'ru-RU')
 * @returns Отформатированная строка
 */
export const formatNumber = (value: number, locale = 'ru-RU'): string => {
  return new Intl.NumberFormat(locale).format(value)
}
```

## 🚀 Развертывание

Архитектура поддерживает:

- Static deployment (Nginx, CDN)
- Docker контейнеризация
- CI/CD интеграция
- Environment-specific конфигурация

Подробнее см. [DEPLOYMENT.md](./DEPLOYMENT.md)
