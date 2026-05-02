import { useEffect, useRef, useState } from 'react'

const LERP = 0.135

export default function CursorFollower() {
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const syncedRef = useRef(false)
  const rafRef = useRef(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(mqFine.matches && !mqReduce.matches)

    sync()
    mqFine.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqFine.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    syncedRef.current = false
    const follower = followerRef.current
    let active = false

    const onMove = (e) => {
      if (!syncedRef.current) {
        syncedRef.current = true
        const p = { x: e.clientX, y: e.clientY }
        pos.current = p
        target.current = p
      } else {
        target.current = { x: e.clientX, y: e.clientY }
      }
      if (!active && follower) {
        active = true
        follower.classList.add('cursor-ring--visible')
      }
    }

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP
      if (follower) {
        follower.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor-ring-root" aria-hidden="true">
      <div ref={followerRef} className="cursor-ring" />
    </div>
  )
}
