/**
 * ⚠️ DONNÉES DE DÉMONSTRATION — EXEMPLES FICTIFS repris des maquettes.
 *
 * Événements et offres d'emploi d'exemple, utilisés tant que les back-offices
 * « Événements » et « Offres d'emploi » ne sont pas construits. Ils seront
 * ensuite chargés dans le BO comme données de démonstration (clairement
 * identifiées, faciles à supprimer) et ce fichier disparaîtra.
 *
 * Rien ici n'est une information réelle de l'Alliance : dates, titres, lieux,
 * offres sont inventés pour la maquette.
 */

export type Categorie = 'Cinéma' | 'Musique' | 'Exposition' | 'Jeunesse' | 'Rencontre'

export const CATEGORIES: Categorie[] = ['Cinéma', 'Musique', 'Exposition', 'Jeunesse', 'Rencontre']

/** Couleur de la carte selon la catégorie (maquettes). */
export const TON: Record<Categorie, 'gb' | 'fu' | 'bo' | 'red' | 'an'> = {
  Cinéma: 'gb',
  Musique: 'fu',
  Exposition: 'bo',
  Jeunesse: 'red',
  Rencontre: 'an',
}

export type Evenement = {
  slug: string
  titre: string
  accroche: string
  categorie: Categorie
  etiquettes?: string[]
  /** Date et heure de début, ISO, heure de Kumasi (UTC+0). */
  debut: string
  /** Pour les expositions : « Du … au … ». */
  fin?: string
  lieu: string
  /** Légende de l'emplacement photo (image réelle à fournir). */
  photo: string
  /** « Entrée libre » ou « X GHS sur place ». Marqueur tant que l'Alliance ne l'a pas fourni. */
  tarif?: string
  alaUne?: boolean
  annule?: boolean
  galerie?: 'Photos' | 'Vidéo'
  // Contenu de la fiche (facultatif) :
  /** Citation mise en avant ; à défaut, l'accroche. */
  citation?: string
  description?: string[]
  /** Version plus courte de la description, sur mobile (maquette). */
  descriptionCourte?: string
  programme?: { heure: string; titre: string; detail?: string }[]
  invites?: { nom: string; role: string }[]
  public?: string
  langue?: string
  langueCourte?: string
  tarifDetail?: string
  tarifCourt?: string
}

