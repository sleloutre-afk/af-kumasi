import type { CSSProperties, ReactNode } from 'react'
import { cx } from '@/lib/cx'

type Tone = 'red' | 'fu' | 'an' | 'bo' | 'gb' | 'bk'

/**
 * Emplacement réservé à une photo ou une vidéo réelle, à fournir par l'Alliance
 * (blocs « Photo · … » / « Vidéo · … » des maquettes). Toute image réelle
 * portera un crédit (charte AF) : CREDIT dans src/lib/site.ts.
 */
export function Ph({
  cap,
  capShort,
  tone = 'gb',
  video = false,
  word,
  wordCenter = false,
  wordSize,
  play = false,
  className,
  style,
  children,
}: {
  cap: string
  /** Légende plus courte affichée sur mobile (maquettes mobiles). */
  capShort?: string
  tone?: Tone
  video?: boolean
  /** Mot en filigrane (« Akwaaba », « Aa »…). */
  word?: string
  wordCenter?: boolean
  wordSize?: number
  play?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div className={cx('ph', `t-${tone}`, video && 'vid', className)} style={style} role="img" aria-label={cap}>
      {word && (
        <span className={wordCenter ? 'word c' : 'word'} style={wordSize ? { fontSize: wordSize } : undefined} aria-hidden="true">
          {word}
        </span>
      )}
      {play && <span className="play" aria-hidden="true" />}
      {children}
      <span className="cap" aria-hidden="true">
        {capShort ? (
          <>
            <span className="d-only-i">{cap}</span>
            <span className="m-only-i">{capShort}</span>
          </>
        ) : (
          cap
        )}
      </span>
    </div>
  )
}
