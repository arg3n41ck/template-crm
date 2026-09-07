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

- Resolve this checkout with list_projects using its actual repository root; index if missing/stale. Do not reuse a maintainer-specific project ID.

## Agent distribution

- `docs/ARCHITECTURE.md`: modular boundaries and rule precedence.
- `docs/AI_SKILLS.md`: installed skill profile.
- `.agents/skills`, `.claude/skills`, `.codex/skills`: portable forwarding files to `.ai/skills`.

Codebase Memory MCP was refreshed during kit verification. Graph availability remains optional for community users; validate source freshness before later discovery.

## Required knowledge skills

- `.ai/skills/graphify`: focused relationship analysis; generated output in ignored `graphify-out/`.
- `.ai/skills/project-documentation-wiki`: business knowledge in `.wiki/`; read its index before substantive tasks.
- Canonical skills have portable forwarders for supported agent clients.

Installed workflow inventory and task triggers are listed in `docs/AI_SKILLS.md` and `.ai/workflows.json`. No application architecture or runtime dependency changed.

## Context routing

`.ai/workflows.json` (task/risk data) -> `.ai/context.mjs` (read-only route/contract validation) -> focused canonical skills. `.ai/WORKFLOW.md` owns the workflow/risk matrix; docs/AI_SKILLS.md is the inventory. Hub kit is the maintainer source for common files; copied projects run independently. No application imports the AI helper.

`.ai/skills/graphify/scripts/build_graph.py` is a pinned-version, scoped local AST adapter; `docs/GRAPHIFY.md` documents isolated installation. It writes only ignored graph/cache outputs and never invokes a semantic model API.

## URL-state extension

`docs/URL_STATE.md` owns state/filter policy. `docs/AI_SKILLS.md` and `.ai/workflows.json` index focused skills; hub kit is the shared authoring source, project copies stay standalone. CRM `src/shared/hooks/useAppSearchParams/usePaginationQuery.tsx` uses validated functional atomic navigation; adjacent tests cover defaults, size reset and latest-state merging. Other compatibility helpers are not claimed migrated.

## Cleanup

Removed unused vendored tailwind-merge (cn imports npm package), dashboard/example routes and obsolete readme tree. Current docs live in docs/; docs/DEPLOYMENT.md describes Docker/nginx. Docker build copies scripts/check.js and pnpm-workspace.yaml before install. No product API or database schema changed.

## Dev-toolchain migration

`package.json` pins Vitest/UI/Istanbul4.1.11, Happy DOM20.14.0, Storybook10.6.0. `vitest.config.ts` matches app aliases and explicit coverage inventory. `src/shared/config/storybook/main.ts` is ESM, configures docs/links + Tailwind plugin; `preview.css` imports global tokens and explicitly scans src. Two CSF3 stories use @storybook/react-vite types and deterministic content. `.github/workflows/verify.yml` includes full dependency audit, peer check, coverage and Storybook build.
