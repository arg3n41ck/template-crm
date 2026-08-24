# Тестирование

## 🧪 Обзор тестирования

В проекте используется многоуровневая система тестирования с акцентом на производительность и удобство разработки.

### Типы тестов

1. **Unit тесты** - Изолированное тестирование компонентов, хуков и функций
2. **Integration тесты** - Тестирование взаимодействия между модулями
3. **E2E тесты** - Тестирование полных пользовательских сценариев (опционально)

## 🛠 Инструменты и технологии

### Основной стек

- **Vitest 2.1.3** - Быстрый test runner, совместимый с Vite
- **Testing Library** - Утилиты для тестирования React компонентов
  - `@testing-library/react 16.0.1`
  - `@testing-library/dom 10.4.0`
  - `@testing-library/user-event 14.6.1`
- **@testing-library/jest-dom 6.6.2** - Кастомные matchers для DOM
- **happy-dom 15.7.4** - Легковесная и быстрая DOM имплементация
- **@vitest/coverage-istanbul 2.1.3** - Провайдер coverage

### Преимущества happy-dom

- Быстрее jsdom в 2-3 раза
- Меньше потребление памяти
- Лучшая совместимость с ES модулями
- Нативная поддержка async/await

## ⚙️ Конфигурация

### config/vite/buildTest.ts

```typescript
import { defineConfig } from 'vitest/config'

export const buildTest = () =>
  defineConfig({
    test: {
      globals: true, // Глобальные describe, it, expect
      environment: 'happy-dom', // DOM environment
      setupFiles: ['./tests/setup.ts'], // Файлы настройки
      coverage: {
        provider: 'istanbul', // Провайдер coverage
        reporter: ['text', 'json', 'html'], // Форматы отчетов
        exclude: [
          'node_modules/',
          'tests/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mockData.ts',
        ],
      },
    },
  })
```

### tests/setup.ts

```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Автоматическая очистка после каждого теста
afterEach(() => {
  cleanup()
})

// Мокирование i18next (если используется)
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: vi.fn() },
  }),
  Trans: ({ children }: any) => children,
}))
```

## 📝 Написание тестов

### 1. Unit тесты компонентов

```typescript
// modules/Dashboard/ui/MetricCard/MetricCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MetricCard } from './MetricCard'

describe('MetricCard', () => {
  it('renders metric title and value', () => {
    render(<MetricCard title="Пользователи" value={1234} />)

    expect(screen.getByText('Пользователи')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const icon = <span data-testid="icon">👤</span>
    render(<MetricCard title="Test" value={100} icon={icon} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <MetricCard title="Test" value={100} className="custom-class" />,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
```

### 2. Тестирование хуков

```typescript
// modules/Dashboard/hooks/useDashboardMetrics.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useDashboardMetrics } from './useDashboardMetrics'

// Мокирование API
vi.mock('../api/dashboardApi', () => ({
  useGetMetricsQuery: vi.fn(() => ({
    data: {
      totalUsers: 1000,
      activeUsers: 500,
      revenue: 50000,
    },
    isLoading: false,
    error: null,
  })),
}))

describe('useDashboardMetrics', () => {
  it('returns metrics data', () => {
    const { result } = renderHook(() => useDashboardMetrics())

    expect(result.current.data).toEqual({
      totalUsers: 1000,
      activeUsers: 500,
      revenue: 50000,
    })
    expect(result.current.isLoading).toBe(false)
  })

  it('handles loading state', () => {
    vi.mocked(useGetMetricsQuery).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    const { result } = renderHook(() => useDashboardMetrics())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeNull()
  })
})
```

### 3. Тестирование утилит

```typescript
// shared/libs/displaySum/displaySum.test.ts
import { describe, expect, it } from 'vitest'

import { formatNumber } from './displaySum'

describe('formatNumber', () => {
  it('formats number with separators', () => {
    expect(formatNumber(1234567)).toBe('1 234 567')
  })

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('handles negative numbers', () => {
    expect(formatNumber(-1234)).toBe('-1 234')
  })

  it('handles decimal numbers', () => {
    expect(formatNumber(1234.56)).toBe('1 234,56')
  })
})
```

