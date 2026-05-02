import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import NewArrivalsPage from './pages/NewArrivalsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CursorFollower from './components/CursorFollower.jsx'
import {
  products as ALL_PRODUCTS,
  SHOP_PAGE_SIZE,
  CATEGORIES
} from './data/products.js'

const CART_STORAGE_KEY = 'popdrop:cart:v1'
const THEME_STORAGE_KEY = 'popdrop:theme:v1'

const readCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (it) =>
        it &&
        typeof it.id === 'string' &&
        typeof it.quantity === 'number' &&
        it.quantity > 0
    )
  } catch {
    return []
  }
}

const readTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}

export default function App() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [tagFilter, setTagFilter] = useState(null)

  const [cart, setCart] = useState(() => readCart())
  const [theme, setTheme] = useState(() => readTheme())
  const [cartOpen, setCartOpen] = useState(false)
  const [shopPage, setShopPage] = useState(1)

  const catalogRef = useRef(null)
  const searchInputRef = useRef(null)
  const newArrivalsCatalogRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // ignore
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ignore
    }
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (location.pathname !== '/shop') return
    const tag = searchParams.get('tag')
    const cat = searchParams.get('category')

    setTagFilter(tag ?? null)

    if (cat && CATEGORIES.includes(cat)) {
      setCategory(cat)
    }

    if (tag && !cat) {
      setCategory('All')
    }
  }, [location.pathname, searchParams])

  const clearBrowseFilters = () => {
    setSearchQuery('')
    setCategory('All')
    setSort('featured')
  }

  /** Reset catalog filters — call before navigating to `/shop` (e.g. from header Link). */
  const prepareShopFresh = () => {
    clearBrowseFilters()
    setTagFilter(null)
  }

  const navigateToShopFresh = () => {
    prepareShopFresh()
    navigate('/shop')
  }

  const pickCategoryShowcase = (cat) => {
    setTagFilter(null)
    setSearchQuery('')
    setSort('featured')
    setCategory(cat)
    navigate(`/shop?category=${encodeURIComponent(cat)}`)
  }

  const displayedProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = ALL_PRODUCTS.filter((p) =>
      q === '' ? true : p.name.toLowerCase().includes(q)
    )
    if (tagFilter) {
      list = list.filter((p) => p.tag === tagFilter)
    }
    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    const copy = [...list]
    switch (sort) {
      case 'price-asc':
        copy.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        copy.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        copy.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    return copy
  }, [searchQuery, category, sort, tagFilter])

  useEffect(() => {
    setShopPage(1)
  }, [searchQuery, category, sort, tagFilter])

  const totalShopPages = Math.max(
    1,
    Math.ceil(displayedProducts.length / SHOP_PAGE_SIZE)
  )

  useEffect(() => {
    setShopPage((p) => Math.min(p, totalShopPages))
  }, [totalShopPages])

  const paginatedProducts = useMemo(() => {
    const start = (shopPage - 1) * SHOP_PAGE_SIZE
    return displayedProducts.slice(start, start + SHOP_PAGE_SIZE)
  }, [displayedProducts, shopPage])

  const goShopPage = (next) => {
    const clamped = Math.max(1, Math.min(next, totalShopPages))
    setShopPage(clamped)
    queueMicrotask(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, it) => sum + it.quantity, 0),
    [cart]
  )

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id)
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          quantity: 1
        }
      ]
    })
  }

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it))
    )

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0)
    )

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((it) => it.id !== id))

  const clearCart = () => setCart([])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const clearFiltersEmpty = () => {
    setTagFilter(null)
    clearBrowseFilters()
    navigate('/shop', { replace: true })
  }

  const handleCategoryChange = (next) => {
    setCategory(next)
    setTagFilter(null)
    navigate('/shop', { replace: true })
  }

  return (
    <div className="app-shell">
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
        onPrepareShopFresh={prepareShopFresh}
        onFocusSearch={() => {
          navigate('/shop')
          queueMicrotask(() => searchInputRef.current?.focus())
        }}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onShopClick={() => navigateToShopFresh()}
                onPickCategory={pickCategoryShowcase}
              />
            }
          />
          <Route
            path="/new-arrivals"
            element={
              <NewArrivalsPage
                catalogRef={newArrivalsCatalogRef}
                onAdd={addToCart}
              />
            }
          />
          <Route
            path="/product/:productId"
            element={<ProductDetailPage onAdd={addToCart} />}
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                catalogRef={catalogRef}
                searchInputRef={searchInputRef}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                category={category}
                onCategoryChange={handleCategoryChange}
                sort={sort}
                onSortChange={setSort}
                resultsCount={displayedProducts.length}
                paginatedProducts={paginatedProducts}
                shopPage={shopPage}
                totalShopPages={totalShopPages}
                onPrevPage={() => goShopPage(shopPage - 1)}
                onNextPage={() => goShopPage(shopPage + 1)}
                onAdd={addToCart}
                onClearFilters={clearFiltersEmpty}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <CursorFollower />
    </div>
  )
}
