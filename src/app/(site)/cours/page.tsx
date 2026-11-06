import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseFinder } from '@/components/CourseFinder'
import { external } from '@/components/Footer'
import { PageShell } from '@/components/PageShell'
import { PageAnchors, PageHero } from '@/components/PageHero'
import { Ph } from '@/components/Ph'
import { getCoordonnees } from '@/lib/reglages'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cours de français',
  description: 'Enfants, adolescents, adultes, professionnels : des cours de français de A1 à C2, en groupe, en individuel ou en ligne, à Kumasi.',
}

const ADULTES = [
  ['Cours collectifs', 'Tous niveaux, de A1 à C2.'],
  ['Ateliers de conversation', 'Gagner en aisance à l’oral, sur des sujets du quotidien.'],
  ['Préparation aux examens', 'DELF, DALF, TCF : méthode, entraînement et examens blancs.'],
  ['Cours en ligne', 'Les mêmes professeurs, où que vous soyez.'],
] as const

const JEUNESSE = [
  ['Petits', 'Éveil à la langue par le jeu et la musique.', 'Éveil par le jeu et la musique.'],
  ['Enfants', 'Lire, écrire et parler, pas à pas.', 'Lire, écrire et parler, pas à pas.'],
  ['Ados', 'Communiquer, débattre, viser un diplôme.', 'Communiquer, débattre, viser un diplôme.'],
] as const

const NIVEAUX = [
  ['A1', 'Découverte', 'Se présenter, poser des questions simples.', 'Se présenter, poser des questions simples.'],
  ['A2', 'Survie', 'Échanger lors de situations simples et habituelles.', 'Échanger dans des situations simples.'],
  ['B1', 'Seuil', 'Se débrouiller en voyage, raconter un événement.', 'Se débrouiller en voyage.'],
  ['B2', 'Avancé', 'Argumenter, comprendre des textes complexes.', 'Argumenter, comprendre des textes complexes.'],
  ['C1', 'Autonome', 'S’exprimer de façon fluide et structurée.', 'S’exprimer de façon fluide.'],
  ['C2', 'Maîtrise', 'Tout comprendre et nuancer finement.', 'Tout comprendre et nuancer.'],
] as const

// Calendrier : dates à fournir par l'Alliance (marqueurs conservés).
const SESSIONS = [
  ['Session 1 · 2027', 'Collectifs, jeunesse, en ligne', 'Ouverte'],
  ['Session 2 · 2027', 'Collectifs, jeunesse, en ligne', 'Bientôt'],
  ['Session 3 · 2027', 'Collectifs, intensifs', 'Bientôt'],
] as const

const FAQ = [
  [
    'Je ne connais pas mon niveau, comment faire ?',
    'Je ne connais pas mon niveau',
    'Passez notre test de positionnement : il permet de vous orienter vers le groupe adapté. [Modalités à confirmer.]',
  ],
  ['Faut-il être membre pour suivre un cours ?', 'Faut-il être membre ?', '[À confirmer par l’Alliance.] L’adhésion donne accès à des tarifs réduits et à la médiathèque.'],
  ['Les cours ont-ils lieu en ligne ?', 'Les cours ont-ils lieu en ligne ?', 'Oui, une partie de nos cours est proposée en ligne. [Liste à confirmer.]'],
  ['À partir de quel âge mon enfant peut-il commencer ?', 'À partir de quel âge ?', 'Dès [ÂGE] ans, dans des groupes adaptés à chaque tranche d’âge.'],
  ['Quels moyens de paiement acceptez-vous ?', 'Moyens de paiement', '[À compléter : espèces, carte, Mobile Money…]'],
] as const

