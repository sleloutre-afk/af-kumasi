import Link from 'next/link'
import { EN_AVAILABLE, NAV, ROUTES, type RouteKey } from '@/lib/site'
import { LogoH } from './Logo'
import { MobileMenu } from './MobileMenu'

/**
 * En-tête posé sur le visuel d'ouverture de chaque page (texte blanc).
 * - Grand écran (≥ 1100 px) : logo, navigation, sélecteur FR/EN, bouton « Nous contacter ».
 * - Écran étroit : logo, bouton de langue, bouton menu (menu plein écran, MobileMenu).
 *
 * Le site est purement informatif : le bouton « S'inscrire » des maquettes est
 * remplacé par « Nous contacter » (décision de Simon, 6 nov. 2026).
 */
export function Header({ current }: { current?: RouteKey }) {
  return (
    <>
      <header className="wrap hdr">
        <LogoH />
        <nav className="nav" aria-label="Navigation principale">
          {NAV.map(({ key, label }) => (
            <Link
              key={key}
              className={key === current ? 'navlink on' : 'navlink'}
              href={ROUTES[key]}
              aria-current={key === current ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="row g14">
          <LangSwitch />
          <Link className="btn btn-red" href={ROUTES.contact} style={{ minHeight: 44, padding: '0 20px', fontSize: 15 }}>
            Nous contacter
          </Link>
        </div>
      </header>
      <MobileMenu current={current} enAvailable={EN_AVAILABLE} />
    </>
  )
}

/** Sélecteur FR / EN. Tant que la version anglaise n'existe pas, « EN » est visible mais inactif. */
export function LangSwitch() {
  return (
    <div className="langsw" role="group" aria-label="Langue">
      <span className="on" aria-current="true" style={{ display: 'inline-flex', alignItems: 'center', padding: '0 14px', minHeight: 36, borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
        FR
      </span>
      {EN_AVAILABLE ? (
        <a href="/en" hrefLang="en" lang="en">
          EN
        </a>
      ) : (
        <button type="button" aria-disabled="true" title="English version coming soon" lang="en">
          EN
        </button>
      )}
    </div>
  )
}
