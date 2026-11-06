import { OFFRES, type Offre } from '@/data/demo'

/*
 * Offres d'emploi. Pour l'instant sur les données de démonstration
 * (src/data/demo.ts) ; la même interface lira ensuite le BO Offres d'emploi.
 */

export const offresEnCours = (): Offre[] => OFFRES

/** Bloc « Nous rejoindre » de l'accueil : les offres cochées « Afficher sur la home », 2 au plus. */
export const offresAccueil = (): Offre[] => OFFRES.filter((o) => o.surAccueil).slice(0, 2)

/** « Temps partiel · Kumasi · Prise de poste janvier 2027 » */
export function ligneInfos(o: Offre, court = false): string {
  const parts = court
    ? [o.contrat === o.duree ? o.contrat : `${o.contrat} ${o.duree}`, o.prisePoste ? capitalize(o.prisePoste) : null]
    : [o.contrat === o.duree ? o.contrat : `${o.contrat} ${o.duree}`, o.lieu, o.prisePoste ? `Prise de poste ${o.prisePoste}` : null]
  return parts.filter(Boolean).join(' · ')
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
