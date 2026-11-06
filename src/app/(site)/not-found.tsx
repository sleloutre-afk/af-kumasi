import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { PageHero } from '@/components/PageHero'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <PageShell>
      <PageHero tone="dk" crumb="Page introuvable" title={<>Page <i>introuvable</i></>} lead="La page demandée n’existe pas ou a été déplacée." netDesktop={null} netMobile={null}>
        <div className="row g14 rise d3s">
          <Link className="btn btn-red arr" href={ROUTES.accueil}>
            Retour à l’accueil
          </Link>
          <Link className="btn btn-linew" href={ROUTES.agenda}>
            Voir l’agenda
          </Link>
        </div>
      </PageHero>
    </PageShell>
  )
}
