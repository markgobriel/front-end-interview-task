# Popdrop — Documentation

This document describes the **Popdrop** product catalog: architecture, behavior, configuration, and how to extend it. It is aligned with the current codebase.

## Overview

Popdrop is a **client-side single-page application (SPA)** for browsing products, filtering and sorting a catalog, and managing a simple shopping cart. The marketing experience (hero, marquee, editorial sections) lives on the home route; the **catalog UI** lives on **`/shop`**.

| Item | Detail |
|------|--------|
| Package name | `popdrop-catalog` |
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | `react-router-dom` (Browser Router) |

There is **no backend** in this project: catalog data ships with the bundle, cart and theme are stored in the browser (`localStorage`).

---

## Quick start

```bash
npm install
npm run dev
```

- Dev server defaults to **`http://localhost:5173`** (see `vite.config.js`).
- Production build:

  ```bash
  npm run build
  npm run preview
  ```

---

## Repository layout

```
src/
  App.jsx              # Global state: cart, theme, catalog filters, routes
  main.jsx             # React root + BrowserRouter wrapper
  index.css            # Global layout, themes, responsive rules
  components/          # UI sections and widgets (see below)
  pages/
    HomePage.jsx       # Landing: hero → marquee → showcase → stats → testimonials → newsletter
    ShopPage.jsx       # Filters + paginated product grid
    NewArrivalsPage.jsx  # Route /new-arrivals — headline + grid (tag New In only)
    ProductDetailPage.jsx  # Route /product/:productId — single product layout
  data/
    products.js        # Catalog, categories, sort options, announcements, marquee copy
```

Static assets entry: `index.html` at the repo root.

---

## Routing

| Path | Content |
|------|---------|
| `/` | `HomePage` — editorial landing; CTAs navigate to `/shop`. |
| `/shop` | `ShopPage` — search, category chips, sort, grid, pagination. |
| `/new-arrivals` | `NewArrivalsPage` — “New arrivals” heading; catalog limited to **`tag === 'New In'`** with its own search/sort/category and pagination (state is local to the page). |
| `/product/:productId` | `ProductDetailPage` — PDP for one SKU (matches **`products[].id`**); breadcrumbs, **Add to cart**; unknown id redirects to **`/shop`**. Testimonials link here via **`TESTIMONIALS[].productId`**. |
| `*` | Redirect to `/`. |

Routing is declared in **`App.jsx`** inside `<Routes>`.

### Query parameters on `/shop`

The catalog reads optional query strings (see `App.jsx` `useSearchParams` effect):

| Param | Behavior |
|-------|----------|
| `category` | If present and matches **`CATEGORIES`** in `products.js`, sets the category chip. |
| `tag` | Sets an internal tag filter (`New In`, `Most Wanted`, etc.). If `tag` is set without `category`, category is forced to **All** for predictable “campaign” links. |

Footer and header **`New In`** links use **`/shop?tag=New%20In`**. Clearing chips or resetting via **Shop** in the nav updates navigation state as implemented in **`App.jsx`**.

---

## State management

All global state lives in **`App.jsx`** (no Redux / Zustand).

| Concern | Storage / notes |
|---------|----------------|
| Cart | React state; persisted with key **`popdrop:cart:v1`**. Each line item: `id`, `name`, `price`, `category`, `image`, `quantity`. |
| Theme (`light` / `dark`) | React state + **`popdrop:theme:v1`**; applied via `document.documentElement.dataset.theme` and `color-scheme`. |
| Search query | Single string; filter is **substring match on product name**, case-insensitive. |
| Category | One of `CATEGORIES` (**All**, **Electronics**, **Clothing**, **Accessories**). |
| Sort | Values from **`SORT_OPTIONS`** in **`products.js`**. |
| Tag filter (`tagFilter`) | Optional; narrows catalog by **`product.tag`**. |

### Derived catalog list

The visible list is computed in **`useMemo`** (`displayedProducts`): search → tag filter (if set) → category → sort → **pagination**.

---

## Pagination

- **`SHOP_PAGE_SIZE`** in **`src/data/products.js`** (default **15**) controls items per page.
- Page index state: **`shopPage`**. Prev/next controls scroll the catalog section into view via a ref passed to **`ShopPage`**.

---

## Data model (`src/data/products.js`)

Each product is a plain object, for example:

| Field | Type | Role |
|-------|------|------|
| `id` | string | Stable key / cart identifier |
| `name` | string | Display + search |
| `category` | string | Must match chip values (excluding **All**) |
| `price` | number | US currency formatting in UI |
| `image` | string (URL) | Unsplash CDN URL with squared / white matte params |
| `description` | string | Card subtitle |
| `tag` | string or `null` | Optional ribbon; drives URL `tag=` filters |

Exported helpers:

