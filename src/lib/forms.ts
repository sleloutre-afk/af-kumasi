// Règles de validation des formulaires, partagées entre le navigateur et le serveur.

export type FormKind = 'contact'
export type Values = Record<string, string | boolean>
export type Errors = Record<string, string>

/** Sujets proposés en tête du formulaire de contact (maquette Contact). */
export const SUJETS = ['Cours', 'Examens', 'Événements', 'Médiathèque', 'Traduction', 'Adhésion', 'Autre'] as const

/** Champs de chaque formulaire, dans l'ordre d'affichage. */
export const fields: Record<FormKind, string[]> = {
  contact: ['sujet', 'nom', 'tel', 'email', 'msg', 'rgpd'],
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Numéro international (+233…) ou local ghanéen (0XX XXX XXXX) : seuls les chiffres comptent.
const TEL = /^(\+\d{8,15}|0\d{9})$/
const MAX = 200
const MAX_MSG = 5000

const str = (v: Values, k: string) => (typeof v[k] === 'string' ? (v[k] as string).trim() : '')
const telDigits = (v: Values) => str(v, 'tel').replace(/[\s.\-()]/g, '')

function tooLong(v: Values, e: Errors, keys: string[]) {
  for (const k of keys) {
    const max = k === 'msg' ? MAX_MSG : MAX
    if (!e[k] && str(v, k).length > max) e[k] = `Ce champ est limité à ${max} caractères.`
  }
}

/**
 * Contact : nom et message obligatoires ; au moins un moyen de vous répondre
 * (téléphone/WhatsApp ou e-mail) — sur mobile, la maquette ne demande que le téléphone.
 */
export function validateContact(v: Values): Errors {
  const e: Errors = {}
  const sujet = str(v, 'sujet')
  if (sujet && !(SUJETS as readonly string[]).includes(sujet)) e.sujet = 'Sujet inconnu.'
  if (!str(v, 'nom')) e.nom = 'Veuillez indiquer votre nom.'

  const tel = telDigits(v)
  const email = str(v, 'email')
  if (!tel && !email) e.tel = 'Indiquez un numéro de téléphone (WhatsApp) ou une adresse e-mail pour que nous puissions vous répondre.'
  if (tel && !TEL.test(tel)) e.tel = 'Format attendu : +233 24 123 4567 ou 024 123 4567.'
  if (email && !EMAIL.test(email)) e.email = 'Format attendu : nom@domaine.com'

  if (!str(v, 'msg')) e.msg = 'Veuillez rédiger votre message.'
  if (v.rgpd !== true) e.rgpd = 'Votre accord est nécessaire pour traiter votre demande.'
  tooLong(v, e, ['nom', 'email', 'msg'])
  return e
}

export const validators: Record<FormKind, (v: Values) => Errors> = {
  contact: validateContact,
}

/** Valeurs nettoyées, telles qu'elles sont transmises par e-mail. */
export function normalize(kind: FormKind, v: Values): Record<string, string> {
  const out: Record<string, string> = {}
  for (const k of fields[kind]) {
    if (k === 'rgpd') continue
    const value = k === 'msg' ? str(v, k) : str(v, k).replace(/\s+/g, ' ')
    if (value) out[k] = value
  }
  return out
}
