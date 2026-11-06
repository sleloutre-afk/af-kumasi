import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { SITE_URL } from '@/lib/site'

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Sous une autre adresse que l'adresse officielle, ou sous l'adresse technique
  // *.vercel.app ou *.cleverapps.io (démonstration), rien ne doit être indexé.
  const host = (await headers()).get('host')
  if (host !== new URL(SITE_URL).host || host?.endsWith('.vercel.app') || host?.endsWith('.cleverapps.io')) return { rules: [{ userAgent: '*', disallow: '/' }] }

  return {
    rules: [{ userAgent: '*', disallow: ['/BO', '/api'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
