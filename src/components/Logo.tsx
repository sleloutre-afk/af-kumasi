import Link from 'next/link'
import { ROUTES } from '@/lib/site'

/*
 * Logo PROVISOIRE, recomposé en police comme dans les maquettes. La charte AF
 * interdit de modifier le logo : à remplacer par les fichiers officiels
 * « Alliance Française + ville » dès qu'ils sont fournis.
 */

/** Logo horizontal (en-tête). `sm` : version compacte des écrans étroits. */
export function LogoH({ sm = false }: { sm?: boolean }) {
  return (
    <Link className={sm ? 'logo-h sm' : 'logo-h'} href={ROUTES.accueil} aria-label="Alliance Française de Kumasi — accueil">
      <span className="pic" aria-hidden="true">
        a<i>f</i>
      </span>
      <span className="txt" aria-hidden="true">
        <span className="a">
          Alliance<span className="f">Française</span>
        </span>
        <span className="v">Kumasi</span>
      </span>
    </Link>
  )
}

/** Logo vertical, en blanc (pied de page). */
export function LogoV() {
  return (
    <Link className="logo-v" href={ROUTES.accueil} aria-label="Alliance Française de Kumasi — accueil">
      <span className="pic" aria-hidden="true">
        a<i>f</i>
      </span>
      <span className="a" aria-hidden="true">
        AllianceFrançaise
      </span>
      <span className="v" aria-hidden="true">
        Kumasi
      </span>
    </Link>
  )
}
