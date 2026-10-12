# 0002 CSS Modules and design tokens

Status: accepted, 2026-10-13

## Context

The original site had one global stylesheet of about 1,400 lines. Any class could affect any element, and dead rules were hard to find. Theming already ran on CSS custom properties.

## Decision

- Each component has a co-located CSS Module.
- Global CSS is limited to three files: `tokens.css` (colours for both themes, fonts, easing, spacing), `base.css` (reset and element defaults) and `utilities.css` (the scroll-reveal hooks and `.visually-hidden`).
- Light-theme overrides inside a module use `:global([data-theme="light"]) .class`.
- Keyframes live in the module that uses them, so their names are scoped too.

## Consequences

- Styles are scoped to their component and can be deleted with it.
- Switching the theme is one attribute on `<html>`.
- A parent that restyles a child on hover passes the child a class (SkillCard gives Tag one), because modules cannot target each other's classes.
