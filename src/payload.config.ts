import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { resendEmailAdapter } from './lib/payloadEmailAdapter'
import { Reglages } from './globals/Reglages'
import { s3 } from './lib/s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURI = process.env.DATABASE_URI || ''
// Production : Postgres. Local : SQLite (voir .env.example).
const usePostgres = databaseURI.startsWith('postgres')

export default buildConfig({
  // Back-office : https://<domaine>/BO — doit correspondre au dossier
  // src/app/(payload)/BO.
  routes: { admin: '/BO' },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— AF Kumasi BO',
    },
    components: {
      graphics: {
        Icon: '/src/components/admin/AdminIcon#AdminIcon',
        Logo: '/src/components/admin/AdminLogo#AdminLogo',
      },
      beforeNavLinks: [
        // Lien de retour au tableau de bord, en haut de la nav latérale.
        '/src/components/admin/DashboardLink#DashboardLink',
        // Barre latérale ouverte par défaut (Payload la referme sinon sur tout écran ≤ 1440px).
        '/src/components/admin/DefaultOpenNav#DefaultOpenNav',
      ],
    },
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
    // La même page sert à la première connexion d'un compte invité et au
    // mot de passe oublié : le titre par défaut ne convenait qu'au second cas.
    translations: {
      fr: { authentication: { resetPassword: 'Créez ou réinitialisez votre mot de passe' } },
    },
  },
  // Français par défaut ; l'anglais se saisit à côté, champ par champ (onglet EN
  // du formulaire). Un champ anglais vide affiche le français (repli).
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  // Ordre = ordre des entrées dans la nav latérale.
  collections: [Media, Users],
  globals: [Reglages],
  editor: lexicalEditor(),
  // E-mails du BO (invitation, mot de passe oublié) envoyés via Resend.
  email: resendEmailAdapter,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: databaseURI, max: 3 },
        // Les changements de schéma passent par des migrations versionnées
        // (src/migrations), jamais par le « push » interactif de Payload.
        push: false,
        migrationDir: path.resolve(dirname, 'migrations'),
      })
    : sqliteAdapter({ client: { url: databaseURI } }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3092'].filter(Boolean),
  plugins: [
    // En production, les fichiers uploadés partent sur un bucket S3 ;
    // sans configuration S3 (local), ils restent dans ./media.
    s3Storage({
      enabled: Boolean(s3.bucket),
      collections: { media: true },
      bucket: s3.bucket,
      config: {
        endpoint: s3.endpoint,
        region: s3.region,
        credentials: s3.credentials,
        forcePathStyle: true,
      },
    }),
  ],
})
