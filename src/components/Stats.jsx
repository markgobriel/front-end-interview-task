import { useEffect, useMemo, useRef, useState } from 'react'
import { STATS } from '../data/products.js'

const parseStatValue = (value) => {
  if (/^\d+(\.\d+)?k\+$/i.test(value)) {
    return { type: 'kplus', target: Number.parseFloat(value) }
  }
  if (/^\d+(\.\d+)?★$/.test(value)) {
    return { type: 'star', target: Number.parseFloat(value) }
  }
  if (/^\d+(\.\d+)?%$/.test(value)) {
    return { type: 'percent', target: Number.parseFloat(value) }
  }
  return { type: 'text', target: 0 }
}

const formatStatValue = (config, current, fallback) => {
  if (config.type === 'kplus') return `${Math.round(current)}k+`
  if (config.type === 'star') return `${current.toFixed(1)}★`
  if (config.type === 'percent') return `${Math.round(current)}%`
  return fallback
}

export default function Stats() {
  const sectionRef = useRef(null)
  const animationRef = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [progressValues, setProgressValues] = useState(() => STATS.map(() => 0))

  const configs = useMemo(() => STATS.map((s) => parseStatValue(s.value)), [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node || hasAnimated) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return undefined

    const durationMs = 1300
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / durationMs, 1)
      // Ease-out for a softer editorial motion.
      const eased = 1 - (1 - t) ** 3
      setProgressValues(configs.map((config) => config.target * eased))
      if (t < 1) {
        animationRef.current = requestAnimationFrame(tick)
      }
    }

    animationRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationRef.current)
  }, [configs, hasAnimated])

  return (
    <section className="stats" aria-labelledby="stats-heading" ref={sectionRef}>
      <div className="container">
        <div className="stats-head">
          <span className="eyebrow">Why people pop</span>
          <h2 id="stats-heading" className="section-title">
            Made to be <span className="serif">loved</span> daily.
          </h2>
          <p className="section-sub">
            We design every Popdrop piece to earn a permanent spot in your routine.
            Cute first, dependable forever.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-item" key={s.value}>
              <span className="stat-value">
                {formatStatValue(configs[i], progressValues[i], s.value)}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
