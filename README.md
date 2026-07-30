# Bundle Builder

**Live demo:** [https://bundle-builder-chi-six.vercel.app/bundle-builder](https://bundle-builder-chi-six.vercel.app/bundle-builder)

A multi-step security system bundle builder with a live review panel. Built as a React prototype.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173/bundle-builder](http://localhost:5173/bundle-builder) in your browser.

## Build & Preview

```bash
npm run build
npm run preview
```

## Overview

A two-column shopping experience:

**Left — The Builder.** A vertical 4-step accordion that walks through assembling a security system:

1. **Choose your cameras** — select camera models with color variants, each tracked separately
2. **Choose your sensors & modules** — add sensors with quantity controls
3. **Choose your accessories** — pick accessories
4. **Choose your plan** — pick a protection plan (single selection)

Each step shows a "STEP X OF 4" header, an "N Selected" count, and a chevron indicator. The expanded step has a "Next" button that advances the accordion.

**Right — The Review Panel.** A live summary that reflects every selection in real time:

- Selected items grouped under category subheadings (Cameras, Sensors, Accessories, Plan)
- Each line shows a thumbnail, name, quantity stepper, and pricing with discount
- Running totals (original price struck through, discounted price, monthly installment)
- Savings callout when discounts apply
- Fast Shipping row
- Checkout button and "Save my bundle for later" persistence

## Routes

| Route | Page |
|---|---|
| `/` | Redirects to `/bundle-builder` |
| `/bundle-builder` | The bundle builder app |
| `/products/:id` | Product detail placeholder |

## Features

- **Variant selection** — products with color options track each variant's quantity independently. Switching variants in the card swaps the active count; all non-zero variants appear as separate lines in the review panel.
- **Quantity steppers** — present on both product cards and review panel lines, kept in sync (changing one updates the other and all totals).
- **Live review panel** — totals recalculate as quantities change.
- **Persistence** — "Save my bundle for later" saves the full configuration to `localStorage`. Returning after a reload or revisiting restores the exact same state.
- **Responsive** — adapts from desktop down to mobile using Tailwind breakpoints.
- **Data-driven** — all products, sensors, accessories, and plans are loaded from local JSON data files.

## Tech Stack

- React 19 + TypeScript
- Vite
- Zustand (state management)
- React Router v8
- Sonner (toast notifications)
- Tailwind CSS
- Base UI (accordion primitive)

## Project Structure

```
src/
├── components/
│   ├── accessories/   # Accessory card component
│   ├── cameras/       # Camera card with variant selector
│   ├── global/        # Shared QuantitySelector, Seperator
│   ├── plans/         # Plan card component
│   ├── review/        # ReviewSidebar, ReviewItem
│   ├── sensors/       # Sensor card component
│   ├── steps/         # Accordion step components
│   └── ui/            # Accordion, Button primitives
├── data/              # JSON-like data files
├── lib/               # Types, utilities
├── pages/             # Route page components
├── store/             # Zustand bundle store
├── App.tsx            # Root layout
└── main.tsx           # Entry point with router
```

## Decisions & Tradeoffs

- **Zustand over Context** — avoids re-render cascading when individual quantities change. Each card subscribes to only the slice it needs.
- **Base UI Accordion** — lightweight, unstyled accordion primitive with accessible expand/collapse behavior. The step indicator and custom styling are layered on top.
- **CSS variables for theming** — primary colors use `var(--primary)` so sonner toasts and the accordion share the same palette without duplication.
- **No backend** — the spec called for a bonus (not a requirement). Data is served from local TypeScript files, making the app fully self-contained.
- **"Learn More" links** — navigate to `/products/:id` with a placeholder page. In a production app this would connect to a product detail page or modal.
- **Step order** — follows the implemented order (Cameras → Sensors → Accessories → Plan). The original spec ordering can be adjusted by reordering the step components in `App.tsx`.
