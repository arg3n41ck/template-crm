# Процесс разработки

## 🚀 Начало работы

### Требования к окружению

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**
- **VSCode** (рекомендуется) с расширениями:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense

### Первый запуск

1. **Клонирование репозитория**

```bash
git clone <repository-url>
cd spa-module
```

2. **Установка зависимостей**

```bash
# pnpm установится автоматически при первом запуске (preinstall hook)
pnpm install
```

3. **Настройка переменных окружения**

```bash
# Создайте .env файл (если нужно)
cp .env.example .env

# Отредактируйте переменные
nano .env
```

4. **Запуск dev-сервера**

```bash
pnpm dev
```

Приложение откроется на `http://localhost:5173`

## 📝 Рабочий процесс

### 1. Создание новой ветки

```bash
# Создание feature ветки
git checkout -b feature/new-feature

# Создание fix ветки
git checkout -b fix/bug-description
```

### 2. Разработка фичи

#### Создание нового модуля

```bash
# Структура нового модуля
mkdir -p src/modules/NewModule/{model,hooks,ui,components}
```

**Файловая структура:**

```
src/modules/NewModule/
├── model/
│   ├── types.ts              # TypeScript типы
│   └── constants.ts          # Константы
├── hooks/
│   └── useNewModule.ts       # Кастомные хуки
├── components/               # Сложные компоненты с логикой
│   └── ComplexComponent/
│       ├── ComplexComponent.tsx
│       └── index.ts
├── ui/                       # Презентационные компоненты
│   └── SimpleComponent/
│       ├── SimpleComponent.tsx
│       └── index.ts
└── index.ts                  # Публичный API модуля
```

**Добавление API endpoints:**

1. Добавьте endpoints в `openapi.yml`:

```yaml
# openapi.yml
paths:
  /new-module:
    get:
      operationId: getNewModuleList
      summary: Get list of new module items
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/NewModuleData'
    post:
      operationId: createNewModule
      summary: Create new module item
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewModuleData'
      responses:
        '201':
          description: Created

components:
  schemas:
    NewModuleData:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        createdAt:
          type: string
      required:
        - id
        - name
```

2. Запустите генерацию:

```bash
pnpm generate:api
```

3. Используйте сгенерированные хуки:

```typescript
// src/modules/NewModule/ui/NewModuleList.tsx
import { useGetNewModuleList, useCreateNewModule } from '@shared/services/api/apiComponents'

export function NewModuleList() {
  const { data, isLoading, error } = useGetNewModuleList({})
  const { mutate: create, isPending } = useCreateNewModule()

  if (isLoading) return <Spinner />
  if (error) return <ErrorInfo error={error} />

  return (
    <ul>
      {data?.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}

// src/modules/NewModule/index.ts
export { NewModuleList } from './ui/NewModuleList'
```

#### Создание нового роута

```typescript
// src/pages/new-route/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-route/')({
  component: NewRoutePage,
})

function NewRoutePage() {
  return (
    <div>
      <h1>Новая страница</h1>
    </div>
  )
}
```

#### Создание компонента

```typescript
// src/shared/ui/NewComponent/NewComponent.tsx
import { cn } from '@shared/libs'
import type { FC } from 'react'

interface NewComponentProps {
  title: string
  className?: string
}

export const NewComponent: FC<NewComponentProps> = ({ title, className }) => {
  return (
    <div className={cn('p-4 bg-white rounded-lg', className)}>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}

// src/shared/ui/NewComponent/index.ts
export { NewComponent } from './NewComponent'
```

### 3. Тестирование

```bash
# Запустить все тесты
pnpm test:vitest

# Запустить в watch mode
pnpm test:watch

# Запустить с coverage
pnpm test:coverage

# Запустить UI для тестов
pnpm test:ui
```

**Написание теста:**

```typescript
// src/shared/ui/NewComponent/NewComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NewComponent } from './NewComponent'

describe('NewComponent', () => {
  it('renders title correctly', () => {
    render(<NewComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

### 4. Линтинг и форматирование

```bash
# Полная проверка (линтинг + типы + форматирование)
pnpm lint

# Только ESLint
pnpm lint:eslint

# Автоисправление ESLint
pnpm eslint:fix