export default async function CoursPage() {
  const c = await getCoordonnees()
  return (
    <PageShell>
      <PageHero
        current="cours"
        tone="gb"
        crumb="Cours de français"
        crumbShort="Cours"
        eyebrow="Cours de français"
        title={
          <>
            Apprendre le français, <i>à votre rythme</i>
          </>
        }
        titleMaxWidth="13ch"
        lead={
          <>
            <span className="d-only-i">Enfants, adolescents, adultes, professionnels&nbsp;: des cours de A1 à C2, en groupe, en individuel ou en ligne.</span>
            <span className="m-only-i">De A1 à C2, en groupe, en individuel ou en ligne.</span>
          </>
        }
        netDesktop={
          <>
            <path className="ln" d="M40 70L180 150L320 100L460 50M180 150L220 290L110 380M220 290L390 320L540 220M320 100L390 320M540 220L580 100" />
            <rect x="290" y="70" width="64" height="64" fill="rgba(218,0,46,.35)" transform="rotate(-8 322 102)" />
            <circle className="pulse" cx="40" cy="70" r="7" fill="#fff" />
            <circle className="pulse" cx="180" cy="150" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.6s' }} />
            <circle className="pulse" cx="320" cy="100" r="12" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.2s' }} />
            <rect x="453" y="43" width="14" height="14" fill="#1a171b" />
            <circle className="pulse" cx="390" cy="320" r="9" fill="#fff" style={{ animationDelay: '1.8s' }} />
            <rect x="532" y="212" width="16" height="16" fill="#da002e" stroke="#fff" strokeWidth="2" />
            <circle cx="580" cy="100" r="6" fill="#1a171b" />
          </>
        }
        netMobile={
          <>
            <path className="ln" d="M240 60L380 150L540 90M380 150L340 300L500 360M340 300L200 340" />
            <circle className="pulse" cx="240" cy="60" r="8" fill="#fff" />
            <circle className="pulse" cx="380" cy="150" r="13" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.8s' }} />
            <rect x="532" y="82" width="16" height="16" fill="#1a171b" />
            <circle className="pulse" cx="340" cy="300" r="11" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.6s' }} />
            <circle cx="500" cy="360" r="6" fill="#fff" />
          </>
        }
      >
        <a className="btn btn-red m-only rise d2s" href="#trouver" style={{ alignSelf: 'flex-start' }}>
          Trouver mon cours
        </a>
      </PageHero>

      <PageAnchors
        items={[
          { href: '#trouver', label: 'Trouver mon cours', desktopOnly: true },
          { href: '#adultes', label: 'Adultes' },
          { href: '#jeunesse', label: 'Enfants & ados' },
          { href: '#surmesure', label: 'Particuliers & entreprises', short: 'Sur mesure' },
          { href: '#niveaux', label: 'Niveaux', desktopOnly: true },
          { href: '#calendrier', label: 'Calendrier' },
        ]}
      />

      {/* Trouver mon cours */}
      <section id="trouver" className="wrap sec">
        <CourseFinder />
      </section>

      {/* Adultes */}
      <section id="adultes" className="wrap co-sec-adultes">
        <div className="grid c2 g72" style={{ alignItems: 'center' }}>
          <Ph
            tone="red"
            word="Aa"
            cap="Photo · Adultes en cours collectif, échanges en binôme"
            capShort="Photo · Adultes en cours"
            className="cp-adultes-ph"
          />
          <div className="stack g18">
            <p className="eyebrow">Adultes</p>
            <h2 className="h2">
              Parler, comprendre, <i>oser</i>
            </h2>
            <p className="p muted cp-txt">
              <span className="d-only-i">
                Pour voyager, étudier à l’étranger, évoluer professionnellement ou pour le plaisir&nbsp;: nos professeurs vous accompagnent de vos
                premiers mots jusqu’à la maîtrise de la langue.
              </span>
              <span className="m-only-i">Pour voyager, étudier, évoluer professionnellement ou pour le plaisir, de vos premiers mots à la maîtrise de la langue.</span>
            </p>
            {/* Grand écran : tuiles. Mobile : accordéons. */}
            <div className="grid d-only cp-tiles">
              {ADULTES.map(([t, d]) => (
                <div key={t} className="tile" style={{ border: '1px solid #e4e1e0' }}>
                  <h3 className="h4">{t}</h3>
                  <p className="p small muted">{d}</p>
                  <p className="p xs up red">[Durée] · [Tarif] GHS</p>
                </div>
              ))}
            </div>
            <div className="m-only" style={{ borderTop: '2px solid #1a171b' }}>
              {ADULTES.map(([t, d]) => (
                <details key={t} className="acc">
                  <summary>{t}</summary>
                  <div className="acc-b">
                    <p className="p">{d}</p>
                    <p className="p xs up red">[Durée] · [Tarif] GHS</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enfants & ados */}
      <section id="jeunesse" className="paper hatch-dark">
        <div className="wrap sec">
          <div className="grid c2 g72 cp-jeu" style={{ alignItems: 'center' }}>
            <div className="stack g18 cp-jeu-txt">
              <p className="eyebrow">Enfants &amp; adolescents</p>
              <h2 className="h2">
                Le français, <i>en jouant</i>
              </h2>
              <Ph tone="fu" word="abc" cap="Photo · Enfants en atelier" className="m-only cp-jeu-mph" />
              <p className="p muted cp-txt">
                <span className="d-only-i">
                  Chansons, contes, jeux, projets créatifs&nbsp;: nos cours jeunesse donnent envie d’apprendre, à chaque âge. Les plus motivés peuvent
                  préparer le DELF Prim ou le DELF Junior.
                </span>
                <span className="m-only-i">Chansons, contes, jeux, projets créatifs. Les plus motivés préparent le DELF Prim ou le DELF Junior.</span>
              </p>
              <div className="cp-age rail snap">
                {JEUNESSE.map(([t, d, dc]) => (
                  <div key={t} className="tile">
                    <span className="badge">[X–X ans]</span>
                    <h3 className="h4">{t}</h3>
                    <p className="p small muted">
                      <span className="d-only-i">{d}</span>
                      <span className="m-only-i">{dc}</span>
                    </p>
                  </div>
                ))}
              </div>
              <Link className="ulink" href={ROUTES.contact}>
                Nous contacter
              </Link>
            </div>
            <div className="cp-jeu-collage d-only" aria-hidden="true">
              <Ph tone="fu" word="abc" wordSize={160} cap="Photo · Enfants en atelier" className="cp-j1" />
              <Ph tone="red" cap="Photo · Ados en débat" className="cp-j2" />
            </div>
          </div>
        </div>
      </section>

      {/* Sur mesure */}
      <section id="surmesure" className="wrap sec">
        <div className="stack g18 mb48" style={{ maxWidth: 760 }}>
          <p className="eyebrow">Particuliers &amp; entreprises</p>
          <h2 className="h2">
            Des formations <i>taillées pour vous</i>
          </h2>
        </div>
        <div className="grid c2 cp-sm">
          <Link className="card lift" href={ROUTES.contact}>
            <Ph tone="gb" word="1:1" cap="Photo · Cours particulier" className="cp-sm-ph" />
            <div className="card-b">
              <h3 className="h3">Cours particuliers</h3>
              <p className="p muted">
                <span className="d-only-i">Un programme construit autour de vos objectifs et de votre agenda, en présentiel à l’Alliance ou en ligne.</span>
                <span className="m-only-i">En présentiel ou en ligne, autour de vos objectifs.</span>
              </p>
              <span className="ulink">Nous contacter</span>
            </div>
          </Link>
          <Link className="card lift" href={ROUTES.contact}>
            <Ph tone="bk" word="Pro" cap="Photo · Formation en entreprise" capShort="Photo · En entreprise" className="cp-sm-ph" />
            <div className="card-b">
              <h3 className="h3">Entreprises &amp; institutions</h3>
              <p className="p muted">
                <span className="d-only-i">Français professionnel pour vos équipes, dans vos locaux ou les nôtres, avec bilan de niveau et suivi des progrès.</span>
                <span className="m-only-i">Français professionnel pour vos équipes, avec suivi.</span>
              </p>
              <span className="ulink">Demander un devis</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Niveaux */}
      <section id="niveaux" className="dark">
        <div className="kente" />
        <div className="wrap sec">
          <div className="stack g18 mb48" style={{ maxWidth: 760 }}>
            <p className="eyebrow pk">Les niveaux</p>
            <h2 className="h2">
              Six marches <i>vers la maîtrise</i>
            </h2>
            <p className="p soft cp-txt">
              <span className="d-only-i">Nos cours suivent le Cadre européen commun de référence pour les langues (CECRL), la référence internationale.</span>
              <span className="m-only-i">Selon le Cadre européen commun de référence (CECRL).</span>
            </p>
          </div>
          <div className="grid c6 cp-lvls rail snap">
            {NIVEAUX.map(([code, nom, d, dc], i) => (
              <div key={code} className={`lvl l${i + 1}`}>
                <span className="serif cp-lvl-c">{code}</span>
                <b>{nom}</b>
                <span className="small">
                  <span className="d-only-i">{d}</span>
                  <span className="m-only-i">{dc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendrier (informatif : pas d'inscription en ligne) */}
      <section id="calendrier" className="wrap sec">
        <div className="split">
          <div className="main stack g28">
            <div className="stack g18">
              <p className="eyebrow">Calendrier</p>
              <h2 className="h2">
                Prochaines <i>sessions</i>
              </h2>
            </div>
            <div className="tblbox d-only">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Session</th>
                    <th>Dates</th>
                    <th>Inscriptions jusqu’au</th>
                    <th>Formats</th>
                  </tr>
                </thead>
                <tbody>
                  {SESSIONS.map(([s, f]) => (
                    <tr key={s}>
                      <td>{s}</td>
                      <td>[DATES]</td>
                      <td>[DATE]</td>
                      <td>{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="stack m-only" style={{ borderTop: '2px solid #1a171b' }}>
              {SESSIONS.map(([s, , etat]) => (
                <div key={s} className="fact" style={{ gridTemplateColumns: '1fr auto' }}>
                  <div className="stack g6">
                    <span className="h4">{s}</span>
                    <span className="small muted">[DATES] · inscriptions jusqu’au [DATE]</span>
                  </div>
                  <span className={etat === 'Ouverte' ? 'badge' : 'badge dk'}>{etat}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="aside paper cp-aside">
            <h3 className="h3">Besoin d’un conseil&nbsp;?</h3>
            <p className="p muted d-only">Notre équipe vous aide à choisir le cours qui vous convient.</p>
            <Link className="btn btn-red btn-block" href={ROUTES.contact}>
              Nous écrire
            </Link>
            <a className="btn btn-line btn-block" href={c.waHref ?? ROUTES.contact} {...external(c.waHref)}>
              WhatsApp&nbsp;: {c.whatsapp}
            </a>
            <p className="p small muted d-only">Accueil&nbsp;: {c.horairesResume === '[À COMPLÉTER]' ? '[HORAIRES À COMPLÉTER]' : c.horairesResume}</p>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="paper">
        <div className="wrap sec grid c2 g72" style={{ alignItems: 'start' }}>
          <div className="stack g18">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="h2">
              Vous vous <i>demandez…</i>
            </h2>
          </div>
          <div style={{ borderTop: '2px solid #1a171b' }}>
            {FAQ.map(([q, qc, r], i) => (
              <details key={q} className="acc" open={i === 0 ? true : undefined}>
                <summary>
                  <span className="d-only-i">{q}</span>
                  <span className="m-only-i">{qc}</span>
                </summary>
                <div className="acc-b">
                  <p className="p">{r}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
