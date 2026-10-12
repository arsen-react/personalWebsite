# 0004 Server components with client islands

Status: accepted, 2026-10-13

## Context

Most of the page is static text. Only a few parts need the browser: the navigation (scroll state, mobile menu, active section), the theme toggle, the hero animation and two visual effects.

## Decision

- Components are server components by default.
- Client components are limited to `SiteHeader`, `ThemeToggle`, `HeroCanvas`, `CursorGlow` and `ScrollReveal`.
- Browser state is read with `useSyncExternalStore` (scroll position, theme attribute, media queries). The static HTML renders the server snapshot, and the client takes over without a hydration mismatch.
- The saved theme is applied by an inline `<head>` script before first paint.
- Pure logic, such as the hero's node physics, lives in `lib/` files with no DOM access, so it can be unit-tested.

## Consequences

- Little JavaScript ships, and there is no theme flash or hydration warning.
- The inline theme script sits outside React and must match `features/theme/lib/theme.ts`; tests run the script itself to keep them in sync.
