# CRM dashboard template agent rules

## Start here

1. Read this file, `README.md`, `.codex-harness/AGENT_GRAPH.md`, and `.codex-harness/VERIFICATION.md`.
2. Read only the project skill needed for the task from `.ai/skills/<skill>/SKILL.md`.
3. Use `.ai/skills/find-skills/SKILL.md` when the required workflow is not obvious.
4. Inspect the existing source pattern before editing; keep the patch scoped and preserve user changes.

## Architecture

- React 18, Vite, TanStack Router/Query, Tailwind CSS v4, shadcn/ui, Axios/OpenAPI, Vitest.
- `src/app` composition/router; `src/pages` thin routes; `src/modules` business features; `src/shared/ui/shadcn` primitives; `src/shared/services/api` contracts.
- Preserve feature-sliced boundaries. Pages stay thin. Generated API code changes only through `pnpm generate:api` after contract verification.

## UI/UX

- shadcn/ui source is owned by this repository; add primitives with the shadcn CLI instead of hand-copying registry code.
- Compose product components outside the primitive folder. Do not put business logic into shadcn primitives.
- Use semantic theme tokens; avoid hardcoded colors and duplicate one-off UI primitives.
- Use Lucide icons for standard interface symbols. Keep focus, keyboard behavior, loading, empty and error states accessible.
- For UI work, consult `ui-ux-pro-max`, `design-system-steward`, `frontend-design`, and `frontend-error-ux` as needed.

## Verification

- Commands: `pnpm dev`, `pnpm lint`, `pnpm test:vitest`, `pnpm build`, `pnpm verify`.
- UI work needs browser smoke at desktop and mobile widths when a local URL is available.
- Never claim completion without fresh verification output.

## Safety

- Never store secrets. Keep `.env` ignored and document only `.env.example`.
- Do not add arbitrary post-install shell execution.
- Runtime/cache folders (`node_modules`, build output, `.omx`, `.codebase-memory`) are not source of truth.
