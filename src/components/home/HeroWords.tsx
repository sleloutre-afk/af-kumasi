'use client'

import { useEffect, useState } from 'react'

const WORDS = ['en classe.', 'à l’écran.', 'en musique.', 'en famille.', 'pour la vie.']

/**
 * « Le français, en classe. / à l'écran. / en musique… » : un mot toutes les
 * 2,6 s (maquette). Les lecteurs d'écran n'entendent que la première
 * formulation ; le défilement s'arrête si le visiteur a demandé moins d'animations.
 */
export function HeroWords() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="hw">
      <span className="sr-only">{WORDS[0]}</span>
      {WORDS.map((w, n) => (
        <span key={w} className={n === i ? 'hw-w on' : 'hw-w'} aria-hidden="true">
          {w}
        </span>
      ))}
    </span>
  )
}
