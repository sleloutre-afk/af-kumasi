import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Politique de confidentialité' }

const SOMMAIRE = [
  { id: 'responsable', label: 'Responsable du traitement' },
  { id: 'donnees', label: 'Données recueillies' },
  { id: 'finalites', label: 'Finalités' },
  { id: 'conservation', label: 'Durées de conservation' },
  { id: 'destinataires', label: 'Destinataires et hébergement' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'cookies', label: 'Cookies' },
]

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="[DATE]" sommaire={SOMMAIRE}>
      <h2 id="responsable" className="h3">Responsable du traitement</h2>
      <p>Alliance Française de Kumasi, [ADRESSE À COMPLÉTER], Kumasi, Ghana. Contact&nbsp;: [EMAIL].</p>
      <p>[Enregistrement auprès de la Data Protection Commission du Ghana&nbsp;: à confirmer par un juriste.]</p>

      <h2 id="donnees" className="h3">Données recueillies</h2>
      <p>
        Le site ne recueille que les informations que vous saisissez vous-même dans ses formulaires&nbsp;: formulaire de contact (nom, téléphone, e-mail,
        message) et formulaire de candidature (nom, téléphone, e-mail, poste visé, CV, message).
      </p>

      <h2 id="finalites" className="h3">Finalités</h2>
      <p>Répondre à votre demande (contact) et étudier votre candidature (recrutement). Vos données ne sont ni vendues ni utilisées à d’autres fins.</p>

      <h2 id="conservation" className="h3">Durées de conservation</h2>
      <p>Messages de contact&nbsp;: [durée à valider]. Candidatures non retenues&nbsp;: supprimées 12&nbsp;mois après la clôture de l’offre, sauf accord du candidat [durée à valider].</p>

      <h2 id="destinataires" className="h3">Destinataires et hébergement</h2>
      <p>
        Seule l’équipe habilitée de l’Alliance a accès à vos données (les candidatures&nbsp;: la direction uniquement). [Prestataires techniques
        (hébergement, envoi d’e-mails) et lieu d’hébergement des données à compléter.]
      </p>

      <h2 id="droits" className="h3">Vos droits</h2>
      <p>Vous pouvez demander l’accès à vos données, leur correction ou leur suppression en écrivant à [EMAIL].</p>

      <h2 id="cookies" className="h3">Cookies</h2>
      <p>
        Le site ne dépose aucun cookie de mesure d’audience ni de publicité. Seul l’espace d’administration utilise des cookies techniques, nécessaires à
        la connexion de l’équipe. [À mettre à jour si une mesure d’audience est ajoutée.]
      </p>
    </LegalPage>
  )
}
