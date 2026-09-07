# Шаблон Frontend CRM

Готовая основа React SPA для CRM и dashboard-проектов.

## Стек

- React 18 + TypeScript 5.7 + Vite 6
- TanStack Router + TanStack Query
- Tailwind CSS v4 + shadcn/ui (`new-york`)
- Radix UI + иконки Lucide + Sonner
- Axios + генерация OpenAPI
- Vitest + Storybook + ESLint + Prettier

## Требования

Node.js 22.18+ (или 24+) и pnpm 11.21 через Corepack.

## Запуск

```bash
pnpm install
pnpm dev
```

Dev-сервер: `http://localhost:3000`.

## Команды

```bash
pnpm lint:type        # TypeScript
pnpm lint:eslint      # ESLint
pnpm lint:prettier    # проверка форматирования
pnpm test:vitest      # тесты
pnpm build            # production-сборка
pnpm generate:api     # обновить типы/hooks API
pnpm storybook        # каталог компонентов
```

## Структура

```text
src/app/                       providers и router приложения
src/pages/                     тонкие файловые маршруты TanStack
src/modules/                   доменные функции
src/shared/ui/shadcn/          примитивы shadcn
src/shared/ui/                 переиспользуемые композиции
src/shared/hooks/              переиспользуемые hooks
src/shared/libs/               утилиты
src/shared/services/api/       API-клиент и сгенерированные контракты
src/shared/config/styles/      theme tokens и глобальный CSS
.ai/skills/                    канонические project skills
```

## shadcn/ui

Конфигурация — в `components.json`. Добавление примитива:

```bash
pnpm dlx shadcn@latest add dialog
```

Разрешённые компоненты импортируйте через `@shared/ui`, утилиты — через `@shared/libs`. Используйте семантические theme tokens, а не raw colors. Полные правила UI/UX: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## Контекст агента

- Правила: `AGENTS.md`, `CLAUDE.md`
- Техническая карта: `.codex-harness/AGENT_GRAPH.md`
- Проверки: `.codex-harness/VERIFICATION.md`
- Инвентарь skills: `docs/AI_SKILLS.md`

Project skills хранятся один раз в `.ai/skills/`; `.claude/skills` и `.codex/skills` содержат portable forwarding files.

## Работа с ИИ

Начните с `AGENTS.md`, затем изучите `docs/AI_SKILLS.md` и `docs/ARCHITECTURE.md`. Skills уже находятся в репозитории и загружаются по задаче — это не фоновые агенты и не требуют миграции стека или дополнительных зависимостей.

## Сначала ИИ, но проект понятен человеку

Любой coding agent начинает с [AGENTS.md](AGENTS.md); plugin конкретного провайдера не нужен. [Workflow](.ai/WORKFLOW.md) выбирает задачу, учитывает побочные эффекты, проверяет результат и хранит только нужный контекст. Человек использует обычную архитектуру и package-команды: AI runtime для запуска приложения не требуется.

```bash
node .ai/context.mjs --list
node .ai/context.mjs --task ui --risk shared-ui
node .ai/context.mjs --check
```

Это read-only помощники контекста и целостности: они не вызывают модель и не устанавливают пакеты. Skills загружаются по необходимости; wiki и Graphify отвечают за разные виды знаний. Недоступный browser/graph runtime обозначается как непроверенный, а не как успешная проверка.

Текущая локальная проверка и ограничения релиза: [отчёт](docs/VERIFICATION_STATUS.md). Опциональная настройка локального графа: [Graphify](docs/GRAPHIFY.md).

## Фильтры и новые AI-проверки

Всего **42 skills**, загружаются по задаче, не все сразу. Полный состав — [AI_SKILLS](docs/AI_SKILLS.md). Правила search params, истории, пагинации, запросов и приватности — [URL_STATE](docs/URL_STATE.md). CRM сохраняет TanStack Router; второй URL-state механизм не устанавливается.

## Подготовка к выпуску

Актуальные проверки и ограничения — [VERIFICATION_STATUS](docs/VERIFICATION_STATUS.md). Локальные env/runtime/test-артефакты исключены из Git; `.env.example` разрешён. Версия шаблона: **v0.3.0**.

## Проверка dev-инструментов

Vitest/coverage/UI — 4.1.11, Happy DOM — 20.14.0, Storybook — 10.6.0. React остаётся 18; типы React выровнены с runtime.

Перед выпуском: `pnpm audit`, `pnpm peers check`, `pnpm verify`, `pnpm test:coverage`, `pnpm build:storybook`. Эти проверки включены в CI; полный audit теперь проверяет и dev-зависимости.
