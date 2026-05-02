export default function Hero({ onShopClick }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            Make your<br />everyday <span className="pop">pop.</span>
          </h1>
          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary btn-lg" onClick={onShopClick}>
              Explore catalog
            </button>
          </div>

          <div className="hero-meta">
            <div className="meta-item">
              <strong>4.9★</strong>
              <span>2k+ reviews</span>
            </div>
            <div className="meta-item">
              <strong>Free</strong>
              <span>shipping over $40</span>
            </div>
            <div className="meta-item">
              <strong>30 days</strong>
              <span>easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
