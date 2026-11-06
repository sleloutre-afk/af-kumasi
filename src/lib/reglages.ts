import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

/** Coordonnées prêtes à afficher : valeur saisie dans le BO, sinon le marqueur des maquettes. */
export type Coordonnees = {
  adresse: string
  reperes: string
  telephone: string
  whatsapp: string
  email: string
  delaiReponse: string
  horairesResume: string
  horairesSemaine: string
  horairesSamedi: string
  horairesDimanche: string
  horairesMediatheque: string
  /** Liens : `null` tant que l'information n'est pas renseignée. */
  telHref: string | null
  waHref: string | null
  mailHref: string | null
  itineraireHref: string | null
  carteIntegree: string | null
  chaineWhatsapp: string | null
  reseaux: { nom: 'Facebook' | 'Instagram' | 'LinkedIn'; href: string }[]
}

const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : '')
const digits = (v: string) => v.replace(/[^\d+]/g, '')
const httpOnly = (v: string) => (/^https:\/\//.test(v) ? v : null)

/** Lit le réglage « Coordonnées & horaires » du BO (une fois par rendu de page). */
export const getCoordonnees = cache(async (): Promise<Coordonnees> => {
  let r: Record<string, unknown> = {}
  try {
    const payload = await getPayload({ config })
    r = (await payload.findGlobal({ slug: 'reglages', depth: 0 })) as unknown as Record<string, unknown>
  } catch (err) {
    // Base indisponible (première installation…) : le site s'affiche avec les marqueurs.
    console.error('[reglages] lecture impossible', err)
  }

  const tel = clean(r.telephone)
  const wa = clean(r.whatsapp)
  const email = clean(r.email)

  return {
    adresse: clean(r.adresse) || '[ADRESSE À COMPLÉTER]',
    reperes: clean(r.reperes) || '[à compléter]',
    telephone: tel || '[TÉLÉPHONE]',
    whatsapp: wa || '[NUMÉRO]',
    email: email || '[EMAIL]',
    delaiReponse: clean(r.delaiReponse) || '[X] jours ouvrés',
    horairesResume: clean(r.horairesResume) || '[À COMPLÉTER]',
    horairesSemaine: clean(r.horairesSemaine) || '[HORAIRES]',
    horairesSamedi: clean(r.horairesSamedi) || '[HORAIRES]',
    horairesDimanche: clean(r.horairesDimanche) || '[HORAIRES]',
    horairesMediatheque: clean(r.horairesMediatheque) || '[HORAIRES]',
    telHref: tel ? `tel:${digits(tel)}` : null,
    waHref: wa ? `https://wa.me/${digits(wa).replace(/^\+/, '')}` : null,
    mailHref: email ? `mailto:${email}` : null,
    itineraireHref: httpOnly(clean(r.lienItineraire)),
    carteIntegree: httpOnly(clean(r.carteIntegree)),
    chaineWhatsapp: httpOnly(clean(r.chaineWhatsapp)),
    reseaux: (
      [
        ['Facebook', clean(r.facebook)],
        ['Instagram', clean(r.instagram)],
        ['LinkedIn', clean(r.linkedin)],
      ] as const
    )
      .filter(([, href]) => httpOnly(href))
      .map(([nom, href]) => ({ nom, href })),
  }
})

/** Lien WhatsApp avec un message pré-rempli (fiche événement, « Se renseigner »). */
export function waWithText(waHref: string | null, text: string): string | null {
  return waHref ? `${waHref}?text=${encodeURIComponent(text)}` : null
}
