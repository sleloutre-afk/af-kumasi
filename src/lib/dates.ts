/**
 * Dates et heures à la française, à l'heure de Kumasi (Africa/Accra, UTC+0),
 * au format des maquettes : « Sam. », « 21 », « nov. », « 18 h 30 ».
 */
const TZ = 'Africa/Accra'

const part = (d: Date, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, ...opts }).format(d)

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** « Sam. » */
export const jourCourt = (d: Date) => cap(part(d, { weekday: 'short' }))
/** « 21 » (deux chiffres, comme « 05 déc. » dans les maquettes) */
export const jourNum = (d: Date) => part(d, { day: '2-digit' })
/** « nov. » / « juin » */
export const moisCourt = (d: Date) => part(d, { month: 'short' })
/** « 21 nov. » */
export const jourMois = (d: Date) => `${part(d, { day: 'numeric' })} ${moisCourt(d)}`
/** « samedi 21 novembre 2026 » */
export const dateLongue = (d: Date) => part(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
/** « Sam. 21 nov. 2026 » */
export const dateMoyenne = (d: Date) => `${jourCourt(d)} ${jourMois(d)} ${part(d, { year: 'numeric' })}`
/** « Octobre 2026 » */
export const moisAnnee = (d: Date) => cap(part(d, { month: 'long', year: 'numeric' }))

/** « 18 h 30 », « 15 h » */
export function heure(d: Date): string {
  const parts = new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d)
  const h = Number(parts.find((p) => p.type === 'hour')?.value)
  const m = parts.find((p) => p.type === 'minute')?.value ?? '00'
  return m === '00' ? `${h} h` : `${h} h ${m}`
}

/** Clé de mois « 2026-11 » (filtres de l'agenda). */
export const cleMois = (d: Date) => `${part(d, { year: 'numeric' })}-${part(d, { month: '2-digit' })}`