export const EVENEMENTS: Evenement[] = [
  {
    slug: 'nuit-du-cinema-francophone',
    titre: 'Nuit du cinéma francophone',
    accroche:
      'Trois courts et un long métrage d’Afrique de l’Ouest et de France, projetés en plein air dans le jardin de l’Alliance. Rencontre avec les réalisateurs.',
    categorie: 'Cinéma',
    etiquettes: ['Plein air'],
    debut: '2026-11-21T18:30:00Z',
    fin: '2026-11-21T23:00:00Z',
    lieu: 'Jardin de l’Alliance',
    photo: 'Photo · Projection en plein air',
    alaUne: true,
    citation: 'Une nuit, quatre films, deux continents : le cinéma francophone sous les étoiles de Kumasi.',
    description: [
      'Pour cette nouvelle édition, l’Alliance installe un écran géant dans son jardin. Au programme : trois courts métrages d’Afrique de l’Ouest et un long métrage français, en version originale sous-titrée en anglais. La soirée se termine par une rencontre avec les réalisateurs.',
      'Restauration légère sur place. Pensez à venir un peu en avance pour profiter de l’ambiance.',
    ],
    descriptionCourte:
      'Un écran géant dans le jardin de l’Alliance : trois courts métrages d’Afrique de l’Ouest et un long métrage français, en VO sous-titrée anglais, suivis d’une rencontre avec les réalisateurs.',
    programme: [
      { heure: '18:30', titre: 'Accueil & musique', detail: 'DJ set afro-francophone dans le jardin.' },
      { heure: '19:00', titre: 'Trois courts métrages', detail: '[Titres et réalisateurs à compléter.]' },
      { heure: '20:15', titre: 'Long métrage', detail: '[Titre, année, durée.] VOSTA.' },
      { heure: '22:00', titre: 'Rencontre avec les réalisateurs', detail: 'Échange avec le public, en français et en anglais.' },
    ],
    invites: [
      { nom: '[Prénom Nom]', role: 'Réalisateur·rice · [Pays]' },
      { nom: '[Prénom Nom]', role: 'Réalisateur·rice · [Pays]' },
    ],
    public: 'Tout public',
    langue: 'Français, sous-titres anglais',
    langueCourte: 'Français, s.-t. anglais',
    tarifDetail: '[Entrée libre / X GHS sur place · réduit membres]',
    tarifCourt: '[Entrée libre / X GHS]',
  },
  {
    slug: 'kejetia-la-ville-en-mouvement',
    titre: 'Kejetia, la ville en mouvement',
    accroche: 'Une exposition consacrée au grand marché de Kumasi et à la ville qui bouge.',
    categorie: 'Exposition',
    debut: '2026-11-12T10:00:00Z',
    fin: '2026-12-18T18:00:00Z',
    lieu: 'Galerie',
    photo: 'Photo · Œuvre exposée',
  },
  {
    slug: 'atelier-bd-et-contes',
    titre: 'Atelier BD & contes pour les 8–12 ans',
    accroche: 'Inventer, dessiner et raconter une histoire en français.',
    categorie: 'Jeunesse',
    etiquettes: ['Jeune public'],
    debut: '2026-11-25T15:00:00Z',
    lieu: 'Médiathèque',
    photo: 'Photo · Enfants dessinant',
  },
  {
    slug: 'cafe-conversation',
    titre: 'Café conversation : parlons français !',
    accroche: 'Un moment convivial pour pratiquer le français à l’oral.',
    categorie: 'Rencontre',
    debut: '2026-11-26T17:30:00Z',
    lieu: 'Cafétéria',
    photo: 'Photo · Échanges autour d’un café',
  },
  {
    slug: 'concert-highlife-et-chanson-francaise',
    titre: 'Concert : highlife & chanson française',
    accroche: 'Quand la highlife ghanéenne rencontre la chanson française.',
    categorie: 'Musique',
    debut: '2026-12-05T19:00:00Z',
    lieu: 'Auditorium',
    photo: 'Photo · Groupe sur scène',
  },
  {
    slug: 'cine-gouter-jeunesse',
    titre: 'Ciné-goûter : film d’animation en VF',
    accroche: 'Un film d’animation en version française, suivi d’un goûter.',
    categorie: 'Cinéma',
    etiquettes: ['Jeune public'],
    debut: '2026-12-12T14:00:00Z',
    lieu: 'Auditorium',
    photo: 'Photo · Jeune public en salle',
  },
  {
    slug: 'etudier-en-france-mode-d-emploi',
    titre: 'Étudier en France : mode d’emploi',
    accroche: 'Une rencontre pour préparer un projet d’études en France.',
    categorie: 'Rencontre',
    debut: '2026-12-16T16:00:00Z',
    lieu: 'Salle de conférence',
    photo: 'Photo · Rencontre',
  },
  {
    slug: 'nuit-de-la-lecture',
    titre: 'Nuit de la lecture',
    accroche: 'Lectures à voix haute et découvertes à la médiathèque.',
    categorie: 'Rencontre',
    debut: '2027-01-16T18:00:00Z',
    lieu: 'Médiathèque',
    photo: 'Photo · Lecture',
  },
  {
    slug: 'cine-club-janvier',
    titre: 'Ciné-club',
    accroche: 'Un film francophone, puis un échange avec le public.',
    categorie: 'Cinéma',
    debut: '2027-01-29T18:30:00Z',
    lieu: 'Auditorium',
    photo: 'Photo · Projection',
  },
  {
    slug: 'atelier-percussions-et-danse',
    titre: 'Atelier percussions & danse',
    accroche: 'Percussions et danse, en plein air, pour tous.',
    categorie: 'Musique',
    etiquettes: ['Plein air'],
    debut: '2027-01-30T10:00:00Z',
    lieu: 'Jardin',
    photo: 'Photo · Percussions',
  },
  // Événements passés
  {
    slug: 'remise-des-diplomes-delf-dalf-2026',
    titre: 'Remise des diplômes DELF & DALF',
    accroche: 'La cérémonie de remise des diplômes de la session.',
    categorie: 'Rencontre',
    debut: '2026-10-10T16:00:00Z',
    lieu: 'Auditorium',
    photo: 'Photo · Remise des diplômes DELF',
    galerie: 'Photos',
  },
  {
    slug: 'cine-club-de-rentree',
    titre: 'Ciné-club de rentrée',
    accroche: 'Le premier ciné-club de la saison.',
    categorie: 'Cinéma',
    debut: '2026-09-25T18:30:00Z',
    lieu: 'Auditorium',
    photo: 'Photo · Ciné-club',
  },
  {
    slug: 'spectacle-de-fin-d-annee-2026',
    titre: 'Spectacle de fin d’année',
    accroche: 'Le spectacle des élèves des cours enfants et ados.',
    categorie: 'Jeunesse',
    debut: '2026-07-04T15:00:00Z',
    lieu: 'Jardin',
    photo: 'Photo · Spectacle jeunesse',
    galerie: 'Vidéo',
  },
  {
    slug: 'fete-de-la-musique-2026',
    titre: 'Fête de la musique',
    accroche: 'Scène ouverte dans le jardin de l’Alliance.',
    categorie: 'Musique',
    debut: '2026-06-21T17:00:00Z',
    lieu: 'Jardin',
    photo: 'Vidéo · Fête de la musique',
    galerie: 'Photos',
  },
  {
    slug: 'les-70-ans-de-l-alliance',
    titre: 'Les 70 ans de l’Alliance',
    accroche: 'L’Alliance Française de Kumasi fête ses 70 ans.',
    categorie: 'Rencontre',
    debut: '2026-05-16T17:00:00Z',
    lieu: 'Jardin',
    photo: 'Photo · Concert dans le jardin',
    galerie: 'Vidéo',
  },
  {
    slug: 'exposition-de-fin-d-annee-2025',
    titre: 'Exposition de fin d’année',
    accroche: 'Les travaux des ateliers d’arts plastiques.',
    categorie: 'Exposition',
    debut: '2025-12-13T10:00:00Z',
    lieu: 'Galerie',
    photo: 'Photo · Vernissage',
    galerie: 'Photos',
  },
]

