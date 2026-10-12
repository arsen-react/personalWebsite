# arsen.dev

Personal website of Arsen Melqonyan, Frontend Engineer: [arsen.dev](https://arsen.dev).

Next.js 16 App Router (static export) · React 19 · TypeScript · CSS Modules · Storybook · Vitest

## Architecture

Feature folders for the page sections, and an atomic design system for everything reusable.

```
src/
├── app/                routing and composition only: layout, page, SEO (sitemap, robots, JSON-LD)
├── features/           one folder per page section; index.ts is its public API
│   ├── hero/           HeroSection, HeroCanvas (client), CodeSample, lib/nodeNetwork (pure physics)
│   ├── navigation/     SiteHeader (client), useActiveSection
│   ├── theme/          ThemeToggle (client), ThemeScript, useTheme, lib/theme
│   └── about/ experience/ projects/ skills/ education/ contact/
├── shared/             reusable code that knows nothing about this site's content
│   ├── ui/
│   │   ├── atoms/      Button, Icon, Heading, Eyebrow, Tag, Badge, IconButton, MenuButton, PulseDot, ExternalLink, SkipLink
│   │   ├── molecules/  SectionHeading, Logo, StatCard, SkillCard, ContactPill, TimelineItem, LanguageItem, BulletList
│   │   ├── organisms/  EntryCard, Marquee, Timeline, Footer
│   │   └── templates/  PageLayout, Section
│   ├── effects/        client-only enhancements: CursorGlow, ScrollReveal
│   ├── hooks/          useScrolled, useMediaQuery, usePrefersReducedMotion, useLockBodyScroll, useEscapeKey
│   └── lib/            cn, links, color
├── content/            typed page data: experience, projects, skills, education
├── config/             site identity, contact details, navigation order
└── styles/             design tokens for both themes, base styles, global utilities
```

### Dependency rules

ESLint enforces these with `no-restricted-imports`, so a wrong import fails `npm run lint`.

| Layer                 | May import                                                |
| --------------------- | --------------------------------------------------------- |
| `app`                 | everything                                                |
| `features`            | `shared`, `content`, `config`, other features' `index.ts` |
| `shared/ui/templates` | organisms, molecules, atoms, `shared/lib`, `shared/hooks` |
| `shared/ui/organisms` | molecules, atoms, `shared/lib`, `shared/hooks`            |
| `shared/ui/molecules` | atoms, `shared/lib`, `shared/hooks`                       |
| `shared/ui/atoms`     | other atoms, `shared/lib`, `shared/hooks`                 |
| `content`, `config`   | data only                                                 |

Section numbers ("04 — Expertise") come from the order in `config/navigation.ts`, so reordering the navigation renumbers the page.

### Rendering

Server components by default. Only the interactive parts are client components: SiteHeader, ThemeToggle, HeroCanvas, CursorGlow and ScrollReveal. Browser state (scroll position, theme, media queries) is read through `useSyncExternalStore`, which keeps hydration consistent. An inline script applies the saved theme before first paint, so there is no flash.

### Styling

Each component has its own CSS Module. Colours for both themes, fonts, easing and spacing are design tokens in `src/styles/tokens.css`. Global CSS is limited to the tokens, a base reset and the scroll-reveal utility classes.

## Quality

- **Tests:** 93 Vitest and React Testing Library tests next to the code they cover: components, hooks, the hero canvas, the scroll effects, the root layout and SEO metadata, plus an axe accessibility check of the whole page.
- **Coverage:** enforced by thresholds (95% of statements, functions and lines, 90% of branches).
- **Storybook:** stories for every atomic level, a dark/light theme switch and the accessibility add-on.
- **CI:** format check, lint, type check, tests with coverage (the HTML report is uploaded as an artifact), the static build and the Storybook build on every push.

## Accessibility and SEO

- Skip link, landmarks, visible focus styles, and Escape to close the mobile menu.
- Reduced-motion support for the animations, the hero canvas and the marquee.
- Open Graph metadata, canonical URL, `sitemap.xml`, `robots.txt` and schema.org `Person` data.

## Scripts

```bash
npm run dev            # dev server
npm run storybook      # component library on http://localhost:6006
npm run test           # tests
npm run test:coverage  # tests with the coverage report and thresholds
npm run check          # format, lint, types, tests with coverage, and build
npm run build          # static export to out/
```

## Deploy

`npm run build` writes the site to `out/`, which is committed. cPanel pulls the repository and `.cpanel.yml` copies `out/` into `public_html`. After changing content, rebuild and commit `out/` with the change.

## Decisions

- [0001 Feature folders and atomic design](docs/adr/0001-feature-folders-and-atomic-design.md)
- [0002 CSS Modules and design tokens](docs/adr/0002-css-modules-and-design-tokens.md)
- [0003 Static export for cPanel hosting](docs/adr/0003-static-export-for-cpanel.md)
- [0004 Server components with client islands](docs/adr/0004-server-components-with-client-islands.md)
