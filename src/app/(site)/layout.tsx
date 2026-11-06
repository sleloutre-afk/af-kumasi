import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Bodoni_Moda, Source_Sans_3 } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import '@/styles/site.css'

// Polices de la charte AF pour le web : Bodoni Moda (titres, accroches) et
// Source Sans 3 (texte courant). Téléchargées à la compilation et servies par
// le site lui-même : aucun appel à Google côté visiteur.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-bodoni',
})
const source = Source_Sans_3({ subsets: ['latin'], display: 'swap', variable: '--font-source' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alliance Française de Kumasi : cours de français et culture francophone',
    template: '%s | Alliance Française de Kumasi',
  },
  description:
    'Depuis 1956, l’Alliance Française de Kumasi enseigne le français à tous les âges et fait vivre les cultures francophones et ghanéennes.',
}

export const viewport: Viewport = { themeColor: '#da002e' }

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${source.variable}`}>
      <body>
        {/* Lien d'évitement, visible au clavier seulement. */}
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  )
}
