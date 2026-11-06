'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Carte } from '@/lib/evenements'
import type { Categorie } from '@/data/demo'
import { CameraIcon, ClockIcon, DateBlock } from '../EventMedia'

const FILTRES: ('Tout' | Categorie)[] = ['Tout', 'Cinéma', 'Musique', 'Exposition', 'Jeunesse', 'Rencontre']

/**
 * Section « À l'affiche à l'Alliance » de l'accueil : filtres par catégorie,
 * l'événement « À la une » en grand, puis les suivants par date (5 au plus).
 * Grand écran : grille. Mobile : la carte à la une, puis un carrousel horizontal.
 */
export function HomeAgenda({ cartes, uneSlug }: { cartes: Carte[]; uneSlug?: string }) {
  const [filtre, setFiltre] = useState<'Tout' | Categorie>('Tout')

  const liste = filtre === 'Tout' ? cartes : cartes.filter((c) => c.categorie === filtre)
  const une = (filtre === 'Tout' && liste.find((c) => c.slug === uneSlug)) || liste[0]
  const suite = liste.filter((c) => c !== une).slice(0, 5)

  return (
    <>
      <div className="hev-chips rail" role="group" aria-label="Filtrer par type">
        {FILTRES.map((f) => (
          <button key={f} type="button" className={f === filtre ? 'chip on' : 'chip'} aria-pressed={f === filtre} onClick={() => setFiltre(f)}>
            {f === 'Tout' ? (
              <>
                <span className="d-only">Tous les événements</span>
                <span className="m-only">Tous</span>
              </>
            ) : (
              f
            )}
          </button>
        ))}
      </div>

      {une ? (
        <div className="hev-grid">
          <EventCard c={une} featured />
          <div className="hev-rest rail snap">
            {suite.map((c) => (
              <EventCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      ) : (
        <p className="hev-none">Aucun événement à venir dans cette catégorie pour le moment.</p>
      )}
    </>
  )
}

function EventCard({ c, featured = false }: { c: Carte; featured?: boolean }) {
  return (
    <Link href={c.href} className={featured ? 'hev feat' : 'hev'}>
      <div className="hev-media">
        <div className={`hev-img zoom hatch t-${c.ton}`}>
          <span className="hev-word serif" aria-hidden="true">
            {c.categorie}
          </span>
        </div>
        <DateBlock c={c} />
        <span className="hev-ph">
          <CameraIcon />
          {c.photo}
        </span>
      </div>
      <div className="hev-b">
        <span className="ev-cat">{c.categorie}</span>
        <h3 className="hev-t serif">{c.titre}</h3>
        {featured && <p className="hev-desc d-only">{c.accroche}</p>}
        <p className="hev-m">
          <ClockIcon />
          {c.meta}
        </p>
        {c.annule && <span className="badge">Annulé</span>}
        {featured && <span className="btn btn-red hev-cta">Voir le programme</span>}
      </div>
    </Link>
  )
}
