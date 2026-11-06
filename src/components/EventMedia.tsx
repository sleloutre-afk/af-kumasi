import type { Carte } from '@/lib/evenements'

/** Bloc date blanc posé en haut à gauche de la photo d'un événement. */
export function DateBlock({ c, sm = false }: { c: Pick<Carte, 'd1' | 'd2' | 'd3'>; sm?: boolean }) {
  return (
    <div className={sm ? 'date sm' : 'date'}>
      <span className="d1">{c.d1}</span>
      <span className="d2">{c.d2}</span>
      <span className="d3">{c.d3}</span>
    </div>
  )
}

/** Pictogramme appareil photo des légendes d'emplacement photo. */
export function CameraIcon({ size = 15 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6l2-3h4l2 3" />
    </svg>
  )
}

export function ClockIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function ArrowIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronIcon({ size = 18, color = '#da002e' }: { size?: number; color?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}
