import ProductCard from './ProductCard.jsx'

export default function ProductGrid({
  products,
  totalItems,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  onAdd,
  onClearFilters
}) {
  if (totalItems === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-emoji" aria-hidden="true">✦</div>
        <h3 className="empty-title">
          No goodies <span className="serif">found.</span>
        </h3>
        <p className="empty-sub">Try a different search or filter combo.</p>
        <button type="button" className="btn btn-outline" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div className="catalog-products">
      <div className="product-grid">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="product-grid-item"
            style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
          >
            <ProductCard product={p} onAdd={onAdd} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="catalog-pagination" aria-label="Product pages">
          <button
            type="button"
            className="pagination-btn"
            onClick={onPrevPage}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            ←
          </button>
          <span className="pagination-meta" aria-live="polite">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="pagination-btn"
            onClick={onNextPage}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            →
          </button>
        </nav>
      )}
    </div>
  )
}
