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

## Knowledge skills

For wiki/Graphify skill changes: validate canonical skills and forwarding paths; run the wiki initializer twice in a disposable directory and prove existing content is preserved. Graphify runtime smoke is separate and must not be claimed from Markdown/adapters checks. App build/browser smoke is unnecessary for skills-only changes.

## AI workflow contract

Run `node .ai/context.mjs --check` for changed rules/skills/adapters. Try a question route (no skill chain), a UI/shared-ui route and an auth/API risk route; unknown task/risk must fail. Exact command results do not certify a model followed the protocol. Application changes still require the impact-specific checks above.

`.github/workflows/ai-contract.yml` runs the standalone AI checks on push/PR without installing app dependencies. Local results are not a claim that remote CI ran.

Latest observed results are in `docs/VERIFICATION_STATUS.md`; optional graph setup/adapter is in `docs/GRAPHIFY.md`. Historical results do not replace fresh checks for a new patch.

## URL-state changes

Follow `docs/URL_STATE.md` for focused commands and browser scenarios. Run full `pnpm verify` after adapter/dependency changes. New nuqs parser tests need Node 22.18+ or 24. Test server-driven fetching separately; starter smoke does not prove a business API.

## Release supply-chain gate

Run full `pnpm audit` and `pnpm peers check` (both enforced in verify CI). A production-only result does not clear development-tool vulnerabilities. Consumer release preparation must check distribution rights and fresh public registry pins; see docs/VERIFICATION_STATUS.md.

## CRM dev-toolchain

Node 22.18+ (or 24+) and pnpm11.21. Vitest, UI and Istanbul coverage versions must match; Storybook framework/addons use one release line. Preserve React18 runtime/type compatibility. CI runs full audit, peers, verify, coverage and Storybook build. Preview CSS uses an explicit Tailwind @source because Storybook has a different Vite root. Browser smoke must check actual styles, not only a nonblank story. Coverage is measured across source (generated API/routes and stories excluded); no claim of comprehensive coverage.
