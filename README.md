# arsen.dev

Personal website of Arsen Melqonyan, Frontend Engineer. A single-page portfolio built with Next.js (App Router) and exported as static files for cPanel hosting.

## Stack

- Next.js 16 App Router with `output: "export"`, React 19, TypeScript
- Self-hosted fonts through `next/font`
- Client components only where the page is interactive: theme toggle, mobile menu, hero animation, cursor glow, scroll reveal
- Vitest and React Testing Library
- GitHub Actions: lint, tests and build on every push

## Scripts

```bash
npm run dev     # local dev server
npm run test    # tests
npm run lint    # ESLint
npm run build   # static export to out/
```

## Content

All text lives in `src/content/profile.ts`; the components only render it.

## Deploy

`npm run build` writes the site to `out/`, which is committed. cPanel pulls the repository and `.cpanel.yml` copies `out/` into `public_html`. After changing content, run the build and commit `out/` with the change.
