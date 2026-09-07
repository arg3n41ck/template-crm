# Storybook 10

Use `pnpm storybook` or `pnpm build:storybook`. Configuration lives beside this document; canonical global styles and Tailwind v4 are loaded into previews. Aliases match the application. Use CSF3 `Meta`/`StoryObj` from `@storybook/react-vite`, add explicit sample content and `tags: ['autodocs']` where useful.

Controls/actions are supplied by Storybook core; docs and links are explicit addons. Do not restore removed addon-essentials, addon-interactions, addons, blocks, test or theming packages from Storybook 7/8. If interaction spies are needed, import `fn` from `storybook/test`; do not rely on inferred action spies inside play functions.

Keep stories deterministic and free from live backend calls or third-party image dependencies. No mock service, theme decorator or browser interaction runner is claimed installed unless it exists in source. Built preview output is ignored. Telemetry is disabled in main config; CI also sets STORYBOOK_DISABLE_TELEMETRY.

Before changing tool versions run full `pnpm audit`, `pnpm peers check`, `pnpm verify`, `pnpm test:coverage`, and `pnpm build:storybook`. Inspect the built manager and each changed story in a browser. Storybook build warnings and test coverage gaps must be reported, not hidden.