- **`CATEGORIES`** — filter chips (**All** + three categories).
- **`SORT_OPTIONS`** — Featured, price ascending/descending, name A–Z.
- **`ANNOUNCEMENTS`** — rotates in **`AnnouncementBar`**.
- **`MARQUEE_WORDS`** — marquee strip keywords.

---

## Major components

| Component | Responsibility |
|-----------|----------------|
| **`Header`** | Nav (`Home`, `Shop`, `New In`), logo link home, theme toggle, search shortcut (opens `/shop` + focuses search), cart button + badge. |
| **`AnnouncementBar`** | Top rotating messages (from **`ANNOUNCEMENTS`**). |
| **`Hero`** | Primary CTA; calls back to **`navigateToShopFresh`** from **`App.jsx`**. |
| **`Marquee`** | Decorative scrolling strip (`MARQUEE_WORDS`). |
| **`CategoryShowcase`** | Category cards navigating to **`/shop?category=…`**. |
| **`Stats`** | Numbers animate on intersection. |
| **`Testimonials`** / **`Newsletter`** | Static marketing blocks. |
| **`Footer`** | Links to **`/shop`** with **`category`** / **`tag`** query variants. |
| **`SearchFilters`** | Search input, `<select>` for sort, category chip row, results count (`forwardRef` for programmatic focus). |
| **`ProductGrid`** | Responsive grid wrapper, **`ProductCard`** list, pagination controls, **`empty-state`** when `totalItems === 0`. |
| **`ProductCard`** | Image, tag badge, meta, description, price, **Add** with short “Added” feedback. |
| **`CartDrawer`** | Slide-over: lines, qty ±, remove, clear, line totals and sum. |

---

## Styling and theming

- **Single stylesheet:** **`src/index.css`** — CSS variables under **`:root`**, **`[data-theme="dark"]`**, typography (Plus Jakarta Sans + Instrument Serif), layout grids, animations.
- **Design:** editorial / cream palette; square radii (see `--radius-*` tokens in `:root`).
- **Motion:** staggered **`cardIn`** animation for grid items; **`prefers-reduced-motion`** clamps animations.
- **Product media:** `.product-media` uses near-white backdrop and **`object-fit: contain`** so images stay legible against the matte.

---

## Responsive product grid

Catalog column counts in **`src/index.css`** use media queries roughly as follows (Widths are approximate; check file for truth.)

| Breakpoint | `.product-grid` columns |
|------------|-------------------------|
| Large (`>1200px`) | 5 |
| `≤1200px` | 4 |
| `≤960px` | 3 |
| `≤720px` | 2 |
| `≤540px` | 1 |

---

## Accessibility notes

- Search and sort controls have associated labels (`visually-hidden` where stacked).
- Cart button **`aria-label`** includes item count semantics.
- Theme toggle **`aria-pressed`**.
- Empty catalog state uses **`role="status"`** and a **Clear filters** action.

---

## Deployment (static hosting)

The app relies on **`BrowserRouter`**. Paths like **`/shop`** must resolve to **`index.html`** so the SPA can boot. Configure your host (e.g. **Netlify** `_redirects`, **Vercel** rewrites, or **S3 / CloudFront** error document) accordingly. **`vite preview`** already behaves like an SPA locally.

---

## Where to customize

| Goal | Likely location |
|------|----------------|
| Rename brand / routes copy | **`Header.jsx`**, **`Hero.jsx`**, **`Footer.jsx`**, `index.html` `<title>` |
| Add/remove products | **`src/data/products.js`** — extend **`products`**; keep **`category`** in sync with **`CATEGORIES`** |
| Items per catalog page | **`SHOP_PAGE_SIZE`** |
| Colors / typography | **`src/index.css`** variables |
| New marketing section on home | **`HomePage.jsx`** + new component + CSS |

---

## Map to “product catalog” interview criteria

Rough alignment with a typical frontend take-home checklist:

| Requirement | Implemented |
|-------------|-------------|
| Navbar + logo (text), nav, cart badge | ✓ (**Shop** replaces the word “Products” unless you rename it.) |
| Search by name (real-time, case insensitive) | ✓ |
| Category filter (All + Electronics, Clothing, Accessories) | ✓ |
| Responsive grid | ✓ (more than 3 columns at wide breakpoints; tighten CSS if a strict **3 / 2 / 1** spec is required.) |
| Product card: image, name, category, price, add-to-cart | ✓ (+ description / tag extras) |
| Combined search + category | ✓ (+ optional tag filtering) |
| Empty state | ✓ |
| Bonuses (animations, dark mode, sort, cart panel, persistence) | ✓ |

For the latest **CLI scripts** and a short README-style intro, see **`README.md`** in the repo root (you may sync it with routing and grid facts above if README drifts).
