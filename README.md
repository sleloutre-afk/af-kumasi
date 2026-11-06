# Alliance Française de Kumasi — site internet

Refonte du site de l’Alliance Française de Kumasi (Ghana), en Next.js 15 / React 19, avec un
back-office Payload CMS 3 (même socle que les sites Doxamed, Capitello et Teledok). Version
française d’abord ; l’anglais suivra (champs FR/EN déjà prévus dans le BO).

## Lancer le site en local

```bash
cp .env.example .env   # renseigner PAYLOAD_SECRET (openssl rand -hex 32)
npm install
npm run dev
```

- Site : **http://localhost:3092** (sur un téléphone du même Wi-Fi : `http://<adresse-du-Mac>:3092`)
- Back-office : **http://localhost:3092/BO** — le premier compte créé est super administrateur.

En local, la base est un fichier SQLite (`payload.db`) et les fichiers du BO vont dans `./media`
(aucun service externe). Pour la démonstration : Postgres + stockage Supabase, voir `.env.example`.

`npm run build` vérifie que tout compile (ne pas le lancer pendant que `npm run dev` tourne dans le
même dossier).

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/app/(site)` | Les pages : accueil, L’Alliance, Cours, Agenda (+ fiche événement et fichier .ics), Services, Nous rejoindre, Contact, pages légales, 404. |
| `src/components` | En-tête et menu mobile, pied de page, barre d’actions mobile, visuels d’ouverture, emplacements photo, formulaires, listes interactives (agenda, offres, « Trouver mon cours »). |
| `src/styles/site.css` | Charte AF (couleurs, Bodoni Moda / Source Sans 3), composants, puis styles de chaque page. Les règles des maquettes mobiles sont dans les `@media (max-width: 760px)`. |
| `src/lib` | Adresses des pages, dates à la française, règles d’affichage des événements, coordonnées lues dans le BO, formulaires et envoi d’e-mails. |
| `src/data/demo.ts` | ⚠️ **Données de démonstration fictives** (événements, offres d’emploi) reprises des maquettes, en attendant les back-offices Événements et Offres d’emploi. |
| `src/collections`, `src/globals`, `src/payload.config.ts` | Le back-office (comptes, fichiers, « Coordonnées & horaires »). |
| `src/middleware.ts` | Contrôle anti-robots devant `/BO`, règle de mot de passe, adresse officielle. |

## Contenus

- Rien n’est inventé : tant qu’une information n’est pas fournie par l’Alliance, le site affiche le
  marqueur des maquettes (`[TÉLÉPHONE]`, `[DATE]`, `[TARIF]`…).
- Coordonnées, horaires, réseaux sociaux, lien Google Maps et chaîne WhatsApp : BO → **Réglages →
  Coordonnées & horaires**.
- Le site est purement informatif : pas de réservation, d’inscription ni de paiement en ligne.
- Le logo est recomposé en police **à titre provisoire** : à remplacer par les fichiers officiels.
- Toute image ou vidéo porte le crédit « © Alliance Française de Kumasi » (`CREDIT`, `src/lib/site.ts`).

## Back-office : sécurité

Mêmes règles que Doxamed : contrôle Cloudflare Turnstile devant `/BO` (actif dès que les deux clés
sont renseignées), comptes sur invitation par e-mail, mot de passe d’au moins 10 caractères avec une
majuscule, un chiffre et un caractère spécial, compte verrouillé 10 minutes après 10 échecs.

## Formulaires

- **Contact** : envoyé par e-mail (Resend) à `CONTACT_EMAIL`, non conservé par le site.
- **Candidature** : envoyée par e-mail avec le CV à `CANDIDATURES_EMAIL` (provisoire — elle sera
  enregistrée dans le BO Offres d’emploi).
- Sans clé Resend, en local, le message s’affiche dans la console du serveur.
- Anti-spam : champ piège et 5 envois au plus par adresse IP toutes les 10 minutes.
