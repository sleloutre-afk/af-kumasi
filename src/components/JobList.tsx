'use client'

import { useState } from 'react'
import type { Offre } from '@/data/demo'

const CONTRATS = ['Tous', 'CDI', 'CDD', 'Temps partiel', 'Stage'] as const

/** Ouvre le formulaire de candidature avec ce poste présélectionné (écouté par CandidatureForm). */
export function postuler(poste: string) {
  window.dispatchEvent(new CustomEvent('afk:postuler', { detail: poste }))
  document.getElementById('candidature')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * « Offres en cours » (maquette Nous rejoindre) : compteur, filtre par type de
 * contrat, chaque offre dans un volet dépliant (missions, profil, conditions).
 */
export function JobList({ offres }: { offres: Offre[] }) {
  const [type, setType] = useState<(typeof CONTRATS)[number]>('Tous')
  const liste = type === 'Tous' ? offres : offres.filter((o) => o.contrat === type)
  const count = `${liste.length} ${liste.length > 1 ? 'postes' : 'poste'}`

  return (
    <>
      <div className="row between end g28 rj-head">
        <div className="stack g18 rj-head-t">
          <p className="eyebrow">Offres en cours</p>
          <h2 className="h2" aria-live="polite">
            {count} <i>à pourvoir</i>
          </h2>
        </div>
        <div className="row g10 rail rj-chips" role="group" aria-label="Filtrer par type de contrat">
          {CONTRATS.map((t) => (
            <button key={t} type="button" className={t === type ? 'chip dk on' : 'chip dk'} aria-pressed={t === type} onClick={() => setType(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="stack g10 rj-list">
        {liste.map((o) => (
          <details key={o.slug} id={`offre-${o.slug}`} className="acc rj-job-acc">
            <summary>
              <span className="stack g6">
                <span className="rj-job-title">{o.intitule}</span>
                <span className="row g10 rj-job-meta">
                  <span className="badge">{o.contrat}</span>
                  <span className="muted">
                    <span className="d-only-i">{o.meta}</span>
                    <span className="m-only-i">{o.metaCourt}</span>
                  </span>
                </span>
              </span>
            </summary>
            <div className="acc-b rj-job-b">
              <div className="grid rj-job-cols">
                <div className="stack g10">
                  <p className="p up" style={{ color: '#1a171b' }}>
                    Missions
                  </p>
                  <p className="p">{o.missions}</p>
                </div>
                <div className="stack g10">
                  <p className="p up" style={{ color: '#1a171b' }}>
                    Profil
                  </p>
                  <p className="p">{o.profil}</p>
                </div>
                <div className="stack g10">
                  <p className="p up" style={{ color: '#1a171b' }}>
                    Conditions
                  </p>
                  <p className="p">{o.conditions}</p>
                </div>
              </div>
              <div className="row g14 rj-job-act">
                <button type="button" className="btn btn-red arr" onClick={() => postuler(o.intitule)}>
                  <span className="d-only-i">Postuler à cette offre</span>
                  <span className="m-only-i">Postuler</span>
                </button>
                <span className="small muted">Candidatures jusqu’au {o.dateLimite}</span>
              </div>
            </div>
          </details>
        ))}
        {liste.length === 0 && (
          <div className="rj-none muted">
            <span className="d-only-i">Aucune offre de ce type pour le moment. Envoyez-nous une candidature spontanée&nbsp;!</span>
            <span className="m-only-i">Aucune offre de ce type. Envoyez une candidature spontanée&nbsp;!</span>
          </div>
        )}
      </div>
    </>
  )
}
