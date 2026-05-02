import { useEffect, useMemo, useRef, useState } from 'react'
import SearchFilters from '../components/SearchFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { products as ALL_PRODUCTS, SHOP_PAGE_SIZE } from '../data/products.js'

const NEW_IN_TAG = 'New In'

export default function NewArrivalsPage({ catalogRef, onAdd }) {
  const searchInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const displayedProducts = useMemo(() => {
    const base = ALL_PRODUCTS.filter((p) => p.tag === NEW_IN_TAG)
    const q = searchQuery.trim().toLowerCase()
    let list = base.filter((p) =>
      q === '' ? true : p.name.toLowerCase().includes(q)
    )
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
  }, [searchQuery, category, sort])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, category, sort])

  const totalPages = Math.max(
    1,
    Math.ceil(displayedProducts.length / SHOP_PAGE_SIZE)
  )

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * SHOP_PAGE_SIZE
    return displayedProducts.slice(start, start + SHOP_PAGE_SIZE)
  }, [displayedProducts, page])

  const goPage = (next) => {
    const clamped = Math.max(1, Math.min(next, totalPages))
    setPage(clamped)
    queueMicrotask(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setCategory('All')
    setSort('featured')
    setPage(1)
  }

  return (
    <section
      className="catalog catalog-new-arrivals"
      id="new-arrivals"
      ref={catalogRef}
      aria-labelledby="new-arrivals-heading"
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">SS26 · New In</span>
            <h2 id="new-arrivals-heading" className="section-title">
              New <span className="serif">arrivals.</span>
            </h2>
          </div>
          <p className="section-sub">
            Fresh picks just dropped — browse, refine, and add what speaks to you.
          </p>
        </div>

        <SearchFilters
          ref={searchInputRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          resultsCount={displayedProducts.length}
        />

        <ProductGrid
          products={paginatedProducts}
          totalItems={displayedProducts.length}
          page={page}
          totalPages={totalPages}
          onPrevPage={() => goPage(page - 1)}
          onNextPage={() => goPage(page + 1)}
          onAdd={onAdd}
          onClearFilters={clearFilters}
        />
      </div>
    </section>
  )
}
