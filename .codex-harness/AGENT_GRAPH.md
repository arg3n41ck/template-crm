# Agent graph

## Project

- Template: CRM dashboard template
- Stack: React 18, Vite, TanStack Router/Query, Tailwind CSS v4, shadcn/ui, Axios/OpenAPI, Vitest
- Package manager: pnpm 11 via Corepack

## Source map

- `src/app` composition/router; `src/pages` thin routes; `src/modules` business features; `src/shared/ui/shadcn` primitives; `src/shared/services/api` contracts.
- `src/modules/Dashboard/ui/DashboardOverview.tsx`: ready CRM dashboard composition and demo data.
- `components.json`: shadcn registry and alias configuration.
- `.ai/skills`: canonical project-local agent skills.
- `docs/AI_SKILLS.md`: skill selection and overlap notes.
- `docs/DESIGN_SYSTEM.md`: UI ownership and token rules.

## Flow and boundaries

- Preserve feature-sliced boundaries. Pages stay thin. Generated API code changes only through `pnpm generate:api` after contract verification.
- UI primitives -> reusable compositions -> feature/page composition.
- Environment values flow from ignored local `.env` files; only examples are committed.

## Commands

`pnpm dev`, `pnpm lint`, `pnpm test:vitest`, `pnpm build`, `pnpm verify`.

## Impact hints

- Dependency/config change: install + lint/typecheck + build.
- UI primitive/theme change: check all consumers and run desktop/mobile browser smoke.
- Route/API/data change: verify direct route or contract plus build and focused tests.

## Codebase Memory MCP

- Project index: `Users-argenalimbaev-work-projects-ruflo-template-crm` (fast index refreshed 2026-08-24).
