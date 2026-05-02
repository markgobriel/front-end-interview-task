import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2400)
    setEmail('')
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <div className="container newsletter-inner">
        <div>
          <span className="eyebrow">Stay in the loop</span>
          <h2 id="newsletter-heading">
            Get 10% off your <span className="serif">first drop.</span>
          </h2>
          <p>
            New arrivals, member rewards, and the occasional little surprise —
            straight to your inbox. No spam, promise.
          </p>
        </div>

        <div>
          <form className="newsletter-form" onSubmit={onSubmit}>
            <label htmlFor="newsletter-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" className="btn btn-primary">
              {submitted ? 'Subscribed!' : 'Sign me up'}
            </button>
          </form>
          <p className="newsletter-note">
            By subscribing you agree to our friendly terms. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
