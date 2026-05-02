import { MARQUEE_WORDS } from '../data/products.js'

export default function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          {items.map((w, i) => (
            <span key={i}>
              {w}
              <span className="dot" />
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
