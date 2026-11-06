// Règles du formulaire de candidature, partagées entre le navigateur et le serveur.

export const CV_MAX = 5 * 1024 * 1024 // 5 Mo (spec)
/** PDF, Word, JPG ou PNG (spec) : la photo d'un document prise au téléphone doit passer. */
export const CV_TYPES: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
}
export const CV_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png'

export const CANDIDATURE_SPONTANEE = 'Candidature spontanée'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TEL = /^(\+\d{8,15}|0\d{9})$/

export type CandValues = { nom: string; email: string; tel: string; poste: string; msg: string; rgpd: boolean }
export type CandErrors = Partial<Record<keyof CandValues | 'cv', string>>

export function validateCandidature(v: CandValues, cv: { size: number; type: string } | null, postes: string[]): CandErrors {
  const e: CandErrors = {}
  if (!v.nom.trim()) e.nom = 'Veuillez indiquer votre nom.'
  else if (v.nom.length > 200) e.nom = 'Ce champ est limité à 200 caractères.'
  if (!v.email.trim()) e.email = 'Veuillez indiquer votre adresse e-mail : nous vous confirmerons la bonne réception.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Format attendu : nom@domaine.com'
  const tel = v.tel.replace(/[\s.\-()]/g, '')
  if (tel && !TEL.test(tel)) e.tel = 'Format attendu : +233 24 123 4567 ou 024 123 4567.'
  if (!postes.includes(v.poste)) e.poste = 'Veuillez choisir le poste visé.'
  if (v.msg.length > 5000) e.msg = 'Ce champ est limité à 5000 caractères.'
  if (!cv || cv.size === 0) e.cv = 'Veuillez joindre votre CV.'
  else if (cv.size > CV_MAX) e.cv = 'Le fichier dépasse 5 Mo. Une photo moins lourde ou un PDF suffit.'
  else if (!CV_TYPES[cv.type]) e.cv = 'Formats acceptés : PDF, Word, JPG ou PNG.'
  if (!v.rgpd) e.rgpd = 'Votre accord est nécessaire pour traiter votre candidature.'
  return e
}
