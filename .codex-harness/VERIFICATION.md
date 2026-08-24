# Verification

## Default

```bash
pnpm install --frozen-lockfile
pnpm verify
```

## By change

- Docs/rules only: inspect links and paths; no application build required.
- TypeScript/component change: lint + typecheck + build.
- Dependency/build config: clean install + lint + typecheck + build.
- UI/theme/layout: default checks plus browser smoke at desktop and mobile widths.
- API/data/route: focused test or direct request/route smoke plus the default checks.

## Browser smoke

1. Start `pnpm dev`.
2. Open the documented local URL.
3. Check initial render, console errors, keyboard focus and a narrow mobile viewport.
4. Do not report browser QA as complete when the route or environment was unavailable.
