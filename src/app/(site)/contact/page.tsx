import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { external } from '@/components/Footer'
import { Icon } from '@/components/Icons'
import { PageShell } from '@/components/PageShell'
import { PageHero } from '@/components/PageHero'
import { SUJETS } from '@/lib/forms'
import { getCoordonnees, type Coordonnees } from '@/lib/reglages'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Téléphone, WhatsApp, e-mail, adresse et horaires de l’Alliance Française de Kumasi. Écrivez-nous, nous vous répondons.',
}

type Props = { searchParams: Promise<{ sujet?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const c = await getCoordonnees()
  // Lien depuis une autre page (« Demander un devis » → sujet Traduction…) : sujet présélectionné.
  const sujetDemande = (await searchParams).sujet ?? ''
  const sujet = (SUJETS as readonly string[]).includes(sujetDemande) ? sujetDemande : ''
  const itineraire = c.itineraireHref

  return (
    <PageShell>
      <PageHero
        current="contact"
        crumb="Contact"
        title={
          <>
            Venez nous <i>rencontrer</i>
          </>
        }
        netDesktop={
          <>
            <path className="ln" d="M40 70L180 150L320 100L460 50M180 150L220 290L110 380M220 290L390 320L540 220M320 100L390 320M540 220L580 100" />
            <circle className="pulse" cx="40" cy="70" r="7" fill="#fff" />
            <circle className="pulse" cx="180" cy="150" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.6s' }} />
            <circle className="pulse" cx="320" cy="100" r="12" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.2s' }} />
            <rect x="453" y="43" width="14" height="14" fill="#1a171b" />
            <circle className="pulse" cx="390" cy="320" r="9" fill="#fff" style={{ animationDelay: '1.8s' }} />
            <rect x="532" y="212" width="16" height="16" fill="#da002e" stroke="#fff" strokeWidth="2" />
          </>
        }
        netMobile={
          <>
            <path className="ln" d="M240 60L380 150L540 90M380 150L340 300L500 360M340 300L200 340" />
            <circle className="pulse" cx="240" cy="60" r="8" fill="#fff" />
            <circle className="pulse" cx="380" cy="150" r="13" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.8s' }} />
            <rect x="532" y="82" width="16" height="16" fill="#1a171b" />
            <circle className="pulse" cx="340" cy="300" r="11" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.6s' }} />
          </>
        }
        overlapBelow
        eyebrowAlways="Akwaaba"
      />

      {/* Quatre façons de nous joindre. */}
      <div className="wrap sv-quick">
        <div className="grid ct-tiles">
          <ContactTile href={c.telHref} icon="tel" label="Appeler" value={c.telephone} />
          <ContactTile href={c.waHref} icon="whatsappPlus" label="WhatsApp" value={c.whatsapp} redMobile />
          <ContactTile href={c.mailHref} icon="mail" label="Email" value={c.email} />
          <ContactTile
            href="#plan"
            icon="pin"
            label="Nous rendre visite"
            labelMobile="Itinéraire"
            value={`${c.adresse.replace(/^\[ADRESSE À COMPLÉTER\]$/, '[ADRESSE]')}, Kumasi`}
            valueMobile={c.adresse.replace(/^\[ADRESSE À COMPLÉTER\]$/, '[ADRESSE]')}
            redDesktop
          />
        </div>
      </div>

      <div className="ct-flow">
        {/* Formulaire + colonne horaires / raccourcis */}
        <section id="ecrire" className="wrap sec ct-form">
          <div className="split">
            <div className="main stack g28">
              <div className="stack g18">
                <p className="eyebrow">Écrivez-nous</p>
                <h2 className="h2">
                  Une question&nbsp;?{' '}
                  <i>
                    <span className="d-only-i">Nous vous répondons.</span>
                    <span className="m-only-i">Nous répondons.</span>
                  </i>
                </h2>
              </div>
              <ContactForm delaiReponse={c.delaiReponse} initialSujet={sujet} />
            </div>
            <aside className="aside stack g18 d-only">
              <div className="paper" style={{ padding: '30px 28px' }}>
                <h3 className="h3">Horaires d’accueil</h3>
                <Horaires c={c} width={130} style={{ margin: '18px 0 0' }} />
              </div>
              <div className="dark" style={{ padding: '30px 28px' }}>
                <h3 className="h3">Vous cherchez…</h3>
                <div className="stack g6" style={{ marginTop: 14 }}>
                  <Raccourcis />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Plan d'accès */}
        <section id="plan" className="ct-plan">
          <div className="map lg ct-map">
            {c.carteIntegree ? (
              <iframe src={c.carteIntegree} title="Plan d’accès à l’Alliance Française de Kumasi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <>
                <div className="pin" aria-hidden="true">
                  <span className="pl ct-pl">
                    <span className="d-only-i">Alliance Française de Kumasi</span>
                    <span className="m-only-i">Alliance Française</span>
                  </span>
                  <span className="pt" />
                  <span className="pd" />
                </div>
                <span className="lbl">Carte Google Maps intégrée</span>
              </>
            )}
            <div className="ct-card d-only">
              <h2 className="h4" style={{ fontSize: 26 }}>
                Comment venir
              </h2>
              <p className="p small muted">
                {c.adresse === '[ADRESSE À COMPLÉTER]' ? '[ADRESSE COMPLÈTE]' : c.adresse}
                <br />
                Kumasi, région Ashanti, Ghana
              </p>
              <p className="p small muted">Repères&nbsp;: {c.reperes}</p>
              <a className="btn btn-red arr" href={itineraire ?? '#plan'} {...external(itineraire)} style={{ alignSelf: 'flex-start' }}>
                Itinéraire Google Maps
              </a>
            </div>
          </div>
          <div className="wrap stack g6 m-only" style={{ paddingTop: 16 }}>
            <p className="p">{c.adresse === '[ADRESSE À COMPLÉTER]' ? '[ADRESSE COMPLÈTE]' : c.adresse} · Kumasi, région Ashanti</p>
            <p className="p small muted">Repères&nbsp;: {c.reperes}</p>
            {itineraire && (
              <a className="btn btn-red btn-block arr" href={itineraire} {...external(itineraire)}>
                Itinéraire Google Maps
              </a>
            )}
          </div>
          <div className="wrap m-only" style={{ paddingTop: 28 }}>
            <details className="acc" style={{ borderTop: '2px solid #1a171b' }}>
              <summary>Horaires d’accueil</summary>
              <div className="acc-b">
                <Horaires c={c} width={120} style={{ borderTop: 0 }} />
              </div>
            </details>
          </div>
        </section>

        {/* Raccourcis (mobile, en bas de page) */}
        <section className="dark m-only ct-short">
          <div className="wrap sec-s stack g10">
            <h2 className="h3">Vous cherchez…</h2>
            <Raccourcis />
          </div>
        </section>
      </div>
    </PageShell>
  )
}

function ContactTile({
  href,
  icon,
  label,
  labelMobile,
  value,
  valueMobile,
  redDesktop = false,
  redMobile = false,
}: {
  href: string | null
  icon: 'tel' | 'whatsappPlus' | 'mail' | 'pin'
  label: string
  labelMobile?: string
  value: string
  valueMobile?: string
  redDesktop?: boolean
  redMobile?: boolean
}) {
  const cls = ['tile', 'lift', 'ct-tile', redDesktop && 'ct-red-d', redMobile && 'ct-red-m'].filter(Boolean).join(' ')
  const content = (
    <>
      <Icon name={icon} size={44} strokeWidth={1.6} className="icon ct-ic" />
      <span className="p up muted ct-l d-only">{label}</span>
      <span className="h4 ct-l-m m-only">{labelMobile ?? label}</span>
      <span className="h4 ct-v d-only">{value}</span>
      <span className="xs muted ct-v-m m-only">{valueMobile ?? value}</span>
    </>
  )
  // Tant que l'information n'est pas renseignée (marqueur [TÉLÉPHONE]…), la case n'est pas un lien.
  return href ? (
    <a className={cls} href={href} {...external(href)}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}

function Horaires({ c, width, style }: { c: Coordonnees; width: number; style?: React.CSSProperties }) {
  const rows: [string, string][] = [
    ['Lun. – Ven.', c.horairesSemaine],
    ['Samedi', c.horairesSamedi],
    ['Dimanche', c.horairesDimanche],
    ['Médiathèque', c.horairesMediatheque],
  ]
  return (
    <dl className="facts" style={style}>
      {rows.map(([j, h]) => (
        <div key={j} className="fact" style={{ gridTemplateColumns: `${width}px minmax(0, 1fr)` }}>
          <dt>{j}</dt>
          <dd>{h}</dd>
        </div>
      ))}
    </dl>
  )
}

function Raccourcis() {
  return (
    <>
      <Link className="flink" href={ROUTES.cours}>
        Nos cours de français
      </Link>
      <Link className="flink" href={`${ROUTES.services}#examens`}>
        Les dates d’examens
      </Link>
      <Link className="flink" href={ROUTES.agenda}>
        L’agenda culturel
      </Link>
      <Link className="flink" href={ROUTES.rejoindre}>
        Nos offres d’emploi
      </Link>
    </>
  )
}
