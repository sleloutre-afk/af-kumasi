import type { Coordonnees } from '@/lib/reglages'
import { ROUTES } from '@/lib/site'
import { external } from './Footer'
import { Icon } from './Icons'

export type MobileBarAction = { label: string; href: string; external?: boolean }

/**
 * Barre d'actions collée en bas des écrans étroits (maquettes mobiles).
 * Par défaut : « Appeler l'Alliance » + bouton WhatsApp. Le site étant
 * informatif, les actions « S'inscrire… » des maquettes sont remplacées.
 */
export function MobileBar({ c, action, wa }: { c: Coordonnees; action?: MobileBarAction; wa?: { href: string; label: string } }) {
  const main: MobileBarAction = action ?? { label: 'Appeler l’Alliance', href: c.telHref ?? ROUTES.contact }
  return (
    <div className="mbar">
      <a className="btn btn-red" href={main.href} {...(main.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {main.label}
      </a>
      <a
        className="wa"
        href={wa?.href ?? c.waHref ?? ROUTES.contact}
        aria-label={wa?.label ?? 'Nous écrire sur WhatsApp'}
        {...external(wa?.href ?? c.waHref)}
      >
        <Icon name="whatsappPlus" size={22} />
      </a>
    </div>
  )
}
