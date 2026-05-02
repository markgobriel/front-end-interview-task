import { useEffect, useRef, useState } from 'react'

const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAdded(false), 1100)
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.opacity = '0'
          }}
        />
        {product.tag && (
          <span className={`product-tag${product.tag === 'New In' ? ' new' : ''}`}>
            {product.tag}
          </span>
        )}
      </div>

      <div className="product-body">
        <div className="product-meta">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className={`add-btn${added ? ' added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            <span className="add-btn-label">
              {added ? 'Added' : 'Add'}
            </span>
            <span className="add-btn-icon" aria-hidden="true">
              {added ? '✓' : '+'}
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}