### 4. Тестирование с TanStack Query

```typescript
// tests/helpers/renderWithProviders.tsx
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

export const renderWithProviders = (
  ui: React.ReactElement,
  { queryClient = createTestQueryClient(), ...renderOptions } = {},
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return { queryClient, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
```

Использование:

```typescript
import { renderWithProviders } from '@tests/helpers/renderWithProviders'

it('renders with QueryClient', () => {
  renderWithProviders(<DashboardLayout />)
  expect(screen.getByText('Dashboard')).toBeInTheDocument()
})
```

## 🔄 Тестирование TanStack Query

### Мокирование API хуков

```typescript
// modules/Dashboard/hooks/useDashboardData.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'

import * as apiComponents from '@shared/services/api/apiComponents'

describe('useDashboardData', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  it('fetches metrics successfully', async () => {
    vi.spyOn(apiComponents, 'useGetDashboardMetrics').mockReturnValue({
      data: { totalUsers: 100, activeUsers: 50 },
      isLoading: false,
      error: null,
    } as any)

    const { result } = renderHook(() => useDashboardData(), {
      wrapper: createWrapper(),
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.totalUsers).toBe(100)
  })

  it('handles API errors', async () => {
    vi.spyOn(apiComponents, 'useGetDashboardMetrics').mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Network error'),
    } as any)

    const { result } = renderHook(() => useDashboardData(), {
      wrapper: createWrapper(),
    })

    expect(result.current.error).toBeDefined()
  })
})
```

## 🎭 Тестирование взаимодействий

### User events

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('submits form with correct data', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<LoginForm onSubmit={onSubmit} />)

    // Ввод email
    await user.type(screen.getByLabelText('Email'), 'test@example.com')

    // Ввод пароля
    await user.type(screen.getByLabelText('Пароль'), 'password123')

    // Клик по кнопке
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    // Проверка вызова
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('shows validation errors', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    // Попытка submit без заполнения
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(screen.getByText('Email обязателен')).toBeInTheDocument()
    expect(screen.getByText('Пароль обязателен')).toBeInTheDocument()
  })
})
```

## 🧩 Integration тесты

### Тестирование модуля целиком

```typescript
// modules/Dashboard/Dashboard.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@tests/helpers/renderWithProviders'
import { DashboardLayout } from './ui/DashboardLayout'

// Мокирование API
vi.mock('./api/dashboardApi', () => ({
  useGetMetricsQuery: () => ({
    data: {
      totalUsers: 1000,
      activeUsers: 500,
      revenue: 50000,
    },
    isLoading: false,
  }),
  useGetVisitorDataQuery: () => ({
    data: [
      { date: '2024-01-01', visitors: 100 },
      { date: '2024-01-02', visitors: 150 },
    ],
    isLoading: false,
  }),
}))

describe('Dashboard Integration', () => {
  it('renders dashboard with all components', async () => {
    renderWithProviders(<DashboardLayout />)

    // Проверка метрик
    await waitFor(() => {
      expect(screen.getByText('1,000')).toBeInTheDocument() // totalUsers
      expect(screen.getByText('500')).toBeInTheDocument() // activeUsers
      expect(screen.getByText('50,000')).toBeInTheDocument() // revenue
    })

    // Проверка графика
    expect(screen.getByTestId('visitor-chart')).toBeInTheDocument()
  })
})
```

## 📊 Coverage (Покрытие)

### Запуск coverage

```bash
# Генерация отчета о покрытии
pnpm test:coverage

