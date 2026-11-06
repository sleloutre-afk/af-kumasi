'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CANDIDATURE_SPONTANEE, CV_ACCEPT, validateCandidature, type CandErrors, type CandValues } from '@/lib/candidature'
import { ROUTES } from '@/lib/site'

const SEND_ERROR = 'L’envoi n’a pas abouti. Veuillez réessayer un peu plus tard.'
const RATE_ERROR = 'Trop d’envois ont été faits. Veuillez patienter quelques minutes.'
const ORDER: (keyof CandErrors)[] = ['nom', 'tel', 'email', 'poste', 'cv', 'msg', 'rgpd']

const blank = (): CandValues => ({ nom: '', email: '', tel: '', poste: CANDIDATURE_SPONTANEE, msg: '', rgpd: false })

/**
 * « Envoyez-nous votre candidature » (maquette Nous rejoindre) : nom,
 * téléphone, e-mail, poste visé, CV (PDF, Word ou photo, 5 Mo), quelques mots,
 * consentement (case non cochée par défaut). Mêmes règles que le serveur
 * (src/lib/candidature.ts).
 */
export function CandidatureForm({ postes }: { postes: string[] }) {
  const all = [CANDIDATURE_SPONTANEE, ...postes]
  const [v, setV] = useState<CandValues>(blank)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<CandErrors>({})
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLParagraphElement>(null)

  // « Postuler à cette offre » (JobList) présélectionne le poste.
  useEffect(() => {
    const onPick = (e: Event) => {
      const poste = (e as CustomEvent<string>).detail
      setV((cur) => ({ ...cur, poste }))
      setSent(false)
    }
    window.addEventListener('afk:postuler', onPick)
    return () => window.removeEventListener('afk:postuler', onPick)
  }, [])

  const check = (next: CandValues, f: File | null) => validateCandidature(next, f && { size: f.size, type: f.type }, all)
  const set = <K extends keyof CandValues>(k: K, value: CandValues[K]) => {
    const next = { ...v, [k]: value }
    setV(next)
    if (tried) setErrors(check(next, file))
    setFailure(null)
  }
  const focus = (k?: string) => k && setTimeout(() => (formRef.current?.elements.namedItem(k) as HTMLElement | null)?.focus(), 30)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTried(true)
    const found = check(v, file)
    setErrors(found)
    if (Object.keys(found).length) return focus(ORDER.find((k) => found[k]))
    const fail = (m: string) => {
      setFailure(m)
      setTimeout(() => alertRef.current?.focus(), 30)
    }
    setSending(true)
    try {
      const fd = new FormData(formRef.current!)
      fd.set('rgpd', String(v.rgpd))
      const res = await fetch('/api/candidature', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      const body = await res.json().catch(() => null)
      if (res.ok && body?.ok) {
        setSent(true)
        setTimeout(() => doneRef.current?.focus(), 30)
      } else if (res.status === 422 && body?.errors) {
        setErrors(body.errors)
        focus(ORDER.find((k) => body.errors[k]))
      } else fail(res.status === 429 ? RATE_ERROR : SEND_ERROR)
    } catch {
      fail(SEND_ERROR)
    } finally {
      setSending(false)
    }
  }

  const count = ORDER.filter((k) => errors[k]).length
  const alert = failure ?? (count ? (count > 1 ? `Le formulaire comporte ${count} champs à corriger.` : 'Le formulaire comporte 1 champ à corriger.') : null)
  const err = (k: keyof CandErrors) =>
    errors[k] ? (
      <p className="err err-w" id={`ce-${k}`}>
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof CandErrors, hint?: string) => ({
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': [hint, errors[k] ? `ce-${k}` : undefined].filter(Boolean).join(' ') || undefined,
  })

  if (sent) {
    return (
      <div className="redbg stack g10 form-done" role="status">
        <p className="h3" tabIndex={-1} ref={doneRef}>
          Merci, medaase&nbsp;!
        </p>
        <p className="p">
          <span className="d-only-i">Votre candidature est bien arrivée. Nous revenons vers vous rapidement.</span>
          <span className="m-only-i">Votre candidature est bien arrivée.</span>
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} className="form rj-form" noValidate onSubmit={submit} encType="multipart/form-data">
      <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef} hidden={!alert}>
        {alert}
      </div>
      <div className="grid g14 rj-form-2">
        <div className="field">
          <label htmlFor="c-nom">Nom complet</label>
          <input id="c-nom" name="nom" className="inp" type="text" autoComplete="name" maxLength={200} value={v.nom} onChange={(e) => set('nom', e.target.value)} {...aria('nom')} />
          {err('nom')}
        </div>
        <div className="field">
          <label htmlFor="c-tel">
            <span className="d-only-i">Téléphone</span>
            <span className="m-only-i">Téléphone (WhatsApp)</span>
          </label>
          <input id="c-tel" name="tel" className="inp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+233" value={v.tel} onChange={(e) => set('tel', e.target.value)} {...aria('tel')} />
          {err('tel')}
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" className="inp" type="email" autoComplete="email" maxLength={200} value={v.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
        {err('email')}
      </div>
      <div className="field">
        <label htmlFor="c-poste">Poste visé</label>
        <select id="c-poste" name="poste" className="inp" value={v.poste} onChange={(e) => set('poste', e.target.value)} {...aria('poste')}>
          {all.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {err('poste')}
      </div>
      <div className="field">
        <label htmlFor="c-cv">CV</label>
        <input
          id="c-cv"
          name="cv"
          className="inp"
          type="file"
          accept={CV_ACCEPT}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null
            setFile(f)
            if (tried) setErrors(check(v, f))
          }}
          {...aria('cv', 'ch-cv')}
        />
        <span className="hint hint-w" id="ch-cv">
          PDF, Word ou photo · 5 Mo max.
        </span>
        {err('cv')}
      </div>
      <div className="field">
        <label htmlFor="c-msg">Quelques mots sur vous</label>
        <textarea id="c-msg" name="msg" className="inp" maxLength={5000} value={v.msg} onChange={(e) => set('msg', e.target.value)} {...aria('msg')} />
        {err('msg')}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-site">Site web</label>
        <input id="c-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="consent">
        <div className="consent-row">
          <input className="chk" id="c-rgpd" type="checkbox" checked={v.rgpd} onChange={(e) => set('rgpd', e.target.checked)} {...aria('rgpd')} />
          <label htmlFor="c-rgpd" className="small rj-consent">
            J’accepte que mes données soient utilisées dans le cadre de ce recrutement. Pour en savoir plus et exercer vos droits, consultez notre{' '}
            <Link href={ROUTES.confidentialite}>politique de confidentialité</Link>.
          </label>
        </div>
        {err('rgpd')}
      </div>
      <button className="btn btn-red btn-submit" type="submit" disabled={sending}>
        {sending ? 'Envoi…' : 'Envoyer ma candidature'}
      </button>
    </form>
  )
}
