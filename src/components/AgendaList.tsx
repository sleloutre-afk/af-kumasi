'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Carte } from '@/lib/evenements'
import { CATEGORIES, type Categorie } from '@/data/demo'
import { DateBlock } from './EventMedia'

const moisLabel = (cle: string) => {
  const [y, m] = cle.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1, 15))
  const s = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d)
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Liste de l'agenda (maquette Agenda) : onglets « À venir » / « Événements
 * passés », filtres par type, par mois (à venir) ou par année (passés), vue
 * grille ou liste sur grand écran. L'adresse « #passes » ouvre directement
 * l'onglet des événements passés.
 */
export function AgendaList({ aVenir, passes }: { aVenir: Carte[]; passes: Carte[] }) {
  const [periode, setPeriode] = useState<'up' | 'past'>('up')
  const [cat, setCat] = useState<'Tout' | Categorie>('Tout')
  const [mois, setMois] = useState('all')
  const [annee, setAnnee] = useState('all')
  const [vue, setVue] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#passes') setPeriode('past')
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const up = periode === 'up'
  const source = up ? aVenir : passes
  const liste = source.filter(
    (e) => (cat === 'Tout' || e.categorie === cat) && (up ? mois === 'all' || e.mois === mois : annee === 'all' || e.annee === annee),
  )
  const moisDispo = [...new Set(aVenir.map((e) => e.mois))]
  const anneesDispo = [...new Set(passes.map((e) => e.annee))]

  const chip = (on: boolean, extra = '') => `chip${on ? ' on' : ''}${extra}`

  return (
    <div id="liste">
      <div className="row between g18 ag-top">
        <div className="ag-tabs" role="tablist" aria-label="Période">
          <button role="tab" type="button" aria-selected={up} className={up ? 'ag-tab serif on' : 'ag-tab serif'} onClick={() => setPeriode('up')}>
            À venir
          </button>
          <button role="tab" type="button" aria-selected={!up} className={!up ? 'ag-tab serif on' : 'ag-tab serif'} onClick={() => setPeriode('past')}>
            <span className="d-only-i">Événements passés</span>
            <span className="m-only-i">Passés</span>
          </button>
        </div>
        <div className="row g10 d-only" role="group" aria-label="Affichage">
          <button type="button" className={chip(vue === 'grid')} aria-pressed={vue === 'grid'} onClick={() => setVue('grid')}>
            Grille
          </button>
          <button type="button" className={chip(vue === 'list')} aria-pressed={vue === 'list'} onClick={() => setVue('list')}>
            Liste
          </button>
        </div>
      </div>

      <div className="rail ag-filters" role="group" aria-label="Filtrer par type">
        {(['Tout', ...CATEGORIES] as const).map((c) => (
          <button key={c} type="button" className={chip(cat === c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c === 'Tout' ? 'Tous les types' : c}
          </button>
        ))}
      </div>

      {up ? (
        <div className="rail ag-filters ag-sub" role="group" aria-label="Filtrer par mois">
          <span className="up soft d-only">Mois</span>
          {['all', ...moisDispo].map((m) => (
            <button key={m} type="button" className={chip(mois === m, ' sm')} aria-pressed={mois === m} onClick={() => setMois(m)}>
              {m === 'all' ? 'Tous' : moisLabel(m)}
            </button>
          ))}
        </div>
      ) : (
        <div className="rail ag-filters ag-sub" role="group" aria-label="Filtrer par année">
          <span className="up soft d-only">Année</span>
          {['all', ...anneesDispo].map((y) => (
            <button key={y} type="button" className={chip(annee === y, ' sm')} aria-pressed={annee === y} onClick={() => setAnnee(y)}>
              {y === 'all' ? 'Toutes' : y}
            </button>
          ))}
        </div>
      )}

      {liste.length ? (
        <div className={vue === 'grid' ? 'grid c3 ag-list ag-grid' : 'stack g14 ag-list ag-rows'}>
          {liste.map((e) => (
            <Link key={e.slug} href={e.href} className={vue === 'grid' ? 'ev ag-ev' : 'ev rowv ag-ev'}>
              <div className="media">
                <div className={`ph zoom t-${e.ton}`} role="img" aria-label={e.photo}>
                  <span className="word d-only" aria-hidden="true" style={{ fontSize: 84 }}>
                    {e.categorie}
                  </span>
                  <span className="cap d-only" aria-hidden="true">
                    {e.photo}
                  </span>
                </div>
                <DateBlock c={e} />
              </div>
              <div className="ev-b">
                {e.galerie && <span className="badge w ag-badge d-only">{e.galerie}</span>}
                {e.annule && <span className="badge">Annulé</span>}
                <span className="ev-cat">{e.categorie}</span>
                <h3 className="ev-t">{e.titre}</h3>
                <p className="ev-m">{e.meta}</p>
                {e.galerie && <span className="badge w ag-badge m-only">{e.galerie}</span>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="ag-none soft">
          <span className="d-only-i">Aucun événement ne correspond à ces filtres pour le moment.</span>
          <span className="m-only-i">Aucun événement pour ces filtres.</span>
        </div>
      )}
    </div>
  )
}
