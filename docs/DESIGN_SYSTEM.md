# Design system

- shadcn/ui is the primitive source baseline; Radix provides behavior and Lucide provides standard icons.
- Theme values live in global CSS variables. Product code consumes semantic classes such as `bg-background`, `text-muted-foreground`, `border-border` and `bg-primary`.
- `components/ui` (or the CRM equivalent) contains registry primitives only. Reusable product compositions belong one level above; feature-specific UI stays with the feature.
- New screens must cover responsive layout, keyboard/focus behavior, loading, empty, error and destructive states.
- Before adding a custom primitive, check the shadcn registry and the existing local primitives. Use `pnpm dlx shadcn@latest add <component>`.
