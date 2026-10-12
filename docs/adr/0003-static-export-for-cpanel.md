# 0003 Static export for cPanel hosting

Status: accepted, 2026-10-13

## Context

The site is hosted on shared cPanel hosting with no Node.js runtime. A deploy is a git pull followed by the tasks in `.cpanel.yml`.

## Decision

- Build with `output: "export"`, which writes plain HTML, CSS and JavaScript to `out/`.
- Commit `out/`; `.cpanel.yml` copies it into `public_html`.
- `next/font` downloads and self-hosts the fonts at build time.
- `sitemap.ts` and `robots.ts` are `force-static` routes, so they export as files.

## Consequences

- There is no server to run or patch, and pages are served as static files.
- Every content change needs a rebuild and a commit of `out/`.
- Server features (API routes, ISR, middleware) are unavailable; moving to a Node host would remove this limit.