# Открыть HTML отчет
open coverage/index.html
```

### Минимальные требования (рекомендуется)

```typescript
// vitest.config.ts
coverage: {
  provider: 'istanbul',
  reporter: ['text', 'json', 'html'],
  lines: 80,        // 80% покрытие строк
  functions: 80,    // 80% покрытие функций
  branches: 75,     // 75% покрытие ветвлений
  statements: 80,   // 80% покрытие выражений
}
```

### Исключения из coverage

```typescript
coverage: {
  exclude: [
    'node_modules/',
    'tests/',
    '**/*.d.ts',
    '**/*.config.*',
    '**/mockData.ts',
    '**/index.ts', // Файлы реэкспорта
    '**/*.stories.tsx', // Storybook stories
  ]
}
```

## 🎯 Best Practices

### 1. Тестируйте поведение, не реализацию

❌ Плохо:

```typescript
expect(component.state.count).toBe(1) // Тестирование внутреннего состояния
```

✅ Хорошо:

```typescript
expect(screen.getByText('Count: 1')).toBeInTheDocument() // Тестирование вывода
```

### 2. Используйте значимые описания

❌ Плохо:

```typescript
it('test 1', () => {})
it('works', () => {})
```

✅ Хорошо:

```typescript
it('renders user name when data is loaded', () => {})
it('shows error message when API fails', () => {})
```

### 3. Arrange-Act-Assert паттерн

```typescript
it('increments counter on button click', async () => {
  // Arrange - подготовка
  const user = userEvent.setup()
  render(<Counter />)

  // Act - действие
  await user.click(screen.getByRole('button', { name: 'Increment' }))

  // Assert - проверка
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

### 4. Изолируйте тесты

Каждый тест должен быть независимым:

```typescript
describe('Counter', () => {
  beforeEach(() => {
    // Сброс состояния перед каждым тестом
    vi.clearAllMocks()
  })

  it('test 1', () => {
    // Независимый тест
  })

  it('test 2', () => {
    // Не зависит от test 1
  })
})
```

### 5. Мокируйте внешние зависимости

```typescript
// Мокирование API
vi.mock('@shared/api/client/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

// Мокирование модуля
vi.mock('dayjs', () => ({
  default: vi.fn(() => ({
    format: () => '2024-01-01',
  })),
}))
```

### 6. Используйте data-testid для сложных селекторов

```typescript
// Component
<div data-testid="user-card">...</div>

// Test
const userCard = screen.getByTestId('user-card')
```

### 7. Асинхронное тестирование

```typescript
it('loads data asynchronously', async () => {
  render(<AsyncComponent />)

  // Ждем появления элемента
  const data = await screen.findByText('Data loaded')
  expect(data).toBeInTheDocument()

  // Или используйте waitFor
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

## 🚀 Запуск тестов

### Основные команды

```bash
# Запустить все тесты
pnpm test:vitest

# Запустить с coverage
pnpm test:coverage

# Запустить в watch mode
pnpm test:watch

# Запустить UI для тестов
pnpm test:ui

# Запустить конкретный файл
pnpm test:vitest src/modules/Dashboard/Dashboard.test.tsx
```

### Watch mode

В watch режиме доступны команды:

- `a` - Запустить все тесты
- `f` - Запустить только упавшие тесты
- `p` - Фильтр по имени файла
- `t` - Фильтр по имени теста
- `q` - Выход

## 🔍 Отладка тестов

### 1. Debug в VSCode

`.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test:vitest", "--run", "${file}"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### 2. Использование screen.debug()

```typescript
it('debug test', () => {
  render(<Component />)

  // Вывести весь DOM
  screen.debug()

  // Вывести конкретный элемент
  screen.debug(screen.getByTestId('element'))
})
```

### 3. Логирование

```typescript
it('test with logs', () => {
  console.log('Before render')
  render(<Component />)
  console.log('After render')

  const element = screen.getByText('Hello')
  console.log('Found element:', element)
})
```

## 📚 Дополнительные ресурсы

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [happy-dom](https://github.com/capricorn86/happy-dom)
- [Common mistakes with Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 📋 Checklist перед коммитом

- [ ] Все тесты проходят (`pnpm test:vitest`)
- [ ] Coverage не упал ниже порога
- [ ] Добавлены тесты для новой функциональности
- [ ] Обновлены тесты для измененной функциональности
- [ ] Тесты не зависят друг от друга
- [ ] Нет console.log в тестах (кроме отладки)
- [ ] Используются правильные matchers (toBeInTheDocument, toHaveValue, etc)
