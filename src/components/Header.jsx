import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function SearchIconSm() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M6 18L18 6" />
        </>
      ) : (
        <>
          <path d="M3 7h18" />
          <path d="M3 12h18" />
          <path d="M3 17h18" />
        </>
      )}
    </svg>
  )
}

export default function Header({
  cartCount,
  onOpenCart,
  isDark,
  onToggleTheme,
  onPrepareShopFresh,
  onFocusSearch
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <nav className={`site-nav${mobileOpen ? ' open' : ''}`} aria-label="Primary">
          <NavLink
            end
            to="/"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>
          <Link
            to="/shop"
            className="nav-link"
            onClick={() => {
              setMobileOpen(false)
              onPrepareShopFresh?.()
            }}
          >
            Shop
          </Link>
          <NavLink
            to="/new-arrivals"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            New In
          </NavLink>
        </nav>

        <Link
          to="/"
          className="brand"
          onClick={() => {
            setMobileOpen(false)
            const reduceMotion =
              typeof window !== 'undefined' &&
              window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({
              top: 0,
              behavior: reduceMotion ? 'auto' : 'smooth'
            })
          }}
          aria-label="Popdrop home"
        >
          <span className="brand-name">Popdrop</span>
        </Link>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              onFocusSearch?.()
              setMobileOpen(false)
            }}
            aria-label="Search products"
            title="Search"
          >
            <SearchIconSm />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="cart-btn"
            onClick={onOpenCart}
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <CartIcon />
            <span className="cart-btn-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-hidden="true">{cartCount}</span>
            )}
          </button>

          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>
    </header>
  )
}
