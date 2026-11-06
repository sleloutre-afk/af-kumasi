import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DateBlock } from '@/components/EventMedia'
import { external } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MapBlock } from '@/components/MapBlock'
import { PageShell } from '@/components/PageShell'
import { Ph } from '@/components/Ph'
import { dateLongue, dateMoyenne, heure } from '@/lib/dates'
import { aussiALaffiche, carte, estPasse, parSlug, tousLesSlugs } from '@/lib/evenements'
import { getCoordonnees, waWithText } from '@/lib/reglages'
import { ROUTES, SITE_URL } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

// Le statut (à venir, terminé) dépend de la date du jour : régénérée au plus toutes les heures.
export const revalidate = 3600

export function generateStaticParams() {
  return tousLesSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = parSlug((await params).slug)
  if (!e) return {}
  return { title: e.titre, description: e.accroche, openGraph: { title: e.titre, description: e.accroche } }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default async function EvenementPage({ params }: Props) {
  const e = parSlug((await params).slug)
  if (!e) notFound()

  const now = new Date()
  const c = await getCoordonnees()
  const k = carte(e)
  const debut = new Date(e.debut)
  const fin = e.fin ? new Date(e.fin) : null
  const surPlusieursJours = fin && dateLongue(fin) !== dateLongue(debut)
  const termine = estPasse(e, now)
  const url = `${SITE_URL}/agenda/${e.slug}`
  const icsHref = `/agenda/${e.slug}/calendrier.ics`
  // Partage WhatsApp : lien + accroche (spec).
  const partage = `https://wa.me/?text=${encodeURIComponent(`${e.titre} — ${e.accroche}\n${url}`)}`
  const renseigner = waWithText(c.waHref, `Bonjour, je souhaite me renseigner sur l’événement « ${e.titre} » (${dateMoyenne(debut)}).`)

  const dateTxt = surPlusieursJours ? `Du ${dateLongue(debut)} au ${dateLongue(fin!)}` : cap(dateLongue(debut))
  const horaire = surPlusieursJours ? heure(debut) : fin ? `${heure(debut)} – ${heure(fin)}` : heure(debut)
  const titreMots = e.titre.split(' ')
  const titreFin = titreMots.length > 2 ? titreMots.pop() : null
  const autres = aussiALaffiche(e.slug, now).map((x) => carte(x))

  const facts: [string, string][] = [
    ['Date', dateTxt],
    ['Horaire', horaire],
    ['Lieu', `${e.lieu}, Kumasi`],
    ['Tarif', e.tarifDetail ?? `Entrée ${k.tarif}`],
    ...(e.public ? ([['Public', e.public]] as [string, string][]) : []),
    ...(e.langue ? ([['Langue', e.langue]] as [string, string][]) : []),
  ]

  return (
    <PageShell
      mobileAction={termine ? undefined : { label: 'Ajouter à mon agenda', href: icsHref }}
      mobileWa={{ href: partage, label: 'Partager sur WhatsApp' }}
    >
      {/* Visuel : bande-annonce (image fixe d'abord, à fournir), puis titre. */}
      <section className="phero dk ev-hero">
        <Ph tone={k.ton} video word={e.categorie} play cap={`Bande-annonce · ${e.titre} (à fournir)`} className="ev-hero-ph" />
        <div className="ev-hero-veil" aria-hidden="true" />
        <Header current="agenda" />
        <div className="wrap phero-b ev-hero-b">
          <nav className="crumbs rise" aria-label="Fil d’Ariane">
            <Link className="d-only-i" href={ROUTES.accueil}>
              Accueil
            </Link>
            <span className="d-only-i">
              <Link href={ROUTES.agenda}>Agenda</Link>
            </span>
            <span className="d-only-i" aria-current="page">
              {e.titre}
            </span>
            <Link className="m-only-i" href={ROUTES.agenda}>
              ‹ Agenda
            </Link>
          </nav>
          <div className="row g10 rise">
            <span className="badge" style={{ background: '#da002e', color: '#fff' }}>
              {e.categorie}
            </span>
            {e.etiquettes?.map((t) => (
              <span key={t} className="badge w">
                {t}
              </span>
            ))}
            <span className="badge w d-only">Entrée {k.tarif}</span>
            {e.annule && <span className="badge dk">Annulé</span>}
            {termine && <span className="badge dk">Événement terminé</span>}
          </div>
          <h1 className="h1 rise d1s" style={{ maxWidth: '14ch' }}>
            {titreFin ? (
              <>
                {titreMots.join(' ')} <i>{titreFin}</i>
              </>
            ) : (
              e.titre
            )}
          </h1>
          <p className="lead wsoft rise d2s ev-hero-l">
            <span className="d-only-i">
              {dateTxt} · {heure(debut)} · {e.lieu}
            </span>
            <span className="m-only-i">
              {dateMoyenne(debut)} · {heure(debut)}
            </span>
          </p>
          <p className="row g10 xs up soft d-only" style={{ margin: 0 }}>
            <span className="tri" aria-hidden="true" />
            Bande-annonce en lecture automatique, muette
          </p>
        </div>
        <div className="kente" style={{ position: 'relative', zIndex: 2 }} />
      </section>

      {e.annule && (
        <div className="ev-annule" role="status">
          <div className="wrap">
            <strong>Annulé.</strong> Cet événement n’aura pas lieu. [Message de l’Alliance à compléter.]
          </div>
        </div>
      )}
      {termine && !e.annule && (
        <div className="ev-termine" role="status">
          <div className="wrap">
            Événement terminé.{e.galerie ? ' Retrouvez-le en images ci-dessous.' : ''}{' '}
            <Link href={ROUTES.agenda}>Voir les prochains événements</Link>
          </div>
        </div>
      )}

      {/* Mobile : infos essentielles et actions juste sous le visuel. */}
      <section className="wrap m-only" style={{ paddingTop: 8 }}>
        <dl className="facts" style={{ borderTop: 0 }}>
          {(
            [
              ['Lieu', e.lieu],
              ['Horaire', horaire],
              ['Tarif', e.tarifCourt ?? `Entrée ${k.tarif}`],
              ...(e.langueCourte ?? e.langue ? [['Langue', e.langueCourte ?? e.langue!]] : []),
            ] as [string, string][]
          ).map(([t, v]) => (
            <div key={t} className="fact" style={{ gridTemplateColumns: '90px minmax(0, 1fr)' }}>
              <dt>{t}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid ev-m-acts">
          {!termine && (
            <a className="btn btn-line" href={icsHref}>
              Ajouter à l’agenda
            </a>
          )}
          <a className="btn btn-line" href={partage} target="_blank" rel="noopener noreferrer">
            Partager
          </a>
        </div>
      </section>

      <section className="wrap sec">
        <div className="split">
          <div className="main stack g48 ev-main">
            <div className="stack g18">
              <p className="eyebrow">L’événement</p>
              <p className="quote ev-quote">{e.citation ?? e.accroche}</p>
              {e.description ? (
                <>
                  {e.description.map((d, i) => (
                    <p key={i} className="p muted cp-txt d-only">
                      {d}
                    </p>
                  ))}
                  <p className="p muted m-only">{e.descriptionCourte ?? e.description[0]}</p>
                </>
              ) : (
                <p className="p muted cp-txt">[Description de l’événement à compléter.]</p>
              )}
            </div>

            {e.programme && (
              <div className="stack g18">
                <h2 className="h3 ev-h">Programme</h2>
                <div className="tl">
                  {e.programme.map((p) => (
                    <div key={p.heure + p.titre} className="tl-i ev-tl">
                      <span className="tl-y ev-tl-y">{p.heure}</span>
                      <div className="stack g6">
                        <h3 className="h4">{p.titre}</h3>
                        {p.detail && <p className="p small muted">{p.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {e.invites && (
              <div className="stack g18">
                <h2 className="h3 ev-h">Les invités</h2>
                <div className="grid ev-guests">
                  {e.invites.map((g, i) => (
                    <div key={i} className="row g14" style={{ flexWrap: 'nowrap' }}>
                      <Ph tone={i % 2 ? 'fu' : 'red'} cap="Portrait" className="ev-guest-ph" />
                      <div className="stack g6">
                        <h3 className="h4">{g.nom}</h3>
                        <p className="p small muted">{g.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Galerie (photos à fournir). */}
            <div className="grid ev-gal">
              <Ph tone="bo" cap="Photo" style={{ height: 200 }} />
              <Ph tone="gb" cap="Photo" style={{ height: 200 }} />
              <Ph tone="an" cap="Photo" style={{ height: 200 }} />
            </div>
          </div>

          <aside className="aside stack g18 ev-aside">
            <div className="paper ev-infos">
              <h2 className="h3 m-only" style={{ fontSize: 28 }}>
                Infos pratiques
              </h2>
              <dl className="facts d-only">
                {facts.map(([t, v]) => (
                  <div key={t} className="fact" style={{ gridTemplateColumns: '96px minmax(0, 1fr)' }}>
                    <dt>{t}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="stack g10 ev-infos-b">
                <p className="p">Sans réservation&nbsp;: présentez-vous simplement à l’entrée. [Si payant&nbsp;: règlement sur place.]</p>
                <a className="btn btn-red btn-block" href={renseigner ?? ROUTES.contact} {...external(renseigner)}>
                  Se renseigner sur WhatsApp
                </a>
              </div>
            </div>
            <div className="row g10 d-only">
              {!termine && (
                <a className="btn btn-line" href={icsHref} style={{ flex: 1 }}>
                  Ajouter à mon agenda
                </a>
              )}
              <a className="btn btn-line" href={partage} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                Partager sur WhatsApp
              </a>
            </div>
            <MapBlock src={c.carteIntegree} label={e.lieu} style={{ minHeight: 220 }} />
          </aside>
        </div>
      </section>

      {autres.length > 0 && (
        <section className="dark">
          <div className="kente" />
          <div className="wrap sec-s">
            <div className="row between end g28 mb48 ev-more-head">
              <h2 className="h2 ev-more-t">
                Aussi <i>à l’affiche</i>
              </h2>
              <Link className="ulink w d-only" href={ROUTES.agenda}>
                Tout l’agenda
              </Link>
              <Link className="tlink m-only" href={ROUTES.agenda} style={{ color: '#fff' }}>
                Agenda
              </Link>
            </div>
            <div className="grid c3 ev-more rail snap">
              {autres.map((a) => (
                <Link key={a.slug} href={a.href} className="ev">
                  <div className="media">
                    <Ph tone={a.ton} word={a.categorie} cap={a.photo} className="zoom" />
                    <DateBlock c={a} />
                  </div>
                  <div className="ev-b">
                    <span className="ev-cat">{a.categorie}</span>
                    <h3 className="ev-t">{a.titre}</h3>
                    <p className="ev-m d-only">{a.meta}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}
