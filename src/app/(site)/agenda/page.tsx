import type { Metadata } from 'next'
import Link from 'next/link'
import { AgendaList } from '@/components/AgendaList'
import { DateBlock } from '@/components/EventMedia'
import { PageShell } from '@/components/PageShell'
import { PageHero } from '@/components/PageHero'
import { Ph } from '@/components/Ph'
import { aLaUne, aVenir, carte, passes } from '@/lib/evenements'
import { getCoordonnees } from '@/lib/reglages'

export const metadata: Metadata = {
  title: 'Agenda culturel',
  description: 'Cinéma, concerts, expositions, ateliers jeunesse, rencontres : l’agenda culturel de l’Alliance Française de Kumasi.',
}

// Dépend de la date du jour (à venir / passés) : régénérée au plus toutes les heures.
export const revalidate = 3600

// Mise en page « Retour en images » de la maquette : cases hautes et cases simples.
const TUILES: { ton: 'red' | 'gb' | 'fu' | 'bo' | 'an' | 'bk'; haute?: boolean }[] = [
  { ton: 'red', haute: true },
  { ton: 'gb' },
  { ton: 'fu' },
  { ton: 'bo', haute: true },
  { ton: 'an' },
  { ton: 'bk' },
]

export default async function AgendaPage() {
  const now = new Date()
  const c = await getCoordonnees()
  const une = aLaUne(now)
  const uneCarte = une ? carte(une) : null
  const avenir = aVenir(now)
    .filter((e) => e.slug !== une?.slug)
    .map((e) => carte(e))
  const anciens = passes(now)
  // Retour en images : les événements passés qui ont une galerie (6 au plus).
  const galeries = anciens.filter((e) => e.galerie).slice(0, 6)

  return (
    <PageShell
      mobileAction={c.chaineWhatsapp ? { label: 'Recevoir l’agenda sur WhatsApp', href: c.chaineWhatsapp, external: true } : undefined}
    >
      <PageHero
        current="agenda"
        tone="dk"
        crumb="Agenda"
        title={
          <>
            L’agenda <i>culturel</i>
          </>
        }
        lead={
          <>
            <span className="d-only-i">
              Cinéma, concerts, expositions, ateliers jeunesse, rencontres&nbsp;: la culture francophone se vit à Kumasi, et la plupart de nos événements
              sont ouverts à tous.
            </span>
            <span className="m-only-i">Cinéma, concerts, expositions, ateliers, rencontres&nbsp;: ouverts à tous.</span>
          </>
        }
        eyebrowPink="Saison culturelle 2026–2027"
        netDesktop={null}
        netMobile={null}
        noKente
      />

      {/* À la une */}
      {uneCarte && (
        <section className="dark">
          <div className="wrap ag-une-w">
            <Link href={uneCarte.href} className="ev ag-une">
              <div className="media ag-une-media">
                <Ph tone={uneCarte.ton} video word={uneCarte.categorie} play cap={`Bande-annonce · ${uneCarte.titre}`} capShort="Bande-annonce" className="zoom ag-une-ph" />
                <DateBlock c={uneCarte} />
              </div>
              <div className="ev-b ag-une-b">
                <span className="badge" style={{ background: '#da002e', color: '#fff' }}>
                  À la une
                </span>
                <span className="ev-cat">{uneCarte.catLigne}</span>
                <h2 className="ev-t ag-une-t">{uneCarte.titre}</h2>
                <p className="p wsoft ag-une-p d-only">{uneCarte.accroche}</p>
                <p className="ev-m">
                  {uneCarte.meta}
                  <span className="d-only-i"> · Entrée {uneCarte.tarif}</span>
                </p>
                <span className="btn btn-red arr ag-une-cta">Voir le programme</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filtres + liste */}
      <section className="dark ag-sec">
        <div className="wrap ag-sec-in">
          <AgendaList aVenir={avenir} passes={anciens.map((e) => carte(e, { passe: true }))} />
        </div>
      </section>

      {/* Retour en images (galeries à fournir) */}
      {galeries.length > 0 && (
        <section className="wrap sec">
          <div className="row between end g28 mb48 ag-img-head">
            <div className="stack g18">
              <p className="eyebrow">Retour en images</p>
              <h2 className="h2">
                La saison <i>passée</i>
              </h2>
            </div>
            <a className="ulink d-only" href="#passes">
              Toutes les galeries
            </a>
          </div>
          <div className="grid ag-imgs">
            {galeries.map((e, i) => {
              const t = TUILES[i % TUILES.length]
              const video = e.galerie === 'Vidéo'
              return (
                <Link key={e.slug} href={`/agenda/${e.slug}`} className={['ag-img', t.haute && 'haute', i >= 5 && 'd-only'].filter(Boolean).join(' ')}>
                  <Ph tone={t.ton} video={video} play={video} cap={`${video ? 'Vidéo' : 'Photo'} · ${e.titre}`} capShort={e.titre} />
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Chaîne WhatsApp de l'agenda (pas d'envoi par e-mail) : seulement si le lien est renseigné dans le BO. */}
      {c.chaineWhatsapp && (
        <section className="redbg">
          <div className="wrap sec-s grid c2 g48" style={{ alignItems: 'center' }}>
            <div className="stack g14">
              <h2 className="h2">
                Ne manquez <i>plus rien</i>
              </h2>
              <p className="p cp-txt">Suivez l’agenda sur notre chaîne WhatsApp.</p>
            </div>
            <a className="btn btn-linew" href={c.chaineWhatsapp} target="_blank" rel="noopener noreferrer" style={{ justifySelf: 'start' }}>
              Rejoindre la chaîne WhatsApp
            </a>
          </div>
        </section>
      )}
    </PageShell>
  )
}
