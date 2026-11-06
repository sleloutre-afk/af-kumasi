import Link from 'next/link'
import type { Coordonnees } from '@/lib/reglages'
import { ROUTES } from '@/lib/site'
import { Icon, type IconName } from './Icons'
import { LogoV } from './Logo'
import { MapBlock } from './MapBlock'

const SOC_ICON: Record<string, IconName> = { Facebook: 'facebook', Instagram: 'instagram', LinkedIn: 'linkedin' }

/**
 * Pied de page commun. Grand écran : 4 colonnes (logo, coordonnées et réseaux,
 * accès rapides, carte). Écran étroit : logo, carte, boutons Appeler / WhatsApp /
 * Itinéraire, coordonnées (maquettes mobiles).
 */
export function Footer({ c }: { c: Coordonnees }) {
  const itineraire = c.itineraireHref ?? ROUTES.contact
  const year = new Date().getFullYear()
  return (
    <footer className="ftr">
      <div className="kente" />

      {/* Grand écran */}
      <div className="wrap ftr-grid d-only">
        <div className="stack g18">
          <LogoV />
          <p className="q">Membre du réseau mondial de la Fondation des Alliances Françaises.</p>
        </div>
        <div className="stack g14">
          <p className="fh">Nous trouver</p>
          <p>
            {c.adresse}
            <br />
            Kumasi, Ghana
          </p>
          <p>
            <Contact href={c.telHref}>{c.telephone}</Contact> · <Contact href={c.mailHref}>{c.email}</Contact>
          </p>
          <p className="q">Horaires d’accueil&nbsp;: {c.horairesResume}</p>
          <Socials c={c} />
        </div>
        <div className="stack g6">
          <p className="fh">Accès rapides</p>
          <Link className="flink" href={ROUTES.cours}>
            Cours de français
          </Link>
          <Link className="flink" href={`${ROUTES.services}#examens`}>
            Examens DELF · DALF · TCF
          </Link>
          <Link className="flink" href={ROUTES.agenda}>
            Agenda culturel
          </Link>
          <Link className="flink" href={`${ROUTES.services}#mediatheque`}>
            Médiathèque
          </Link>
          <Link className="flink" href={ROUTES.rejoindre}>
            Nous rejoindre
          </Link>
        </div>
        <div className="stack g10">
          <MapBlock src={c.carteIntegree} />
          <a className="btn btn-white" href={itineraire} {...external(c.itineraireHref)}>
            Itinéraire
          </a>
        </div>
      </div>

      {/* Écran étroit */}
      <div className="wrap ftr-grid m-only">
        <LogoV />
        <MapBlock src={c.carteIntegree} style={{ minHeight: 190 }} />
        <div className="ftr-acts">
          <a className="btn btn-linew" href={c.telHref ?? ROUTES.contact}>
            <Icon name="tel" size={20} />
            Appeler
          </a>
          <a className="btn btn-linew" href={c.waHref ?? ROUTES.contact} {...external(c.waHref)}>
            <Icon name="whatsapp" size={20} />
            WhatsApp
          </a>
          <a className="btn btn-linew" href={itineraire} {...external(c.itineraireHref)}>
            <Icon name="pin" size={20} />
            Itinéraire
          </a>
        </div>
        <div className="stack g6">
          <p>{c.adresse} · Kumasi, Ghana</p>
          <p>
            <Contact href={c.telHref}>{c.telephone}</Contact> · <Contact href={c.mailHref}>{c.email}</Contact>
          </p>
          <p className="q">Horaires d’accueil&nbsp;: {c.horairesResume}</p>
          <Socials c={c} />
        </div>
        <p className="q">Membre du réseau mondial de la Fondation des Alliances Françaises.</p>
      </div>

      <div className="wrap">
        <div className="ftr-bot">
          <span>© {year} Alliance Française de Kumasi</span>
          <span className="row g18">
            <Link href={ROUTES.mentions}>Mentions légales</Link>
            <Link href={ROUTES.confidentialite}>Confidentialité</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

/** Un lien seulement si l'information est renseignée ; sinon le marqueur, en texte. */
function Contact({ href, children }: { href: string | null; children: string }) {
  return href ? <a href={href}>{children}</a> : <>{children}</>
}

function Socials({ c }: { c: Coordonnees }) {
  if (!c.reseaux.length) return null
  return (
    <div className="soc">
      {c.reseaux.map((r) => (
        <a key={r.nom} href={r.href} aria-label={r.nom} target="_blank" rel="noopener noreferrer">
          <Icon name={SOC_ICON[r.nom]} />
        </a>
      ))}
    </div>
  )
}

/** Les liens vers un autre site (Google Maps, WhatsApp) s'ouvrent dans un nouvel onglet. */
export function external(href: string | null) {
  return href && href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
