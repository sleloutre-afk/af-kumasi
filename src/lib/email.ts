import { Resend } from 'resend'
import type { FormKind } from './forms'

/** Expéditeur des notifications ; le domaine doit être vérifié dans le compte Resend. */
const FROM = process.env.EMAIL_FROM || 'Alliance Française de Kumasi <noreply@example.com>'

const LABELS: Record<string, string> = {
  sujet: 'Sujet',
  nom: 'Nom',
  tel: 'Téléphone (WhatsApp)',
  email: 'E-mail',
  msg: 'Message',
}

type SendResult = { ok: true } | { ok: false; error: string }

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').slice(0, 120)

/**
 * Notification envoyée à l'Alliance à chaque message du formulaire de contact,
 * via Resend. Les messages ne sont pas conservés par le site : l'e-mail en est
 * la seule trace.
 *
 * Sans RESEND_API_KEY ou sans destinataire (CONTACT_EMAIL), rien n'est envoyé :
 * en développement, le message est écrit dans la console du serveur ; en
 * production, l'échec est renvoyé au formulaire pour qu'aucune demande ne se
 * perde en silence.
 */
export async function sendFormNotification(kind: FormKind, data: Record<string, string>): Promise<SendResult> {
  const subject = `[Site AF Kumasi] ${data.sujet ? `${oneLine(data.sujet)} — ` : ''}message de ${oneLine(data.nom ?? '')}`

  const lines = Object.entries(data).map(([key, value]) =>
    key === 'msg' ? `\n${LABELS[key]} :\n${value}` : `${LABELS[key] ?? key} : ${value}`,
  )
  const text = [
    'Nouveau message reçu depuis le formulaire de contact du site.',
    '',
    ...lines,
    '',
    'Consentement recueilli via la case à cocher du formulaire.',
  ].join('\n')

  const to = process.env.CONTACT_EMAIL

  if (!process.env.RESEND_API_KEY || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[email] (dev) Notification « ${kind} » non envoyée — RESEND_API_KEY ou CONTACT_EMAIL manquant.\nObjet : ${subject}\n${text}`)
      return { ok: true }
    }
    return { ok: false, error: 'RESEND_API_KEY ou destinataire (CONTACT_EMAIL) manquant' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: FROM, to, replyTo: data.email || undefined, subject, text })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur inconnue' }
  }
}

export type CandidatureData = { nom: string; email: string; tel?: string; poste: string; msg?: string }

/**
 * Candidature reçue depuis la page « Nous rejoindre », transmise par e-mail
 * avec le CV en pièce jointe à CANDIDATURES_EMAIL.
 * PROVISOIRE : quand le BO « Offres d'emploi » sera construit, la candidature
 * y sera enregistrée (suivi par étapes, accusé de réception, suppression
 * automatique), comme le prévoit la spec.
 */
export async function sendCandidature(data: CandidatureData, cv: { filename: string; content: Buffer }): Promise<SendResult> {
  const subject = `[Site AF Kumasi] Candidature — ${oneLine(data.poste)} — ${oneLine(data.nom)}`
  const text = [
    'Nouvelle candidature reçue depuis la page « Nous rejoindre » du site.',
    '',
    `Poste visé : ${data.poste}`,
    `Nom : ${data.nom}`,
    `E-mail : ${data.email}`,
    data.tel && `Téléphone : ${data.tel}`,
    data.msg && `\nQuelques mots :\n${data.msg}`,
    '',
    'CV en pièce jointe. Consentement recueilli via la case à cocher du formulaire.',
  ]
    .filter(Boolean)
    .join('\n')

  const to = process.env.CANDIDATURES_EMAIL
  if (!process.env.RESEND_API_KEY || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        `[email] (dev) Candidature non envoyée — RESEND_API_KEY ou CANDIDATURES_EMAIL manquant.\nObjet : ${subject}\n${text}\nPièce jointe : ${cv.filename} (${cv.content.length} octets)`,
      )
      return { ok: true }
    }
    return { ok: false, error: 'RESEND_API_KEY ou destinataire (CANDIDATURES_EMAIL) manquant' }
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: data.email,
      subject,
      text,
      attachments: [{ filename: cv.filename, content: cv.content }],
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur inconnue' }
  }
}
