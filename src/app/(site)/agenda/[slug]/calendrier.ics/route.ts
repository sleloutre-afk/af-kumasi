import { NextResponse } from 'next/server'
import { parSlug } from '@/lib/evenements'
import { SITE_URL } from '@/lib/site'

/**
 * « Ajouter à mon agenda » : fichier .ics de l'événement, que le téléphone
 * ouvre dans son application de calendrier (spec : fiche événement).
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = parSlug(slug)
  if (!e) return new NextResponse('Événement introuvable', { status: 404 })

  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  // Sans heure de fin : 2 heures par défaut.
  const fin = e.fin ?? new Date(new Date(e.debut).getTime() + 2 * 3600 * 1000).toISOString()
  // Échappement imposé par le format iCalendar (RFC 5545).
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  const url = `${SITE_URL}/agenda/${e.slug}`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alliance Francaise de Kumasi//Agenda//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@afkumasi`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.debut)}`,
    `DTEND:${stamp(fin)}`,
    `SUMMARY:${esc(e.titre)}`,
    `DESCRIPTION:${esc(`${e.accroche}\n${url}`)}`,
    `LOCATION:${esc(`${e.lieu}, Alliance Française de Kumasi, Kumasi, Ghana`)}`,
    `URL:${url}`,
    ...(e.annule ? ['STATUS:CANCELLED'] : []),
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${e.slug}.ics"`,
    },
  })
}
