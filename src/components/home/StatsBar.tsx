'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = { value: number | string; suffix?: string; label: string; labelCourt?: string }

/**
 * Bandeau des chiffres clés. Les nombres montent de 0 à leur valeur en 1,8 s
 * quand le bandeau apparaît à l'écran (maquette). Le chiffre final est
 * présent dès le départ dans la page (référencement, lecteurs d'écran, sans JavaScript).
 */
export function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState(1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    setT(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1800)
          setT(p)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const ease = 1 - Math.pow(1 - t, 3)
  return (
    <div ref={ref} className="wrap stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-v serif">
            <span aria-hidden="true">{typeof s.value === 'number' ? Math.round(s.value * ease) : s.value}</span>
            <span className="sr-only">{s.value}</span>
            {s.suffix}
          </span>
          <span className="stat-l">
            {s.labelCourt ? (
              <>
                <span className="d-only">{s.label}</span>
                <span className="m-only">{s.labelCourt}</span>
              </>
            ) : (
              s.label
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
