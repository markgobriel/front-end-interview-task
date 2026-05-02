import { useMemo, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { products } from '../data/products.js'

const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export default function ProductDetailPage({ onAdd }) {
  const { productId } = useParams()

  const product = useMemo(() => products.find((p) => p.id === productId), [productId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  return (
    <section className="product-detail-page" aria-labelledby="product-detail-title">
      <div className="container product-detail-inner">
        <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span className="product-detail-bc-sep" aria-hidden="true">/</span>
          <span className="product-detail-bc-current">{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-detail-media">
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
            />
          </div>

          <div className="product-detail-copy">
            {product.tag && (
              <span className={`product-detail-tag${product.tag === 'New In' ? ' new' : ''}`}>
                {product.tag}
              </span>
            )}
            <p className="product-detail-category">{product.category}</p>
            <h1 id="product-detail-title" className="product-detail-title">
              {product.name}
            </h1>
            <p className="product-detail-price">{formatPrice(product.price)}</p>
            <p className="product-detail-desc">{product.description}</p>

            <div className="product-detail-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onAdd(product)}
              >
                Add to cart
              </button>
              <Link to="/shop" className="btn btn-outline btn-lg">
                Keep browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
