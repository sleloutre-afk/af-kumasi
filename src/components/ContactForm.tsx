'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { fields, SUJETS, validators, type Errors, type Values } from '@/lib/forms'
import { ROUTES } from '@/lib/site'

const SEND_ERROR = 'L’envoi n’a pas abouti. Veuillez réessayer un peu plus tard, ou nous écrire sur WhatsApp.'
const RATE_ERROR = 'Trop de messages ont été envoyés. Veuillez patienter quelques minutes avant un nouvel envoi.'
const countError = (n: number) => (n > 1 ? `Le formulaire comporte ${n} champs à corriger.` : 'Le formulaire comporte 1 champ à corriger.')

const KEYS = fields.contact
const validate = validators.contact
const blank = (sujet = ''): Values => ({ ...Object.fromEntries(KEYS.map((k) => [k, k === 'rgpd' ? false : ''])), sujet })

/**
 * Formulaire de la page Contact (maquette « Écrivez-nous ») : choix du sujet,
 * nom, téléphone WhatsApp, e-mail, message. Validation dans le navigateur
 * (mêmes règles que le serveur, src/lib/forms.ts), champ piège anti-spam, envoi
 * à /api/contact, puis message de confirmation « Medaase ». Le message part par
 * e-mail à l'Alliance ; il n'est pas conservé par le site.
 */
export function ContactForm({ delaiReponse, initialSujet = '' }: { delaiReponse: string; initialSujet?: string }) {
  const [values, setValues] = useState<Values>(() => blank(initialSujet))
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLParagraphElement>(null)

  const focusField = (key: string | undefined) => {
    if (key) setTimeout(() => (formRef.current?.elements.namedItem(key) as HTMLElement | null)?.focus(), 30)
  }

  const setField = (key: string, value: string | boolean) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (tried) setErrors(validate(next))
    setFailure(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTried(true)
    setFailure(null)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return focusField(KEYS.find((k) => found[k]))

    const fail = (message: string) => {
      setFailure(message)
      setTimeout(() => alertRef.current?.focus(), 30)
    }
    setSending(true)
    try {
      const site = (formRef.current?.elements.namedItem('site') as HTMLInputElement | null)?.value ?? ''
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, site }),
      })
      const body = await res.json().catch(() => null)
      if (res.ok && body?.ok) {
        setSent(true)
        setTimeout(() => doneRef.current?.focus(), 30)
      } else if (res.status === 422 && body?.errors) {
        setErrors(body.errors)
        focusField(KEYS.find((k) => body.errors[k]) ?? KEYS[0])
      } else {
        fail(res.status === 429 ? RATE_ERROR : SEND_ERROR)
      }
    } catch {
      fail(SEND_ERROR)
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setValues(blank())
    setErrors({})
    setTried(false)
    setFailure(null)
    setSent(false)
    focusField('nom')
  }

  const errorCount = KEYS.filter((k) => errors[k]).length
  const alert = failure ?? (errorCount ? countError(errorCount) : null)

  const describedBy = (name: string, hint?: boolean) =>
    [hint ? `kh-${name}` : undefined, errors[name] ? `ke-${name}` : undefined].filter(Boolean).join(' ') || undefined

  const input = (name: string, type: 'text' | 'tel' | 'email', autoComplete: string, extra?: { placeholder?: string; inputMode?: 'tel' }) => (
    <input
      id={`k-${name}`}
      name={name}
      className="inp"
      type={type}
      autoComplete={autoComplete}
      maxLength={200}
      value={String(values[name] ?? '')}
      onChange={(e) => setField(name, e.target.value)}
      aria-invalid={Boolean(errors[name])}
      aria-describedby={describedBy(name, name === 'tel' || name === 'email')}
      {...extra}
    />
  )

  const err = (name: string) =>
    errors[name] ? (
      <p className="err" id={`ke-${name}`}>
        {errors[name]}
      </p>
    ) : null

  if (sent) {
    return (
      <div className="redbg stack g10 form-done" role="status">
        <p className="h3" tabIndex={-1} ref={doneRef}>
          Medaase, message reçu&nbsp;!
        </p>
        <p className="p">Nous vous répondons sous {delaiReponse}, par e-mail ou WhatsApp.</p>
        <button type="button" className="btn btn-linew" onClick={reset} style={{ alignSelf: 'flex-start' }}>
          Nouveau message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className="form" action="/api/contact" method="post" noValidate onSubmit={handleSubmit}>
      <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef} hidden={!alert}>
        {alert}
      </div>

      <fieldset className="stack g10 plain">
        <legend className="lbl-b">Votre demande concerne</legend>
        <div className="row g10 chips-sujet">
          {SUJETS.map((s) => {
            const on = values.sujet === s
            return (
              <label key={s} className={on ? 'chip dk on' : 'chip dk'}>
                <input
                  type="radio"
                  name="sujet"
                  value={s}
                  checked={on}
                  onChange={() => setField('sujet', s)}
                  className="sr-only"
                />
                {s}
              </label>
            )
          })}
        </div>
        {err('sujet')}
      </fieldset>

      <div className="grid g14 c-260">
        <div className="field">
          <label htmlFor="k-nom">Nom complet</label>
          {input('nom', 'text', 'name')}
          {err('nom')}
        </div>
        <div className="field">
          <label htmlFor="k-tel">Téléphone (WhatsApp)</label>
          {input('tel', 'tel', 'tel', { placeholder: '+233', inputMode: 'tel' })}
          <p className="hint" id="kh-tel">
            Téléphone ou e-mail&nbsp;: au moins l’un des deux.
          </p>
          {err('tel')}
        </div>
      </div>
      <div className="field">
        <label htmlFor="k-email">E-mail</label>
        {input('email', 'email', 'email')}
        <p className="hint" id="kh-email">
          Facultatif si vous avez indiqué un téléphone.
        </p>
        {err('email')}
      </div>
      <div className="field">
        <label htmlFor="k-msg">Votre message</label>
        <textarea
          id="k-msg"
          name="msg"
          className="inp"
          maxLength={5000}
          value={String(values.msg ?? '')}
          onChange={(e) => setField('msg', e.target.value)}
          aria-invalid={Boolean(errors.msg)}
          aria-describedby={describedBy('msg')}
        />
        {err('msg')}
      </div>

      {/* Champ piège anti-spam : hors écran, ignoré par les visiteurs. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="k-site">Site web</label>
        <input id="k-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="consent">
        <div className="consent-row">
          <input
            className="chk"
            id="k-rgpd"
            name="rgpd"
            type="checkbox"
            checked={values.rgpd === true}
            onChange={(e) => setField('rgpd', e.target.checked)}
            aria-invalid={Boolean(errors.rgpd)}
            aria-describedby={errors.rgpd ? 'ke-rgpd' : undefined}
          />
          <label htmlFor="k-rgpd" className="small">
            J’accepte que ces informations soient utilisées par l’Alliance Française de Kumasi pour répondre à ma demande. Pour en savoir plus et
            exercer vos droits, consultez notre <Link href={ROUTES.confidentialite}>politique de confidentialité</Link>.
          </label>
        </div>
        {err('rgpd')}
      </div>

      <button className="btn btn-red btn-submit" type="submit" disabled={sending}>
        {sending ? 'Envoi…' : 'Envoyer'}
      </button>
    </form>
  )
}
