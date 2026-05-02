import { useEffect, useRef } from 'react'

const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12" />
      <path d="M6 18L18 6" />
    </svg>
  )
}

export default function CartDrawer({
  open,
  onClose,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear
}) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0)

  return (
    <>
      <div
        className={`drawer-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`cart-drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your Popdrop cart"
        aria-hidden={!open}
      >
        <div className="cart-header">
          <div>
            <h2 className="cart-title">
              Your Popdrop <span className="serif">cart.</span>
            </h2>
            <p className="cart-subtitle">
              {totalItems === 0
                ? 'Empty for now — let’s fix that'
                : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} ready to pop`}
            </p>
          </div>
          <button
            type="button"
            ref={closeBtnRef}
            className="icon-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="empty-state cart-empty" role="status">
              <div className="empty-emoji" aria-hidden="true">✦</div>
              <h3 className="empty-title">
                Cart’s feeling <span className="serif">shy.</span>
              </h3>
              <p className="empty-sub">Add a little color to your day.</p>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Keep shopping
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map((it) => (
                <li key={it.id} className="cart-item">
                  <img className="cart-item-img" src={it.image} alt="" loading="lazy" />
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div>
                        <div className="cart-item-name">{it.name}</div>
                        <div className="cart-item-meta">{it.category}</div>
                      </div>
                      <div className="cart-item-price">
                        {formatPrice(it.price * it.quantity)}
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="qty">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onDecrease(it.id)}
                          aria-label={`Decrease quantity of ${it.name}`}
                        >
                          −
                        </button>
                        <span className="qty-value" aria-live="polite">
                          {it.quantity}
                        </span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onIncrease(it.id)}
                          aria-label={`Increase quantity of ${it.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="link-btn danger"
                        onClick={() => onRemove(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div className="cart-footer-actions">
              <button type="button" className="btn btn-outline" onClick={onClear}>
                Clear cart
              </button>
              <button type="button" className="btn btn-primary">
                Checkout
              </button>
            </div>
            <p className="cart-footnote">Demo cart · no payment processing</p>
          </div>
        )}
      </aside>
    </>
  )
}
