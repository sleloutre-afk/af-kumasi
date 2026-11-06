'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'

/**
 * Vidéo d'ambiance du hero de l'accueil (spec « Médias et performance mobile ») :
 * - l'image fixe (poster) s'affiche toujours d'abord ;
 * - lecture automatique sur ordinateur et sur téléphone (voir autoplayAllowed) ;
 * - pas de téléchargement automatique en mode économie de données, en 2G, ni si
 *   le visiteur a demandé moins d'animations : un bouton « Lire la vidéo » la
 *   lance alors à la demande ;
 * - bouton lecture / pause toujours disponible ; pause quand le hero sort de l'écran.
 * Grand écran : vidéo 16:9 (≈ 2 Mo). Mobile : version recadrée en portrait (≈ 0,8 Mo).
 */

type Ctx = { playing: boolean; ready: boolean; toggle: () => void }
const HeroVideoContext = createContext<Ctx>({ playing: false, ready: false, toggle: () => {} })

type NetInfo = { saveData?: boolean; effectiveType?: string; type?: string }

/**
 * Peut-on lancer la vidéo sans que le visiteur l'ait demandé ?
 * Décision de Simon (6 nov. 2026, « option 3 ») : lecture automatique partout,
 * téléphones compris et même en données mobiles (version mobile ≈ 0,8 Mo) —
 * la spec prévoyait « Wi-Fi seulement sur mobile ». Garde-fous conservés :
 * « réduire les animations », économiseur de données (Android), connexion 2G.
 * (En mode économie d'énergie, Safari iOS bloque lui-même la lecture automatique :
 * l'image fixe reste affichée et le bouton « Lire la vidéo » reste disponible.)
 */
function autoplayAllowed(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const c = (navigator as Navigator & { connection?: NetInfo }).connection
  if (c?.saveData) return false
  if (c?.effectiveType && ['slow-2g', '2g'].includes(c.effectiveType)) return false
  return true
}

export function HeroVideoProvider({
  src,
  srcMobile,
  poster,
  posterMobile,
  children,
}: {
  src: string
  srcMobile: string
  poster: StaticImageData
  posterMobile: StaticImageData
  children: ReactNode
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const wanted = useRef(false) // le visiteur (ou la règle d'autoplay) veut la lecture
  const mobileRef = useRef(false)

  const start = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    wanted.current = true
    if (!v.src) {
      v.src = mobileRef.current ? srcMobile : src
      v.load()
    }
    v.play().catch(() => {
      wanted.current = false
      setPlaying(false)
    })
  }, [src, srcMobile])

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      wanted.current = false
      v.pause()
    } else start()
  }, [playing, start])

  useEffect(() => {
    mobileRef.current = window.matchMedia('(max-width: 760px)').matches
    setReady(true)
    if (autoplayAllowed()) start()

    // Pause quand le hero n'est plus visible, reprise quand il revient.
    const v = videoRef.current
    if (!v || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (!v.src) return
      if (entry.isIntersecting) {
        if (wanted.current) v.play().catch(() => {})
      } else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [start])

  return (
    <HeroVideoContext.Provider value={{ playing, ready, toggle }}>
      <div className="hero-media" aria-hidden="true">
        <Image src={poster} alt="" fill priority sizes="100vw" className="hero-poster d-only" placeholder="blur" />
        <Image src={posterMobile} alt="" fill priority sizes="100vw" className="hero-poster m-only" placeholder="blur" />
        <video
          ref={videoRef}
          className={loaded ? 'hero-video on' : 'hero-video'}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => {
            setLoaded(true)
            setPlaying(true)
          }}
          onPause={() => setPlaying(false)}
        />
      </div>
      {children}
    </HeroVideoContext.Provider>
  )
}

/** Bouton lecture / pause de la vidéo d'ambiance. */
export function HeroVideoToggle({ className }: { className?: string }) {
  const { playing, ready, toggle } = useContext(HeroVideoContext)
  return (
    <button type="button" className={className ? `hero-vid-btn ${className}` : 'hero-vid-btn'} onClick={toggle} disabled={!ready} aria-pressed={playing}>
      {playing ? (
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" />
          <rect x="14" y="5" width="4" height="14" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
    </button>
  )
}
