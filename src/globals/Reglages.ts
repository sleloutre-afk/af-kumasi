import type { Access, GlobalConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'

const isSuperAdmin: Access = ({ req }) => (req.user as { role?: string } | null)?.role === 'super-admin'

/**
 * Coordonnées et horaires de l'Alliance, repris dans le pied de page, la page
 * Contact, la barre d'actions mobile (Appeler, WhatsApp) et les liens d'itinéraire.
 * Tant qu'un champ est vide, le site affiche le marqueur entre crochets des
 * maquettes ([TÉLÉPHONE], [ADRESSE À COMPLÉTER]…) : rien n'est inventé.
 */
export const Reglages: GlobalConfig = {
  slug: 'reglages',
  label: 'Coordonnées & horaires',
  admin: {
    group: 'Réglages',
    description:
      'Adresse, téléphone, WhatsApp, e-mail et horaires de l’Alliance. Ces informations apparaissent sur toutes les pages du site. Un champ laissé vide s’affiche « [À COMPLÉTER] ».',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: 'collapsible',
      label: 'Adresse',
      fields: [
        {
          name: 'adresse',
          type: 'text',
          label: 'Adresse (rue, quartier)',
          admin: { description: 'Sans « Kumasi, Ghana », ajouté automatiquement.' },
        },
        { name: 'reperes', type: 'text', label: 'Repères pour trouver l’Alliance', admin: { description: 'Ex. « en face de… ».' } },
        {
          name: 'lienItineraire',
          type: 'text',
          label: 'Lien Google Maps (itinéraire)',
          admin: { description: 'Adresse de la fiche Google Maps de l’Alliance (bouton « Itinéraire »).' },
        },
        {
          name: 'carteIntegree',
          type: 'text',
          label: 'Lien de la carte intégrée',
          admin: {
            description:
              'Sur Google Maps : Partager → Intégrer une carte → copier uniquement l’adresse qui suit src="…". Sans lien, un emplacement de carte s’affiche.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Téléphone, WhatsApp, e-mail',
      fields: [
        { name: 'telephone', type: 'text', label: 'Téléphone', admin: { description: 'Format international, ex. +233 …' } },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'Numéro WhatsApp',
          admin: { description: 'Format international, ex. +233 … Sert aux boutons « WhatsApp ».' },
        },
        {
          name: 'chaineWhatsapp',
          type: 'text',
          label: 'Lien de la chaîne WhatsApp de l’agenda',
          admin: { description: 'Facultatif. Sans lien, le bloc « chaîne WhatsApp » de l’agenda n’apparaît pas.' },
        },
        { name: 'email', type: 'email', label: 'E-mail de contact' },
        {
          name: 'delaiReponse',
          type: 'text',
          label: 'Délai de réponse aux messages',
          admin: { description: 'Ex. « 2 jours ouvrés ». Affiché après l’envoi du formulaire de contact.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Horaires',
      fields: [
        {
          name: 'horairesResume',
          type: 'text',
          label: 'Horaires d’accueil (résumé)',
          admin: { description: 'Une ligne pour le pied de page, ex. « lun.–ven. 8 h–17 h, sam. 9 h–13 h ».' },
        },
        { name: 'horairesSemaine', type: 'text', label: 'Lundi – vendredi' },
        { name: 'horairesSamedi', type: 'text', label: 'Samedi' },
        { name: 'horairesDimanche', type: 'text', label: 'Dimanche' },
        { name: 'horairesMediatheque', type: 'text', label: 'Médiathèque' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Réseaux sociaux',
      admin: { description: 'Un réseau sans lien n’apparaît pas.' },
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn' },
      ],
    },
  ],
}
