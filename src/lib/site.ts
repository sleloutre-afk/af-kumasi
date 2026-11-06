/** Adresses des pages du site. */
export const ROUTES = {
  accueil: '/',
  alliance: '/alliance',
  cours: '/cours',
  agenda: '/agenda',
  services: '/services',
  rejoindre: '/nous-rejoindre',
  contact: '/contact',
  mentions: '/mentions-legales',
  confidentialite: '/confidentialite',
} as const

export type RouteKey = keyof typeof ROUTES

/** Navigation principale (en-tête et menu mobile), dans l'ordre des maquettes. */
export const NAV: { key: RouteKey; label: string }[] = [
  { key: 'alliance', label: 'L’Alliance' },
  { key: 'cours', label: 'Cours' },
  { key: 'agenda', label: 'Événements' },
  { key: 'services', label: 'Services' },
  { key: 'rejoindre', label: 'Nous rejoindre' },
  { key: 'contact', label: 'Contact' },
]

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3092'

/**
 * Version anglaise : pas encore construite (la version française vient d'abord).
 * Tant que ce drapeau est faux, le bouton « EN » du sélecteur de langue est affiché mais inactif.
 */
export const EN_AVAILABLE = false

/**
 * Crédit des images et vidéos du site (charte AF : toute image porte un crédit).
 * Choix de Simon (6 nov. 2026) : « © Alliance Française de Kumasi » partout, à la place de « DR ».
 */
export const CREDIT = '© Alliance Française de Kumasi'

/** Chiffres réels connus (voir CLAUDE.md) — ne rien inventer d'autre. */
export const CHIFFRES = {
  fondation: '16 mai 1956',
  anneeFondation: 1956,
  apprenants2025: 864,
  alliancesDansLeMonde: 800,
}
