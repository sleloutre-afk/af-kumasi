import type { CSSProperties } from 'react'

/**
 * Carte de l'Alliance : la carte Google Maps intégrée dès que son lien est
 * renseigné dans le BO (Coordonnées & horaires), sinon l'emplacement dessiné
 * des maquettes. La carte n'est chargée qu'au moment où elle devient visible
 * (loading="lazy"), pour ne pas alourdir les pages en données mobiles.
 */
export function MapBlock({
  src,
  large = false,
  style,
  label = 'Alliance Française',
}: {
  src: string | null
  large?: boolean
  style?: CSSProperties
  label?: string
}) {
  return (
    <div className={large ? 'map lg' : 'map'} style={style}>
      {src ? (
        <iframe src={src} title="Plan d’accès à l’Alliance Française de Kumasi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <>
          <div className="pin" aria-hidden="true">
            <span className="pl">{label}</span>
            <span className="pt" />
            <span className="pd" />
          </div>
          <span className="lbl">Carte Google Maps intégrée</span>
        </>
      )}
    </div>
  )
}
