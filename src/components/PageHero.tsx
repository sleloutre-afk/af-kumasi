import Link from 'next/link'
import type { ReactNode } from 'react'
import type { RouteKey } from '@/lib/site'
import { ROUTES } from '@/lib/site'
import { Header } from './Header'

/**
 * Visuel d'ouverture des pages intérieures (maquettes « phero ») : carrés qui
 * dérivent, motif « réseau » de la charte (points + pointillés), voile, puis
 * l'en-tête, le fil d'Ariane, le titre et la bande kente.
 *
 * `netDesktop` / `netMobile` : contenu SVG du motif réseau (viewBox 0 0 600 420),
 * différent sur grand écran et sur mobile dans les maquettes.
 */
export function PageHero({
  current,
  tone,
  crumb,
  crumbShort,
  crumbParent,
  eyebrow,
  title,
  titleMaxWidth,
  lead,
  netDesktop,
  netMobile,
  overlapBelow = false,
  eyebrowAlways,
  eyebrowPink,
  noKente = false,
  children,
}: {
  current?: RouteKey
  tone?: 'dk' | 'gb'
  crumb: string
  /** Libellé plus court du fil d'Ariane sur mobile. */
  crumbShort?: string
  crumbParent?: { label: string; href: string }
  eyebrow?: string
  title: ReactNode
  titleMaxWidth?: string
  lead?: ReactNode
  netDesktop: ReactNode
  netMobile: ReactNode
  /** Le bloc suivant chevauche le bas du visuel sur grand écran (page Services) : pas de bande kente sur grand écran. */
  overlapBelow?: boolean
  /** Surtitre affiché aussi sur mobile (page Contact : « Akwaaba »). */
  eyebrowAlways?: string
  /** Surtitre rose, grand écran seulement (page Agenda : « Saison culturelle… »). */
  eyebrowPink?: string
  /** Pas de bande kente sous le visuel (page Agenda). */
  noKente?: boolean
  children?: ReactNode
}) {
  return (
    <section className={['phero', tone, overlapBelow && 'phero-ov', noKente && 'phero-nk'].filter(Boolean).join(' ')}>
      <div className="deco" aria-hidden="true">
        <div className="sq a" />
        <div className="sq b" />
        <div className="sq c" />
      </div>
      {netDesktop && (
        <svg className="net d-only" aria-hidden="true" viewBox="0 0 600 420">
          {netDesktop}
        </svg>
      )}
      {netMobile && (
        <svg className="net m-only" aria-hidden="true" viewBox="0 0 600 420">
          {netMobile}
        </svg>
      )}
      <div className="veil" aria-hidden="true" />
      <Header current={current} />
      <div className="wrap phero-b">
        <nav className="crumbs rise" aria-label="Fil d’Ariane">
          <Link href={ROUTES.accueil}>Accueil</Link>
          {crumbParent && (
            <span>
              <Link href={crumbParent.href}>{crumbParent.label}</Link>
            </span>
          )}
          <span aria-current="page">
            {crumbShort ? (
              <>
                <span className="d-only-i">{crumb}</span>
                <span className="m-only-i">{crumbShort}</span>
              </>
            ) : (
              crumb
            )}
          </span>
        </nav>
        {eyebrow && <p className="eyebrow w rise d-only">{eyebrow}</p>}
        {eyebrowAlways && <p className="eyebrow w rise">{eyebrowAlways}</p>}
        {eyebrowPink && <p className="eyebrow pk rise d-only">{eyebrowPink}</p>}
        <h1 className="h1 rise d1s" style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}>
          {title}
        </h1>
        {lead && <p className="lead wsoft rise d2s">{lead}</p>}
        {children}
      </div>
      {!noKente && <div className={overlapBelow ? 'kente m-only' : 'kente'} style={{ position: 'relative', zIndex: 2 }} />}
    </section>
  )
}

/**
 * Liens « Sur cette page » sous le visuel d'ouverture : liens fléchés sur grand
 * écran, pastilles défilantes sur mobile (libellé court possible).
 */
export function PageAnchors({ items }: { items: { href: string; label: string; short?: string; desktopOnly?: boolean }[] }) {
  return (
    <>
      <nav className="d-only" aria-label="Sur cette page" style={{ background: '#fff', borderBottom: '1px solid #e4e1e0' }}>
        <div className="wrap row g28" style={{ minHeight: 68 }}>
          {items.map((i) => (
            <a key={i.href} className="tlink" href={i.href} style={{ color: '#1a171b' }}>
              {i.label}
            </a>
          ))}
        </div>
      </nav>
      <nav className="rail m-only" aria-label="Sur cette page" style={{ padding: '12px 16px', borderBottom: '1px solid #e4e1e0' }}>
        {items.filter((i) => !i.desktopOnly).map((i) => (
          <a key={i.href} className="chip dk" href={i.href}>
            {i.short ?? i.label}
          </a>
        ))}
      </nav>
    </>
  )
}
