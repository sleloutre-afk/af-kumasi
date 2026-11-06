import type { CSSProperties } from 'react'

/**
 * Logo PROVISOIRE de l'Alliance Française de Kumasi, recomposé en police comme
 * dans les maquettes. La charte interdit de modifier le logo : en production,
 * il sera remplacé par les fichiers officiels « Alliance Française + ville »
 * (à demander à l'Alliance / la Fondation).
 *
 * Styles en ligne : ce composant sert aussi hors du site (back-office, page de
 * contrôle anti-robots), là où la feuille de style du site n'est pas chargée.
 */
const serif = "'Bodoni Moda', 'Bodoni 72', Didot, 'Times New Roman', serif"

export function LogoAF({ scale = 1, dark = false }: { scale?: number; dark?: boolean }) {
  const box: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'stretch',
    border: `${2 * scale}px solid #da002e`,
    background: '#fff',
    fontFamily: serif,
    lineHeight: 1.1,
    color: '#1a171b',
    verticalAlign: 'middle',
  }
  return (
    <span style={box} role="img" aria-label="Alliance Française de Kumasi">
      <span
        aria-hidden="true"
        style={{
          background: '#da002e',
          color: '#fff',
          fontSize: 34 * scale,
          lineHeight: 1,
          padding: `${6 * scale}px ${12 * scale}px ${10 * scale}px`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        a<i>f</i>
      </span>
      <span
        aria-hidden="true"
        style={{
          padding: `${6 * scale}px ${14 * scale}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark ? '#fff' : undefined,
        }}
      >
        <span style={{ fontSize: 20 * scale, letterSpacing: '-.01em' }}>
          Alliance<span style={{ color: '#87888a' }}>Française</span>
        </span>
        <span style={{ fontStyle: 'italic', fontSize: 14 * scale }}>Kumasi</span>
      </span>
    </span>
  )
}
