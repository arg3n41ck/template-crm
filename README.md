# Ruflo CRM Template

Production-oriented React SPA starter for CRM and dashboard projects.

## Stack

- React 18 + TypeScript 5.7 + Vite 6
- TanStack Router + TanStack Query
- Tailwind CSS v4 + shadcn/ui (`new-york`)
- Radix UI + Lucide icons + Sonner
- Axios + OpenAPI code generation
- Vitest + Storybook + ESLint + Prettier

## Requirements

Node.js 22 and pnpm 11 through Corepack.

## Start

```bash
pnpm install
pnpm dev
```

The dev server runs on `http://localhost:3000`.

## Commands

```bash
pnpm lint:type        # TypeScript
pnpm lint:eslint      # ESLint
pnpm lint:prettier    # formatting check
pnpm test:vitest      # tests
pnpm build            # production build
pnpm generate:api     # regenerate API types/hooks
pnpm storybook        # component workspace
```

## Structure

```text
src/app/                       app providers and router
src/pages/                     thin TanStack file routes
src/modules/                   domain features
src/shared/ui/shadcn/          shadcn primitives
src/shared/ui/                  reusable compositions
src/shared/hooks/              reusable hooks
src/shared/libs/               utilities
src/shared/services/api/       API client and generated contracts
src/shared/config/styles/      theme tokens and global CSS
.ai/skills/                    canonical project skills
```

## shadcn/ui

Configuration is in `components.json`. Add a primitive with:

```bash
pnpm dlx shadcn@latest add dialog
```

Import accepted components through `@shared/ui` and utilities through `@shared/libs`. Use semantic theme tokens rather than raw colors. Full UI/UX rules: [`readme/DESIGN_SYSTEM.md`](readme/DESIGN_SYSTEM.md).

## Agent context

- Rules: `AGENTS.md`, `CLAUDE.md`
- Technical map: `.codex-harness/AGENT_GRAPH.md`
- Verification: `.codex-harness/VERIFICATION.md`
- Skill audit: `readme/SKILLS_AUDIT.md`

Project skills are stored once in `.ai/skills/`; `.claude/skills` and `.codex/skills` point to it.
