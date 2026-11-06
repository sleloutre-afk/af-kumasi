import type { ReactNode } from 'react'
import { PageShell } from './PageShell'
import { PageHero } from './PageHero'

/**
 * Gabarit des pages légales : sommaire, puis texte. Ce sont des MODÈLES :
 * toutes les informations juridiques restent entre crochets tant que
 * l'Alliance (et un juriste local pour le Data Protection Act, 2012, Act 843)
 * ne les a pas fournies et validées.
 */
export function LegalPage({
  title,
  updated,
  sommaire,
  children,
}: {
  title: string
  updated: string
  sommaire: { id: string; label: string }[]
  children: ReactNode
}) {
  return (
    <PageShell>
      <PageHero tone="dk" crumb={title} title={title} lead={`Dernière mise à jour : ${updated}`} netDesktop={null} netMobile={null} />
      <section className="wrap sec">
        <div className="split">
          <nav className="aside legal-toc" aria-label="Sommaire">
            <p className="p up muted">Sommaire</p>
            {sommaire.map((s) => (
              <a key={s.id} className="flink legal-link" href={`#${s.id}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <article className="main legal">
            <p className="legal-notice">
              <strong>Modèle à compléter.</strong> Les mentions entre crochets sont à fournir par l’Alliance et le texte est à faire valider par un
              juriste, notamment au regard du Data Protection Act, 2012 (Act 843) du Ghana.
            </p>
            {children}
          </article>
        </div>
      </section>
    </PageShell>
  )
}
