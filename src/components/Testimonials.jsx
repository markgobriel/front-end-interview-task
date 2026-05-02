import { useCallback, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { TESTIMONIALS, products as ALL_PRODUCTS } from '../data/products.js'

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function TestimonialCard({ testimonial, motion }) {
  const product = ALL_PRODUCTS.find((p) => p.id === testimonial.productId)

  return (
    <figure className={`testimonial testimonial-motion testimonial-motion--${motion}`}>
      <span className="stars" aria-hidden="true">★★★★★</span>
      <blockquote className="quote">“{testimonial.quote}”</blockquote>
      {product && (
        <div className="testimonial-product">
          <span className="testimonial-product-label">Loved:</span>{' '}
          <Link to={`/product/${product.id}`} className="testimonial-product-link">
            {product.name}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      )}
      <figcaption className="author">
        <strong>{testimonial.author}</strong>
        <span>{testimonial.location}</span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const n = TESTIMONIALS.length
  const [center, setCenter] = useState(0)
  const carouselId = useId()

  const leftIdx = (center - 1 + n) % n
  const rightIdx = (center + 1) % n

  const go = useCallback(
    (delta) => {
      setCenter((i) => {
        let next = (i + delta) % n
        if (next < 0) next += n
        return next
      })
    },
    [n]
  )

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        setCenter(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setCenter(n - 1)
      }
    },
    [go, n]
  )

  const tLeft = TESTIMONIALS[leftIdx]
  const tCenter = TESTIMONIALS[center]
  const tRight = TESTIMONIALS[rightIdx]

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Customer love</span>
            <h2 id="testimonials-heading" className="section-title">
              The drop, <span className="serif">in their words.</span>
            </h2>
          </div>
        </div>

        <div
          className="testimonials-carousel-shell"
          id={carouselId}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="testimonials-heading"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="testimonials-carousel-row">
            <button
              type="button"
              className="testimonials-nav testimonials-nav-prev"
              onClick={() => go(-1)}
              aria-label="Previous review — shift spotlight left"
              aria-controls={`${carouselId}-trio`}
            >
              <ChevronLeft />
            </button>

            <div id={`${carouselId}-trio`} className="testimonials-trio-cards">
              <div className="testimonial-slot testimonial-slot--side testimonial-slot--left" aria-hidden="true">
                <TestimonialCard key={leftIdx} testimonial={tLeft} motion="side-left" />
              </div>

              <div className="testimonial-slot testimonial-slot--center" aria-live="polite" aria-atomic="true">
                <TestimonialCard key={center} testimonial={tCenter} motion="center" />
              </div>

              <div className="testimonial-slot testimonial-slot--side testimonial-slot--right" aria-hidden="true">
                <TestimonialCard key={rightIdx} testimonial={tRight} motion="side-right" />
              </div>
            </div>

            <button
              type="button"
              className="testimonials-nav testimonials-nav-next"
              onClick={() => go(1)}
              aria-label="Next review — shift spotlight right"
              aria-controls={`${carouselId}-trio`}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="testimonials-dots" role="group" aria-label="Choose featured review">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={`dot-${t.author}-${i}`}
                type="button"
                aria-pressed={i === center}
                aria-label={`Show ${t.author} in the center (${i + 1} of ${n})`}
                className={`testimonials-dot${i === center ? ' active' : ''}`}
                onClick={() => setCenter(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
