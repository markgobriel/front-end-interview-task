import { useEffect } from 'react'
import SearchFilters from '../components/SearchFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function ShopPage({
  catalogRef,
  searchInputRef,
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  resultsCount,
  paginatedProducts,
  shopPage,
  totalShopPages,
  onPrevPage,
  onNextPage,
  onAdd,
  onClearFilters
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section
      className="catalog"
      id="products"
      ref={catalogRef}
      aria-labelledby="catalog-heading"
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">SS26 · The Drop</span>
            <h2 id="catalog-heading" className="section-title">
              The whole <span className="serif">drop.</span>
            </h2>
          </div>
          <p className="section-sub">
            Hand-picked everyday goodies — search, filter, sort, and add the
            ones that pop.
          </p>
        </div>

        <SearchFilters
          ref={searchInputRef}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          category={category}
          onCategoryChange={onCategoryChange}
          sort={sort}
          onSortChange={onSortChange}
          resultsCount={resultsCount}
        />

        <ProductGrid
          products={paginatedProducts}
          totalItems={resultsCount}
          page={shopPage}
          totalPages={totalShopPages}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onAdd={onAdd}
          onClearFilters={onClearFilters}
        />
      </div>
    </section>
  )
}