# Проверка форматирования
pnpm lint:prettier

# Форматирование кода
pnpm prettier

# Проверка типов TypeScript
pnpm lint:type
```

### 5. Коммит изменений

```bash
# Добавить файлы
git add .

# Коммит с conventional commits
git commit -m "feat: add new module"
git commit -m "fix: resolve bug in component"
git commit -m "docs: update documentation"
git commit -m "refactor: improve code structure"
git commit -m "test: add tests for component"
```

**Husky pre-commit hook** автоматически запустит:

- Линтинг
- Форматирование
- Проверку типов

### 6. Создание Pull Request

```bash
# Отправить ветку
git push origin feature/new-feature

# Создать PR через GitHub/GitLab UI
```

## 🛠 Инструменты разработки

### Vite Dev Server

**Конфигурация:** `config/vite/buildServer.ts`

```typescript
server: {
  port: 5173,
  host: true,
  open: true, // Автоматически открывает браузер
  hmr: true,  // Hot Module Replacement
}
```

**Возможности:**

- ⚡️ Мгновенный HMR (Hot Module Replacement)
- 🔄 Автоматическая перезагрузка при изменениях
- 📱 Доступ с мобильных устройств в локальной сети
- 🔍 Детальные сообщения об ошибках

### React DevTools

Установите расширение для браузера:

- [React DevTools Chrome](https://chrome.google.com/webstore/detail/react-developer-tools)
- [React DevTools Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)

### TanStack Query Devtools

В development режиме devtools включены автоматически:

```typescript
// app/providers/QueryProvider/ui/QueryProvider.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  {children}
  {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
</QueryClientProvider>
```

**Использование:**

- Просмотр всех queries и mutations
- Состояние кэша
- Инвалидация и refetch
- Time debugging

### TanStack Router Devtools

Devtools для роутера включены автоматически в development режиме:

```typescript
// app/App.tsx
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

<RouterProvider router={router}>
  {import.meta.env.DEV && <TanStackRouterDevtools router={router} />}
</RouterProvider>
```

### Vite Plugin Inspect

Инспектор плагинов Vite: `http://localhost:5173/__inspect/`

Позволяет увидеть:

- Трансформации модулей
- Работу плагинов
- Граф зависимостей

## 🎨 Стилизация

### Tailwind CSS

**IntelliSense для VSCode:**

Установите расширение "Tailwind CSS IntelliSense"

**.vscode/settings.json:**

```json
{
  "tailwindCSS.experimental.classRegex": [["cn\\(([^)]*)\\)", "\"([^\"]*)\""]]
}
```

**Использование:**

```typescript
import { cn } from '@shared/libs'

// Базовое использование
<div className="flex items-center gap-4" />

// С условиями
<div className={cn('base-class', isActive && 'active-class')} />

// С динамическими значениями
<div className={cn('p-4', size === 'large' ? 'text-xl' : 'text-base')} />
```

### shadcn/ui компоненты

```typescript
import { Button, Card, CardContent, Input, Label } from '@shared/ui'

function MyComponent() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="example@mail.com" />
        <Button>Отправить</Button>
      </CardContent>
    </Card>
  )
}
```

Используйте semantic tokens и правила из `readme/DESIGN_SYSTEM.md`.

## 🔧 Отладка

### 1. Console Logging

```typescript
// В development
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}

// Логирование только в конкретных условиях
console.log('User:', user) // Автоматически удалится в production (Terser)
```

### 2. Debugger

```typescript
function debugFunction() {
  const data = fetchData()

  debugger // Остановка выполнения для отладки

  return processData(data)
}
```

### 3. React DevTools Profiler

Используйте Profiler для анализа производительности:

```typescript
import { Profiler } from 'react'

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`${id} took ${actualDuration}ms`)
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

### 4. Network Debugging

**TanStack Query Devtools:**

- Просмотр всех API запросов
- Состояние кэша
- Инвалидация и refetch

**Browser DevTools:**

- Network tab для анализа запросов
- Проверка headers, payload, response

## 📊 Производительность

### 1. Code Splitting

```typescript
// Ленивая загрузка модуля
const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  )
}
```

### 2. Мемоизация

```typescript
import { memo, useMemo, useCallback } from 'react'

