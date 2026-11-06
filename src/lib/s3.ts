/**
 * Stockage S3 des fichiers du BO. En production, l'add-on Cellar de Clever Cloud fournit
 * l'hôte et les clés (CELLAR_ADDON_*) ; seul le nom du bucket (S3_BUCKET) est à définir.
 * Les variables S3_* explicites restent prioritaires (autre fournisseur S3).
 */
export const s3 = {
  bucket: process.env.S3_BUCKET || '',
  endpoint:
    process.env.S3_ENDPOINT || (process.env.CELLAR_ADDON_HOST ? `https://${process.env.CELLAR_ADDON_HOST}` : undefined),
  region: process.env.S3_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.CELLAR_ADDON_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.CELLAR_ADDON_KEY_SECRET || '',
  },
}