export type Offre = {
  slug: string
  intitule: string
  contrat: 'CDI' | 'CDD' | 'Temps partiel' | 'Stage' | 'Volontariat'
  duree: string
  lieu: string
  prisePoste?: string
  /** Ligne d'infos de la page Nous rejoindre (grand écran / mobile). */
  meta: string
  metaCourt: string
  missions: string
  profil: string
  conditions: string
  dateLimite: string
  surAccueil?: boolean
}

export const OFFRES: Offre[] = [
  {
    slug: 'professeur-de-fle',
    intitule: 'Professeur·e de FLE',
    contrat: 'Temps partiel',
    duree: 'Temps partiel',
    lieu: 'Kumasi',
    prisePoste: 'janvier 2027',
    meta: 'Kumasi · Prise de poste janvier 2027',
    metaCourt: 'Janv. 2027',
    missions:
      'Enseigner le français à des groupes d’adultes et d’enfants, de A1 à B2 ; préparer les apprenants au DELF ; participer à la vie pédagogique.',
    profil: 'Diplôme en FLE (master, DAEFLE ou équivalent), expérience d’enseignement, anglais courant.',
    conditions: '[Volume horaire, rémunération et statut à compléter.]',
    dateLimite: '[DATE]',
    surAccueil: true,
  },
  {
    slug: 'charge-de-communication-et-evenements',
    intitule: 'Chargé·e de communication & événements',
    contrat: 'CDD',
    duree: '12 mois',
    lieu: 'Kumasi',
    meta: '12 mois · Kumasi',
    metaCourt: '12 mois',
    missions: 'Animer le site et les réseaux sociaux, coordonner la programmation culturelle, accueillir les artistes.',
    profil: 'Expérience en communication ou en production culturelle, français et anglais courants.',
    conditions: '[À compléter.]',
    dateLimite: '[DATE]',
    surAccueil: true,
  },
  {
    slug: 'assistant-accueil-et-administration',
    intitule: 'Assistant·e d’accueil & administration',
    contrat: 'CDI',
    duree: 'Temps plein',
    lieu: 'Kumasi',
    meta: 'Temps plein · Kumasi',
    metaCourt: 'Temps plein',
    missions: 'Accueillir et renseigner le public, gérer les inscriptions aux cours et aux examens, assurer le suivi administratif.',
    profil: 'Sens du service, rigueur, bonne maîtrise du français et de l’anglais. Le twi est un plus.',
    conditions: '[À compléter.]',
    dateLimite: '[DATE]',
  },
  {
    slug: 'stage-mediation-culturelle',
    intitule: 'Stage : médiation culturelle',
    contrat: 'Stage',
    duree: '6 mois',
    lieu: 'Kumasi',
    meta: '6 mois · à partir de [DATE]',
    metaCourt: '6 mois',
    missions: 'Participer à l’organisation des événements, concevoir des ateliers jeunesse, animer la médiathèque.',
    profil: 'Étudiant·e en médiation culturelle, FLE ou communication.',
    conditions: '[Gratification et convention de stage à préciser.]',
    dateLimite: '[DATE]',
  },
]
