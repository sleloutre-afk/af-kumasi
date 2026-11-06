import { NextResponse, type NextRequest } from 'next/server'
import { CANDIDATURE_SPONTANEE, validateCandidature } from '@/lib/candidature'
import { sendCandidature } from '@/lib/email'
import { limited } from '@/lib/formEndpoint'
import { offresEnCours } from '@/lib/offres'

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** Formulaire « Envoyez-nous votre candidature » (page Nous rejoindre). */
export async function POST(request: NextRequest) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false, error: 'invalid' }, 400)
  }
  const str = (k: string) => String(form.get(k) ?? '').trim()

  // Champ piège : rempli uniquement par les robots. On répond comme si l'envoi avait abouti.
  if (str('site')) return json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limited(ip)) return json({ ok: false, error: 'rate' }, 429)

  const cvField = form.get('cv')
  const cv = cvField instanceof File && cvField.size > 0 ? cvField : null
  const values = { nom: str('nom'), email: str('email'), tel: str('tel'), poste: str('poste'), msg: str('msg'), rgpd: ['true', 'on'].includes(str('rgpd')) }
  const postes = [CANDIDATURE_SPONTANEE, ...offresEnCours().map((o) => o.intitule)]
  const errors = validateCandidature(values, cv && { size: cv.size, type: cv.type }, postes)
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422)

  const result = await sendCandidature(
    { nom: values.nom, email: values.email, tel: values.tel || undefined, poste: values.poste, msg: values.msg || undefined },
    { filename: cv!.name || 'cv', content: Buffer.from(await cv!.arrayBuffer()) },
  )
  if (!result.ok) {
    console.error('[api/candidature] échec envoi email:', result.error)
    return json({ ok: false, error: 'send' }, 502)
  }
  return json({ ok: true })
}
