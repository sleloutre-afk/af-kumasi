import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: true, follow: true } }

const SOMMAIRE = [
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'publication', label: 'Directeur de la publication' },
  { id: 'hebergement', label: 'Hébergement' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'credits', label: 'Crédits' },
]

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updated="[DATE]" sommaire={SOMMAIRE}>
      <h2 id="editeur" className="h3">Éditeur du site</h2>
      <p>
        Alliance Française de Kumasi, association [forme juridique et numéro d’enregistrement à compléter], fondée le 16&nbsp;mai 1956, membre du réseau
        de la Fondation des Alliances Françaises.
      </p>
      <p>Adresse&nbsp;: [ADRESSE À COMPLÉTER], Kumasi, Ghana. Téléphone&nbsp;: [TÉLÉPHONE]. E-mail&nbsp;: [EMAIL].</p>

      <h2 id="publication" className="h3">Directeur de la publication</h2>
      <p>[Prénom Nom, fonction].</p>

      <h2 id="hebergement" className="h3">Hébergement</h2>
      <p>[Nom, adresse et téléphone de l’hébergeur du site, à compléter une fois l’hébergement définitif choisi.]</p>

      <h2 id="propriete" className="h3">Propriété intellectuelle</h2>
      <p>
        Les textes, photographies, vidéos et éléments graphiques de ce site sont la propriété de l’Alliance Française de Kumasi ou de leurs auteurs, et
        ne peuvent être reproduits sans autorisation. Le logo «&nbsp;Alliance Française&nbsp;» est la propriété de la Fondation des Alliances
        Françaises. [À valider.]
      </p>

      <h2 id="credits" className="h3">Crédits</h2>
      <p>Photographies&nbsp;: crédit indiqué sous chaque image («&nbsp;DR&nbsp;» à défaut). Conception et réalisation du site&nbsp;: [À COMPLÉTER].</p>
    </LegalPage>
  )
}
