import { forwardRef } from 'react'
import { CATEGORIES, SORT_OPTIONS } from '../data/products.js'

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

const SearchFilters = forwardRef(function SearchFilters(
  {
    searchQuery,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    resultsCount
  },
  ref
) {
  return (
    <section className="filters" aria-label="Product filters">
      <div className="filters-row">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">
            <SearchIcon />
          </span>
          <label htmlFor="product-search" className="visually-hidden">
            Search products
          </label>
          <input
            id="product-search"
            ref={ref}
            className="search-input"
            type="search"
            placeholder="Search the drop..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="select-wrap">
          <label htmlFor="sort-select" className="visually-hidden">
            Sort products
          </label>
          <select
            id="sort-select"
            className="select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="category-row" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={category === c}
            className={`chip-btn${category === c ? ' active' : ''}`}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
        <span className="results-count" aria-live="polite">
          {resultsCount} {resultsCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </section>
  )
})

export default SearchFilters
