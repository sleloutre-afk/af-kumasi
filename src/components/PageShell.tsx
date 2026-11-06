import type { ReactNode } from 'react'
import { getCoordonnees } from '@/lib/reglages'
import { Footer } from './Footer'
import { MobileBar, type MobileBarAction } from './MobileBar'

/**
 * Habillage commun : contenu de la page (qui commence par son visuel
 * d'ouverture, en-tête compris), pied de page, barre d'actions mobile.
 */
export async function PageShell({
  children,
  mobileAction,
  mobileWa,
}: {
  children: ReactNode
  mobileAction?: MobileBarAction
  /** Remplace le bouton WhatsApp de la barre mobile (fiche événement : « Partager sur WhatsApp »). */
  mobileWa?: { href: string; label: string }
}) {
  const c = await getCoordonnees()
  return (
    <>
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <Footer c={c} />
      <MobileBar c={c} action={mobileAction} wa={mobileWa} />
    </>
  )
}
