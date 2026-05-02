export default function CategoryShowcase({ onPickCategory }) {
  const cards = [
    {
      key: 'Clothing',
      eyebrow: 'SS26 · 02',
      title: 'Cozy clothing',
      cta: 'Shop clothing',
      cls: 'showcase-clothing'
    },
    {
      key: 'Electronics',
      eyebrow: 'New In',
      title: 'Smart little things',
      cta: 'Shop electronics',
      cls: 'showcase-electronics'
    },
    {
      key: 'Accessories',
      eyebrow: 'Most Wanted',
      title: 'Tiny upgrades',
      cta: 'Shop accessories',
      cls: 'showcase-accessories'
    }
  ]

  return (
    <section className="showcase" aria-labelledby="showcase-heading">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 id="showcase-heading" className="section-title">
              The whole <span className="serif">vibe.</span>
            </h2>
          </div>
          <p className="section-sub">
            Three little worlds packed with feel-good things to wear, plug in,
            and carry around.
          </p>
        </div>

        <div className="showcase-grid">
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`showcase-card ${c.cls}`}
              onClick={() => onPickCategory(c.key)}
              aria-label={`${c.cta}`}
            >
              <span className="sc-eyebrow">{c.eyebrow}</span>
              <span className="sc-title">{c.title}</span>
              <span className="sc-link">
                {c.cta} <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
