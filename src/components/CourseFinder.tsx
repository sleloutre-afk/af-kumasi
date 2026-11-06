'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/lib/site'

type Reco = { title: string; text: string; anchor: string }

const PUBLICS = [
  ['adulte', 'Un adulte'],
  ['enfant', 'Un enfant'],
  ['ado', 'Un ado'],
  ['pro', 'Une entreprise'],
] as const
const OBJECTIFS = [
  ['debuter', 'Débuter'],
  ['progresser', 'Progresser'],
  ['examen', 'Un examen'],
  ['parler', 'Parler mieux'],
] as const

type Public = (typeof PUBLICS)[number][0]
type Objectif = (typeof OBJECTIFS)[number][0]

// Recommandations de la maquette (textes de Cours.dc.html).
const R: Record<Public, Partial<Record<Objectif | '_', Reco>>> = {
  adulte: {
    debuter: { title: 'Cours collectifs · A1', text: 'Vos premiers pas en français, en groupe, avec un professeur qui vous fait parler dès la première séance.', anchor: '#adultes' },
    progresser: { title: 'Cours collectifs · A2 à C2', text: 'Après un test de niveau, rejoignez le groupe qui vous correspond et progressez session après session.', anchor: '#adultes' },
    examen: { title: 'Préparation DELF · DALF · TCF', text: 'Méthode, entraînement intensif et examens blancs pour réussir le jour J.', anchor: '#adultes' },
    parler: { title: 'Ateliers de conversation', text: 'Des échanges vivants sur des sujets du quotidien pour gagner en aisance à l’oral.', anchor: '#adultes' },
  },
  enfant: {
    _: { title: 'Cours enfants', text: 'Jeux, chansons et contes pour apprendre le français avec plaisir, en petits groupes d’âge.', anchor: '#jeunesse' },
    examen: { title: 'Préparation au DELF Prim', text: 'Un premier diplôme officiel de français, adapté aux enfants.', anchor: '#jeunesse' },
  },
  ado: {
    _: { title: 'Cours adolescents', text: 'Communiquer, débattre, créer : un français vivant pour les 12–17 ans. [Tranche d’âge à confirmer]', anchor: '#jeunesse' },
    examen: { title: 'Préparation au DELF Junior', text: 'Le DELF conçu pour les adolescents, reconnu à l’international.', anchor: '#jeunesse' },
  },
  pro: {
    _: { title: 'Formation sur mesure', text: 'Un programme de français professionnel pour vos équipes, avec bilan de niveau et suivi.', anchor: '#surmesure' },
  },
}

/**
 * « Trouver mon cours » : deux questions, une recommandation (maquette Cours).
 * Purement informatif : la recommandation renvoie vers la présentation du
 * cours et vers le contact, sans inscription en ligne.
 */
export function CourseFinder() {
  const [qui, setQui] = useState<Public>('adulte')
  const [but, setBut] = useState<Objectif>('debuter')
  const g = R[qui]
  const rec = (g[but] ?? g._)!

  const chips = <K extends string>(list: readonly (readonly [K, string])[], value: K, set: (k: K) => void, label: string) => (
    <div className="row g10 cf-chips" role="group" aria-label={label}>
      {list.map(([k, l]) => (
        <button key={k} type="button" className={k === value ? 'chip dk on' : 'chip dk'} aria-pressed={k === value} onClick={() => set(k)}>
          {l}
        </button>
      ))}
    </div>
  )

  return (
    <div className="grid c2 g48 cf">
      <div className="stack g28 cf-q">
        <div className="stack g18">
          <p className="eyebrow">Trouver mon cours</p>
          <h2 className="h2">
            Deux questions, <i>un cours pour vous</i>
          </h2>
        </div>
        <div className="stack g10">
          <p className="p up muted">1 · Le cours est pour…</p>
          {chips(PUBLICS, qui, setQui, 'Public')}
        </div>
        <div className="stack g10">
          <p className="p up muted">2 · L’objectif principal</p>
          {chips(OBJECTIFS, but, setBut, 'Objectif')}
        </div>
      </div>
      <div className="redbg stack g14 cf-reco" aria-live="polite">
        <span className="serif cf-af" aria-hidden="true">
          a<i>f</i>
        </span>
        <p className="p up">Notre recommandation</p>
        <h3 className="h2 cf-t">{rec.title}</h3>
        <p className="p cf-p">{rec.text}</p>
        <div className="row g14 cf-btns">
          <Link className="btn btn-white arr" href={ROUTES.contact}>
            Nous contacter
          </Link>
          <a className="btn btn-linew" href={rec.anchor}>
            En savoir plus
          </a>
        </div>
      </div>
    </div>
  )
}
