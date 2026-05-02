import { ANNOUNCEMENTS } from '../data/products.js'

export default function AnnouncementBar() {
  // Duplicate the list so the CSS marquee animation can loop seamlessly.
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]
  return (
    <div className="announce" role="region" aria-label="Site announcements">
      <div className="announce-track">
        <span>
          {items.map((msg, i) => (
            <span key={i}>
              {msg}
              <span className="sep" aria-hidden="true">·</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
