import { EVENEMENTS, TON, type Categorie, type Evenement } from '@/data/demo'
import { cleMois, heure, jourCourt, jourMois, jourNum, moisAnnee, moisCourt } from './dates'

/*
 * Règles d'affichage des événements (spec des back-offices, « affichage sur le
 * site »). Pour l'instant sur les données de démonstration (src/data/demo.ts) ;
 * la même logique lira ensuite le BO Événements.
 */

/** Fin effective : date de fin, sinon début. Un événement est « passé » le lendemain de sa fin. */
const finEffective = (e: Evenement) => new Date(e.fin ?? e.debut)

function lendemain(d: Date) {
  const x = new Date(d)
  x.setUTCHours(0, 0, 0, 0)
  x.setUTCDate(x.getUTCDate() + 1)
  return x
}

export const estPasse = (e: Evenement, now = new Date()) => now >= lendemain(finEffective(e))

/** À venir (onglet par défaut), triés par date. Les annulés restent visibles (bandeau) jusqu'à leur date. */
export function aVenir(now = new Date()): Evenement[] {
  return EVENEMENTS.filter((e) => !estPasse(e, now)).sort((a, b) => +new Date(a.debut) - +new Date(b.debut))
}

/** Passés, du plus récent au plus ancien ; les annulés n'y figurent pas. */
export function passes(now = new Date()): Evenement[] {
  return EVENEMENTS.filter((e) => estPasse(e, now) && !e.annule).sort((a, b) => +new Date(b.debut) - +new Date(a.debut))
}

/** Bandeau « Prochain événement » : l'événement publié le plus proche dans le temps. */
export function prochain(now = new Date()): Evenement | undefined {
  return aVenir(now).find((e) => !e.annule && new Date(e.debut) >= now) ?? aVenir(now).find((e) => !e.annule)
}

/** « À la une » : l'événement coché, à défaut le prochain. */
export function aLaUne(now = new Date()): Evenement | undefined {
  const liste = aVenir(now)
  return liste.find((e) => e.alaUne && !e.annule) ?? prochain(now)
}

export function parSlug(slug: string): Evenement | undefined {
  return EVENEMENTS.find((e) => e.slug === slug)
}

/** Vue « carte » d'un événement, prête à afficher (bloc date, ligne d'infos). */
export type Carte = {
  slug: string
  href: string
  titre: string
  accroche: string
  categorie: Categorie
  ton: (typeof TON)[Categorie]
  photo: string
  /** Bloc date : « Sam. / 21 / nov. » ou « Du / 12 / nov. » pour une période. */
  d1: string
  d2: string
  d3: string
  /** « 18 h 30 · Jardin de l'Alliance » ou « Jusqu'au 18 déc. · Galerie » */
  meta: string
  annule: boolean
  galerie?: 'Photos' | 'Vidéo'
  /** « Cinéma · Plein air » : catégorie et étiquettes. */
  catLigne: string
  /** Clé de mois « 2026-11 » et année « 2026 » (filtres de l'agenda). */
  mois: string
  annee: string
  tarif: string
}

const surPlusieursJours = (e: Evenement) => Boolean(e.fin) && jourMois(new Date(e.fin!)) !== jourMois(new Date(e.debut))

/** `passe` : ligne d'infos des événements passés, « Octobre 2026 · Auditorium ». */
export function carte(e: Evenement, opts: { passe?: boolean } = {}): Carte {
  const debut = new Date(e.debut)
  const periode = surPlusieursJours(e)
  return {
    slug: e.slug,
    href: `/agenda/${e.slug}`,
    titre: e.titre,
    accroche: e.accroche,
    categorie: e.categorie,
    ton: TON[e.categorie],
    photo: e.photo,
    d1: periode ? 'Du' : jourCourt(debut),
    d2: jourNum(debut),
    d3: moisCourt(debut),
    meta: opts.passe
      ? `${moisAnnee(debut)} · ${e.lieu}`
      : `${periode ? `Jusqu’au ${jourMois(new Date(e.fin!))}` : heure(debut)} · ${e.lieu}`,
    annule: Boolean(e.annule),
    galerie: e.galerie,
    catLigne: [e.categorie, ...(e.etiquettes ?? [])].join(' · '),
    mois: cleMois(debut),
    annee: String(debut.getUTCFullYear()),
    tarif: e.tarif ?? '[LIBRE / TARIF]',
  }
}

/** « Aussi à l'affiche » : 3 événements à venir, de préférence de catégories différentes. */
export function aussiALaffiche(slug: string, now = new Date()): Evenement[] {
  const autres = aVenir(now).filter((e) => e.slug !== slug && !e.annule)
  const choix: Evenement[] = []
  for (const e of autres) if (choix.length < 3 && !choix.some((c) => c.categorie === e.categorie)) choix.push(e)
  for (const e of autres) if (choix.length < 3 && !choix.includes(e)) choix.push(e)
  return choix
}

export const tousLesSlugs = () => EVENEMENTS.map((e) => e.slug)
