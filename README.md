# Popdrop — Product Catalog

> Everyday finds, made fun.

A polished, responsive product catalog SPA for a playful Gen Z lifestyle brand. Built with React + Vite. Fully client-side.

## Features

- Header with brand, nav links, cart badge, and dark mode toggle
- Hero with CTA that scrolls to the catalog
- Real-time, case-insensitive search
- Category filter (All / Electronics / Clothing / Accessories)
- Sorting (Featured / Price ↑ / Price ↓ / Name A–Z)
- Responsive product grid (3 / 2 / 1 columns)
- Animated product cards with Add to Cart feedback
- Slide-out cart drawer with quantity controls, remove, clear, and total
- localStorage persistence for cart and theme
- Accessible, keyboard-navigable controls with visible focus states
- Friendly empty states for search and cart

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx
  main.jsx
  index.css
  components/
    Header.jsx
    Hero.jsx
    SearchFilters.jsx
    ProductGrid.jsx
    ProductCard.jsx
    CartDrawer.jsx
  data/
    products.js
```
