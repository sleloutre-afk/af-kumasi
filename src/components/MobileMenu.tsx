'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { NAV, ROUTES, type RouteKey } from '@/lib/site'
import { LogoH } from './Logo'
import { Icon } from './Icons'

/**
 * En-tête des écrans étroits (< 1100 px) et son menu plein écran (maquettes
 * mobiles). Le menu se ferme avec la croix, la touche Échap ou en choisissant
 * une page ; le focus revient alors sur le bouton « menu ».
 */
export function MobileMenu({ current, enAvailable }: { current?: RouteKey; enAvailable: boolean }) {
  const [open, setOpen] = useState(false)
  const openBtn = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.documentElement.classList.add('menu-open')
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
      openBtn.current?.focus()
    }
  }, [open])

  return (
    <>
      <header className="mhdr">
        <LogoH sm />
        <div className="row g10">
          {enAvailable ? (
            <a className="ibtn line" href="/en" hrefLang="en" lang="en" aria-label="English version">
              EN
            </a>
          ) : (
            <button type="button" className="ibtn line" aria-disabled="true" title="English version coming soon" lang="en">
              EN
            </button>
          )}
          <button
            ref={openBtn}
            type="button"
            className="ibtn"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
      </header>

      {open && (
        <div className="mmenu" id="menu-mobile" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="top">
            <LogoH sm />
            <button ref={closeBtn} type="button" className="ibtn blk" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <Icon name="close" size={22} strokeWidth={2} />
            </button>
          </div>
          <nav aria-label="Navigation principale">
            <Link href={ROUTES.accueil} className={current === 'accueil' ? 'on' : undefined} aria-current={current === 'accueil' ? 'page' : undefined} onClick={() => setOpen(false)}>
              Accueil
            </Link>
            {NAV.map(({ key, label }) => (
              <Link
                key={key}
                href={ROUTES[key]}
                className={key === current ? 'on' : undefined}
                aria-current={key === current ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="bot">
            <div className="seg" role="group" aria-label="Langue">
              <button type="button" className="on" aria-pressed="true">
                Français
              </button>
              {enAvailable ? (
                <a href="/en" hrefLang="en" lang="en" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>
                  English
                </a>
              ) : (
                <button type="button" aria-disabled="true" title="English version coming soon" lang="en">
                  English
                </button>
              )}
            </div>
            <Link className="btn btn-red btn-block" href={ROUTES.contact} onClick={() => setOpen(false)}>
              Nous contacter
            </Link>
          </div>
          <div className="kente" />
        </div>
      )}
    </>
  )
}
