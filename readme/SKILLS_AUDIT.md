# Аудит skills для SPA CRM template

Источник аудита: `ruflo-powers/.ai/skills` на 2026-08-24. Найдено **88 каталогов**, из них **87 с `SKILL.md`**; `dual-mode` неполный. Побайтовых дублей `SKILL.md` и повторяющихся `name` во frontmatter не обнаружено, но есть сильное функциональное пересечение.

## Решение

В SPA-шаблон перенесён минимальный набор из **8 навыков**:

| Skill                            | Роль в проекте                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `find-skills`                    | Ищет готовый skill до создания нового или копирования всей библиотеки.          |
| `ui-ux-pro-max`                  | База UI/UX-паттернов, стилей, цветов, типографики и UX-проверок.                |
| `design-system-steward`          | Контролирует токены, варианты компонентов и целостность design system.          |
| `frontend-design`                | Помогает проектировать выразительный production UI без шаблонного «AI-дизайна». |
| `frontend-agent`                 | Основные React/TypeScript/FSD правила реализации.                               |
| `frontend-error-ux`              | Loading, empty, error, offline и recovery UX.                                   |
| `typescript-react-routing`       | Типобезопасные маршруты, layout, params и URL search state.                     |
| `verification-before-completion` | Запрещает заявлять готовность без свежей проверки.                              |

Каноническое хранение — `.ai/skills/`. `.claude/skills` и `.codex/skills` являются ссылками на него, поэтому три физических копии не создаются.

## Пересечения и что выбрать

- **`frontend-agent` vs `react-19-frontend-agent` / `react-19-patterns`:** оставить `frontend-agent`, потому что шаблон на React 18. React 19 skills подключать только после обновления runtime.
- **`frontend-design` + `ui-ux-pro-max` + `design-system-steward`:** не дубли; первый отвечает за визуальное решение, второй — за паттерны/исследование, третий — за системность токенов и компонентов.
- **`verification-before-completion` vs `verification-quality` / `behaviour-harness`:** локально оставить первый; `behaviour-harness` применять глобально для сложных поведенческих изменений. `verification-quality` имеет слабый frontmatter.
- **`build-graph`, `explore-codebase`, `debug-issue`, `refactor-safely`, `review-*`:** завязаны на старый graph/review workflow. Не переносить; использовать актуальный Codebase Memory MCP и локальную `.codex-harness` карту.
- **`code-reviewer`, `github-code-review`, `review-pr`, `requesting-code-review`:** пересекаются. Для этого GitLab-проекта использовать общий GitLab review workflow, GitHub-specific skills не копировать.
- **Backend family:** `backend-engineering`, `backend-patterns`, `backend-framework-patterns` пересекаются; все исключены из чистого SPA template. Выбирать один стековый skill только в fullstack/backend template.
- **`skill-builder` vs `writing-skills`:** нужны авторам skills, а не приложению. Держать глобально.
- **`prompt-refiner`, `using-superpowers`, `best-powers`:** слишком широкие обязательные bootstrap-правила; увеличивают контекст и конфликтуют с локальным `AGENTS.md`.
- **AgentDB / Flow Nexus / swarm / Frontend v3:** инфраструктурные навыки конкретного рантайма, не часть CRM-продукта.
- **`sidecar-docs`:** создаёт документацию рядом с каждым исходником и резко увеличивает мусор; не переносить.

## Полный каталог

