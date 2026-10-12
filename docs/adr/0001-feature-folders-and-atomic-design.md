# 0001 Feature folders and atomic design

Status: accepted, 2026-10-13

## Context

Even a one-page site ends up with around 30 components. A single flat folder mixes generic UI (buttons, cards) with page content (the experience section), and the dependencies between them become hard to see or change.

## Decision

Split the code by role:

- `features/` holds the page sections. Each feature exposes its public API through `index.ts`; other code does not reach into its folders.
- `shared/ui/` is a content-agnostic design system, ordered by atomic level: atoms, molecules, organisms, templates. A level may only use the levels below it.
- `app/` only composes features into the page and defines SEO routes.
- `content/` and `config/` are typed data with no UI imports.

The direction of dependencies is enforced in `eslint.config.mjs` with `no-restricted-imports`.

## Consequences

- A section can be added, removed or reordered without touching shared UI.
- The design system can be browsed and tested on its own in Storybook.
- There are more folders than in a flat layout, and each level's `index.ts` must stay a plain list of exports.