// Мемоизация компонента
export const ExpensiveComponent = memo(({ data }) => {
  // ...
})

// Мемоизация вычислений
function Component({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value)
  }, [items])

  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])

  return <div>...</div>
}
```

### 3. Виртуализация списков

Для длинных списков используйте виртуализацию:

```typescript
import { VirtualList } from 'some-virtualization-library'

function LongList({ items }) {
  return (
    <VirtualList
      items={items}
      itemHeight={50}
      renderItem={(item) => <ItemComponent key={item.id} item={item} />}
    />
  )
}
```

## 🔍 Анализ кода

### 1. Дублирование кода (jscpd)

```bash
# Проверка дублирования
pnpm jscpd

# Результаты в консоли
# Дублированный код будет выделен
```

### 2. Размер бандла

```bash
# Сборка с визуализацией
pnpm build

# Открыть stats.html
open dist/stats.html
```

### 3. TypeScript Strict Mode

Проект использует строгий режим TypeScript:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 📝 Best Practices

### 1. Именование

**Файлы:**

- Компоненты: `PascalCase.tsx` (Button.tsx)
- Утилиты: `camelCase.ts` (formatDate.ts)
- Константы: `UPPER_SNAKE_CASE.ts` (API_ENDPOINTS.ts)

**Переменные:**

- camelCase для переменных и функций
- PascalCase для компонентов и классов
- UPPER_SNAKE_CASE для констант

```typescript
// ✅ Хорошо
const userName = 'John'
const UserCard = () => <div />
const API_URL = 'https://api.example.com'

// ❌ Плохо
const user_name = 'John'
const userCard = () => <div />
const apiUrl = 'https://api.example.com'
```

### 2. Структура компонентов

```typescript
// ✅ Хорошо: Props типизированы, компонент читаемый
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn('btn', `btn-${variant}`)}
    >
      {label}
    </button>
  )
}

// ❌ Плохо: Props не типизированы, хардкод значений
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### 3. Хуки

```typescript
// ✅ Хорошо: Логика в кастомном хуке
function useUserData(userId: string) {
  const { data, isLoading, error } = useGetUserQuery(userId)

  const formattedData = useMemo(() => {
    if (!data) return null
    return {
      ...data,
      fullName: `${data.firstName} ${data.lastName}`,
    }
  }, [data])

  return { data: formattedData, isLoading, error }
}

// ❌ Плохо: Логика в компоненте
function UserCard({ userId }) {
  const { data } = useGetUserQuery(userId)
  const fullName = data ? `${data.firstName} ${data.lastName}` : ''
  // ...
}
```

### 4. Обработка ошибок

```typescript
// ✅ Хорошо: Централизованная обработка ошибок
function Component() {
  const { data, error, isLoading } = useGetDataQuery()

  if (isLoading) return <Spinner />
  if (error) return <ErrorInfo error={error} />
  if (!data) return <EmptyState />

  return <Content data={data} />
}

// ❌ Плохо: Игнорирование ошибок
function Component() {
  const { data } = useGetDataQuery()
  return <Content data={data} />
}
```

### 5. Типизация

```typescript
// ✅ Хорошо: Явные типы
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  return apiClient.get(`/users/${id}`)
}

// ❌ Плохо: any или без типов
function getUser(id) {
  return apiClient.get(`/users/${id}`)
}
```

## 📚 Дополнительные ресурсы

### Документация

- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [OpenAPI Codegen](https://github.com/fabien0102/openapi-codegen)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Паттерны проектирования

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Patterns](https://reactpatterns.com/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

## 🆘 Получение помощи

### Частые проблемы

**1. Ошибка при установке зависимостей:**

```bash
# Очистка кэша pnpm
pnpm store prune

# Удаление node_modules и переустановка
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**2. TypeScript ошибки:**

```bash
# Перезапуск TypeScript сервера в VSCode
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"

# Проверка типов
pnpm lint:type
```

**3. HMR не работает:**

```bash
# Перезапустить dev сервер
# Ctrl + C, затем pnpm dev
```

### Где спросить

- Внутренний чат команды
- GitHub Issues (для багов)
- GitHub Discussions (для вопросов)
- Code Review в Pull Requests