| Skill                               | Назначение                                                                                                                                         | Решение для SPA           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `agentdb-advanced`                  | Master advanced AgentDB features including QUIC synchronization, multi-database management, custom distance metrics, hybrid search, and distri…    | Не нужен SPA-шаблону      |
| `agentdb-learning`                  | Create and train AI learning plugins with AgentDB's 9 reinforcement learning algorithms.                                                           | Не нужен SPA-шаблону      |
| `agentdb-memory-patterns`           | Implement persistent memory patterns for AI agents using AgentDB.                                                                                  | Не нужен SPA-шаблону      |
| `agentdb-optimization`              | Optimize AgentDB performance with quantization (4-32x memory reduction), HNSW indexing (150x faster search), caching, and batch operations.        | Не нужен SPA-шаблону      |
| `agentdb-vector-search`             | Implement semantic vector search with AgentDB for intelligent document retrieval, similarity matching, and context-aware querying.                 | Не нужен SPA-шаблону      |
| `backend-api-contracts`             | Use when designing, implementing, documenting, or reviewing backend API contracts including REST resources, HTTP methods, status codes, OpenAP…    | Не нужен SPA-шаблону      |
| `backend-code-review`               | Use when reviewing backend code, pull requests, pending changes, API handlers, services, repositories, migrations, workers, auth flows, perfor…    | Не нужен SPA-шаблону      |
| `backend-data-persistence`          | Use when designing database schemas, writing migrations, choosing indexes, optimizing queries, reading EXPLAIN plans, handling transactions, c…    | Не нужен SPA-шаблону      |
| `backend-django`                    | Use when designing, implementing, debugging, or reviewing Django or Django REST Framework backend code including models, migrations, managers,…    | Не нужен SPA-шаблону      |
| `backend-engineering`               | Use when designing or changing backend systems, services, APIs, workers, data flows, scaling strategies, or cross-cutting backend architecture…    | Не нужен SPA-шаблону      |
| `backend-fastapi`                   | Use when designing, implementing, debugging, or reviewing FastAPI backend routes, async endpoints, Pydantic v2 schemas, SQLAlchemy or SQLModel…    | Не нужен SPA-шаблону      |
| `backend-framework-patterns`        | Use when implementing or refactoring backend routes, controllers, services, middleware, validation, dependency injection, error handling, or p…    | Не нужен SPA-шаблону      |
| `backend-golang`                    | Use when designing, implementing, debugging, or reviewing Go/Golang backend services, REST or gRPC APIs, Gin/Echo/Fiber/Chi handlers, GORM/sql…    | Не нужен SPA-шаблону      |
| `backend-patterns`                  | Backend architecture patterns, API design, database optimization, and server-side best practices for Node.js, Express, and Next.js API routes.     | Не нужен SPA-шаблону      |
| `backend-performance-scaling`       | Use when investigating or reviewing backend latency, throughput, p95/p99, hot paths, caching, queue throughput, backpressure, fan-out, payload…    | Не нужен SPA-шаблону      |
| `backend-reliability-observability` | Use when adding or reviewing backend logging, metrics, tracing, health checks, SLI/SLOs, alerts, runbooks, retries, timeouts, circuit breakers…    | Не нужен SPA-шаблону      |
| `backend-security-auth`             | Use when implementing, reviewing, or hardening backend authentication, authorization, sessions, JWT/OAuth/OIDC flows, API keys, secrets, input…    | Не нужен SPA-шаблону      |
| `behaviour-harness`                 | Verify functional correctness of a change — the behaviour harness.                                                                                 | Глобально/по запросу      |
| `best-powers`                       | Bootstrap any folder with the full Frontend / Claude Code "best powers".                                                                           | Не нужен SPA-шаблону      |
| `brainstorming`                     | You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior.                  | Глобально/по запросу      |
| `browser`                           | Web browser automation with AI-optimized snapshots for claude-flow agents                                                                          | Не нужен SPA-шаблону      |
| `build-graph`                       | Build or update the code review knowledge graph.                                                                                                   | Не переносить / исправить |
| `code-reviewer`                     | Общий code review и координация ревьюеров.                                                                                                         | Не нужен SPA-шаблону      |
| `debug-issue`                       | Systematically debug issues using graph-powered code navigation                                                                                    | Не переносить / исправить |
| `design-system-steward`             | Use when creating, auditing, updating, or enforcing a project design system for web frontends or mobile apps, especially docs/frontend/design.…    | Перенесён                 |
| `dispatching-parallel-agents`       | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies                                         | Глобально/по запросу      |
| `dual-mode`                         | Нет SKILL.md; каталог неполный и неработоспособный.                                                                                                | Не переносить / исправить |
| `executing-plans`                   | Use when you have a written implementation plan to execute in a separate session with review checkpoints                                           | Глобально/по запросу      |
| `explore-codebase`                  | Navigate and understand codebase structure using the knowledge graph                                                                               | Не переносить / исправить |
| `feature-architecture`              | Discuss and design the architecture BEFORE building a new feature, and draw it as diagrams.                                                        | Глобально/по запросу      |
| `find-skills`                       | Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can..…    | Перенесён                 |
| `finishing-a-development-branch`    | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work…     | Глобально/по запросу      |
| `flow-nexus-neural`                 | Train and deploy neural networks in distributed E2B sandboxes with Flow Nexus                                                                      | Не нужен SPA-шаблону      |
| `flow-nexus-platform`               | Операции и автоматизация платформы Flow Nexus.                                                                                                     | Не нужен SPA-шаблону      |
| `flow-nexus-swarm`                  | Cloud-based AI swarm deployment and event-driven workflow automation with Flow Nexus platform                                                      | Не нужен SPA-шаблону      |
| `frontend-agent`                    | Use when creating, editing, reviewing, planning, or refactoring frontend applications, React/Next.js apps, routes, modules, UI components, das…    | Перенесён                 |
| `frontend-design`                   | Create distinctive, production-grade frontend interfaces with high design quality.                                                                 | Перенесён                 |
| `frontend-error-ux`                 | Use when initializing, creating, reviewing, or fixing frontend projects and user-facing failure states: required startup audits for 404 pages,…    | Перенесён                 |
| `github-code-review`                | Comprehensive GitHub code review with AI-powered swarm coordination                                                                                | Не нужен SPA-шаблону      |
| `github-multi-repo`                 | Координация задач между GitHub-репозиториями.                                                                                                      | Не нужен SPA-шаблону      |
| `github-project-management`         | Управление GitHub Projects и задачами.                                                                                                             | Не нужен SPA-шаблону      |
| `github-release-management`         | Подготовка и управление GitHub-релизами.                                                                                                           | Не нужен SPA-шаблону      |
| `github-workflow-automation`        | Автоматизация GitHub Actions/workflows.                                                                                                            | Не нужен SPA-шаблону      |
| `graphify`                          | Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where…     | Не переносить / исправить |
| `hooks-automation`                  | Automated coordination, formatting, and learning from Claude Code operations using intelligent hooks with MCP integration.                         | Не нужен SPA-шаблону      |
| `nextjs-app-router-practices`       | Use when creating, editing, reviewing, or deciding on Next.js App Router projects, SSR, SSG, Server Components, Client Components, route group…    | Не нужен SPA-шаблону      |
| `pair-programming`                  | AI-assisted pair programming with multiple modes (driver/navigator/switch), real-time verification, quality monitoring, and comprehensive test…    | Глобально/по запросу      |
| `project-documentation-wiki`        | Use when starting project work, changing code/config/docs, creating or updating living project documentation, feature docs, architecture docs,…    | Глобально/по запросу      |
| `project-kickoff`                   | MANDATORY first step whenever a NEW project, app, service, epic, major feature, or greenfield codebase begins.                                     | Глобально/по запросу      |
| `prompt-refiner`                    | Mandatory prompt clarification and task-shaping workflow.                                                                                          | Не нужен SPA-шаблону      |
| `react-19-frontend-agent`           | Use when creating, editing, reviewing, or planning React 19 frontend applications, routes, screens, dashboards, UI sections, component archite…    | Не нужен SPA-шаблону      |
| `react-19-patterns`                 | Use when writing, refactoring, or reviewing React 19 components, hooks, state logic, forms, async UI, Suspense boundaries, performance behavio…    | Не нужен SPA-шаблону      |
| `reasoningbank-agentdb`             | Implement ReasoningBank adaptive learning with AgentDB's 150x faster vector database.                                                              | Не нужен SPA-шаблону      |
| `reasoningbank-intelligence`        | Implement adaptive learning with ReasoningBank for pattern recognition, strategy optimization, and continuous improvement.                         | Не нужен SPA-шаблону      |
| `receiving-code-review`             | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - r…    | Глобально/по запросу      |
| `refactor-safely`                   | Plan and execute safe refactoring using dependency analysis                                                                                        | Не переносить / исправить |
| `requesting-code-review`            | Use when completing tasks, implementing major features, or before merging to verify work meets requirements                                        | Глобально/по запросу      |
| `review-changes`                    | Perform a structured code review using change detection and impact                                                                                 | Не переносить / исправить |
| `review-delta`                      | Review only changes since last commit using impact analysis.                                                                                       | Не переносить / исправить |
| `review-pr`                         | Review a PR or branch diff using the knowledge graph for full structural context.                                                                  | Не переносить / исправить |
| `template-bootstrap`                | Initialize and activate the Frontend multi-agent runtime in this project.                                                                          | Не нужен SPA-шаблону      |
| `sidecar-docs`                      | Keep an AI-facing sidecar .md next to every code file and detailed intent comments in the code.                                                    | Не переносить / исправить |
| `skill-builder`                     | Create new Claude Code Skills with proper YAML frontmatter, progressive disclosure structure, and complete directory organization.                 | Не нужен SPA-шаблону      |
| `sparc-methodology`                 | SPARC-процесс декомпозиции и разработки.                                                                                                           | Не нужен SPA-шаблону      |
| `stream-chain`                      | Stream-JSON chaining for multi-agent pipelines, data transformation, and sequential workflows                                                      | Не нужен SPA-шаблону      |
| `subagent-driven-development`       | Use when executing implementation plans with independent tasks in the current session                                                              | Не нужен SPA-шаблону      |
| `swarm-advanced`                    | Продвинутая координация swarm-агентов.                                                                                                             | Не нужен SPA-шаблону      |
| `swarm-orchestration`               | Orchestrate multi-agent swarms with agentic-flow for parallel task execution, dynamic topology, and intelligent coordination.                      | Не нужен SPA-шаблону      |
| `swarm-run`                         | Run a real, VISIBLE multi-agent swarm for a task by orchestrating it through the built-in ultracode Workflow tool, while using template (claude-f… | Не нужен SPA-шаблону      |
| `systematic-debugging`              | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes                                                        | Глобально/по запросу      |
| `test-driven-development`           | Use when implementing any feature or bugfix, before writing implementation code                                                                    | Глобально/по запросу      |
| `typescript-react-routing`          | Use when adding or changing React routes, page sections, navigation, route params, URL search state, route layouts, router setup, lazy route m…    | Перенесён                 |
| `ui-ux-pro-max`                     | UI/UX design intelligence for web and mobile.                                                                                                      | Перенесён                 |
| `using-git-worktrees`               | Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated work…    | Глобально/по запросу      |
| `using-superpowers`                 | Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including cla…    | Не нужен SPA-шаблону      |
| `v3-cli-modernization`              | CLI modernization and hooks system enhancement for claude-flow v3.                                                                                 | Не нужен SPA-шаблону      |
| `v3-core-implementation`            | Core module implementation for claude-flow v3.                                                                                                     | Не нужен SPA-шаблону      |
| `v3-ddd-architecture`               | Domain-Driven Design architecture for claude-flow v3.                                                                                              | Не нужен SPA-шаблону      |
| `v3-integration-deep`               | Deep agentic-flow@alpha integration implementing ADR-001.                                                                                          | Не нужен SPA-шаблону      |
| `v3-mcp-optimization`               | MCP server optimization and transport layer enhancement for claude-flow v3.                                                                        | Не нужен SPA-шаблону      |
| `v3-memory-unification`             | Unify 6+ memory systems into AgentDB with HNSW indexing for 150x-12,500x search improvements.                                                      | Не нужен SPA-шаблону      |
| `v3-performance-optimization`       | Achieve aggressive v3 performance targets: 2.49x-7.47x Flash Attention speedup, 150x-12,500x search improvements, 50-75% memory reduction.         | Не нужен SPA-шаблону      |
| `v3-security-overhaul`              | Complete security architecture overhaul for claude-flow v3.                                                                                        | Не нужен SPA-шаблону      |
| `v3-swarm-coordination`             | 15-agent hierarchical mesh coordination for v3 implementation.                                                                                     | Не нужен SPA-шаблону      |
| `verification-before-completion`    | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and co…    | Перенесён                 |
| `verification-quality`              | Расширенная оценка качества и полноты проверки.                                                                                                    | Не нужен SPA-шаблону      |
| `writing-plans`                     | Use when you have a spec or requirements for a multi-step task, before touching code                                                               | Глобально/по запросу      |
| `writing-skills`                    | Use when creating new skills, editing existing skills, or verifying skills work before deployment                                                  | Не нужен SPA-шаблону      |

## Что исправить в исходной библиотеке

1. Удалить или восстановить `dual-mode`: отсутствует `SKILL.md`.
2. Исправить пустой/многострочный `description: |` у `code-reviewer`, `flow-nexus-platform`, GitHub workflow skills, `sparc-methodology`, `swarm-advanced`, `verification-quality`.
3. Разделить библиотеку на профили: `frontend-spa`, `frontend-next`, `backend`, `agent-runtime`, `github` — вместо установки всех 87 skills.
4. Пометить graph-based skills deprecated, если их инфраструктура больше не поддерживается.
5. Версионировать curated packs и подключать их CLI-командой или sparse download, а не копировать полную библиотеку в каждый проект.

## Рекомендуемый следующий pack

Для будущего Next.js template взять текущие 8 skills и заменить/добавить `nextjs-app-router-practices`; React 19 skills добавлять только после фактического перехода на React 19. Backend skills держать в отдельном template/profile.
