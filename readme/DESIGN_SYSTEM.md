# SPA Template Design System

## Foundation

- Component source: `src/shared/ui/shadcn/` (shadcn/ui, style `new-york`).
- Tokens: `src/shared/config/styles/global.css`.
- Icons: `lucide-react`.
- Composition helpers: `cn` from `@shared/libs`.
- Notifications: `notification` wrapper over Sonner.

## Rules

1. Reuse a shadcn primitive before writing a new control.
2. Compose feature-specific UI outside `shared/ui/shadcn`; keep primitives generic.
3. Use semantic tokens, not raw brand/gray hex values. Theme overrides happen only through CSS variables.
4. Maintain a clear hierarchy: one primary action per region, destructive actions use destructive styling and confirmation.
5. Every data surface must define loading, empty, error and success states.
6. Forms use visible `Label`, useful errors, correct autocomplete and disabled/loading submit state.
7. Icon-only actions require `aria-label`; keyboard focus must stay visible.
8. Start responsive behavior at narrow width; tables need an explicit overflow or compact strategy.
9. Animation must explain state and respect reduced-motion defaults; avoid decorative motion that delays work.
10. Dark mode must use the same semantic tokens; never duplicate component markup for themes.

## Component placement

- Pure shadcn primitive: `src/shared/ui/shadcn/<component>.tsx`.
- Reusable product composition: `src/shared/ui/<component>/`.
- Domain-specific UI: `src/modules/<Feature>/ui/` or `components/`.
- Page route: `src/pages/`, routing only.

## Adding a component

```bash
pnpm dlx shadcn@latest add dialog
```

Review imports, formatting, tokens, bundle impact and accessibility. Export accepted primitives from `src/shared/ui/shadcn/index.ts`.

## Review checklist

- Semantic token usage and dark mode.
- Keyboard navigation, focus, accessible names and form labels.
- Loading/empty/error states.
- 320px/mobile and desktop layout.
- No duplicate primitive or icon library.
- Focused typecheck/lint plus browser smoke for routed UI.
