import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { PageAnchors, PageHero } from '@/components/PageHero'
import { Ph } from '@/components/Ph'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'L’Alliance',
  description: 'Depuis le 16 mai 1956, l’Alliance Française de Kumasi fait de la langue française un pont entre le Ghana et le monde francophone.',
}

// Frise : les étapes entre crochets restent à fournir par l'Alliance (rien d'inventé).
const FRISE: { an: React.ReactNode; titre: string; texte: string; texteCourt: string }[] = [
  {
    an: '1883',
    titre: 'Naissance de l’Alliance Française à Paris',
    texte: 'L’Alliance Française est créée à Paris pour diffuser la langue et les cultures d’expression française dans le monde.',
    texteCourt: 'Pour diffuser la langue et les cultures d’expression française dans le monde.',
  },
  {
    an: '1956',
    titre: 'Fondation de l’Alliance de Kumasi',
    texte: 'Le 16 mai 1956, l’Alliance Française de Kumasi voit le jour au cœur de la région Ashanti.',
    texteCourt: 'Le 16 mai 1956, au cœur de la région Ashanti.',
  },
  {
    an: '[ANNÉE]',
    titre: '[Étape clé à compléter : installation dans les locaux actuels]',
    texte: '[Texte à fournir par l’Alliance.]',
    texteCourt: '[Texte à fournir par l’Alliance.]',
  },
  {
    an: '[ANNÉE]',
    titre: 'Centre d’examens officiel',
    texte: 'L’Alliance accueille les sessions du DELF, du DALF et du TCF à Kumasi. [Année à confirmer.]',
    texteCourt: 'Sessions DELF, DALF et TCF à Kumasi. [Année à confirmer.]',
  },
  {
    an: '2025',
    titre: '864 apprenants',
    texte: '864 apprenants, enfants et adultes, ont suivi nos cours au cours de l’année.',
    texteCourt: 'Enfants et adultes, tous niveaux confondus.',
  },
  {
    an: <i>70 ans</i>,
    titre: '2026 : l’Alliance fête ses 70 ans',
    texte: 'Une année anniversaire placée sous le signe de la fête et de la transmission. [Programme à compléter.]',
    texteCourt: '[Programme anniversaire à compléter.]',
  },
]

const EQUIPE = [
  { lettre: 'D', ton: 'red', poste: 'Directeur·rice', court: 'Directeur·rice' },
  { lettre: 'P', ton: 'gb', poste: 'Coordinateur·rice pédagogique', court: 'Coordination pédagogique' },
  { lettre: 'E', ton: 'fu', poste: 'Responsable des examens', court: 'Examens' },
  { lettre: 'C', ton: 'bo', poste: 'Chargé·e de la culture & de la communication', court: 'Culture & communication' },
  { lettre: 'M', ton: 'an', poste: 'Responsable de la médiathèque', court: 'Médiathèque' },
  { lettre: 'A', ton: 'bk', poste: 'Accueil & administration', court: 'Accueil & administration' },
] as const

const CONSEIL = [
  ['Président·e', 'Président·e', '[Prénom Nom]'],
  ['Vice-président·e', 'Vice-prés.', '[Prénom Nom]'],
  ['Trésorier·ère', 'Trésorier·ère', '[Prénom Nom]'],
  ['Secrétaire', 'Secrétaire', '[Prénom Nom]'],
] as const

export default function AlliancePage() {
  return (
    <PageShell>
      <PageHero
        current="alliance"
        crumb="L’Alliance"
        eyebrow="L’Alliance Française de Kumasi"
        title={
          <>
            70 ans de français <i>à Kumasi</i>
          </>
        }
        titleMaxWidth="12ch"
        lead="Depuis le 16 mai 1956, l’Alliance fait de la langue française un pont entre le Ghana et le monde francophone."
        netDesktop={
          <>
            <path className="ln" d="M40 70L180 150L320 100L460 50M180 150L220 290L110 380M220 290L390 320L540 220M320 100L390 320M540 220L580 100" />
            <rect x="290" y="70" width="64" height="64" fill="rgba(169,0,93,.35)" transform="rotate(-8 322 102)" />
            <circle className="pulse" cx="40" cy="70" r="7" fill="#fff" />
            <circle className="pulse" cx="180" cy="150" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.6s' }} />
            <circle className="pulse" cx="320" cy="100" r="12" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.2s' }} />
            <rect x="453" y="43" width="14" height="14" fill="#1a171b" />
            <circle className="pulse" cx="390" cy="320" r="9" fill="#fff" style={{ animationDelay: '1.8s' }} />
            <rect x="532" y="212" width="16" height="16" fill="#da002e" stroke="#fff" strokeWidth="2" />
            <circle cx="110" cy="380" r="5" fill="#87888a" />
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
      />

      <PageAnchors
        items={[
          { href: '#role', label: 'Notre rôle' },
          { href: '#histoire', label: 'Notre histoire', short: 'Histoire' },
          { href: '#equipe', label: 'Notre équipe', short: 'Équipe' },
          { href: '#partenaires', label: 'Partenaires' },
        ]}
      />

      {/* Rôle */}
      <section id="role" className="wrap sec grid c2 g72" style={{ alignItems: 'start' }}>
        <div className="stack g18">
          <p className="eyebrow">Notre rôle</p>
          <h2 className="h2">
            Une maison de la langue <i>et des cultures</i>
          </h2>
          <p className="lead muted">
            Comme les plus de 800 Alliances Françaises du monde, l’Alliance de Kumasi est une association indépendante, ancrée dans sa ville, qui
            poursuit trois missions.
          </p>
          <Link className="ulink d-only" href={ROUTES.cours}>
            Découvrir nos cours
          </Link>
        </div>
        <div className="steps" style={{ gridTemplateColumns: '1fr' }}>
          <div className="step">
            <h3 className="h3 step-t">Enseigner le français</h3>
            <p className="p muted step-p">
              <span className="d-only-i">À tous les publics, enfants, adolescents et adultes, de A1 à C2, et préparer aux diplômes officiels.</span>
              <span className="m-only-i">À tous les publics, de A1 à C2, et préparer aux diplômes officiels.</span>
            </p>
          </div>
          <div className="step">
            <h3 className="h3 step-t">Faire connaître les cultures francophones</h3>
            <p className="p muted step-p">
              <span className="d-only-i">Cinéma, musique, littérature, arts visuels&nbsp;: une programmation culturelle ouverte à tous les Kumasiens.</span>
              <span className="m-only-i">Cinéma, musique, littérature, arts visuels, ouverts à tous.</span>
            </p>
          </div>
          <div className="step">
            <h3 className="h3 step-t">Favoriser le dialogue des cultures</h3>
            <p className="p muted step-p">
              <span className="d-only-i">Faire se rencontrer artistes, étudiants et publics du Ghana et de l’espace francophone.</span>
              <span className="m-only-i">Faire se rencontrer artistes et publics du Ghana et de l’espace francophone.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Vidéo de présentation (à fournir) */}
      <section className="wrap al-video">
        <Ph
          video
          tone="bo"
          word="Akwaaba"
          play
          cap="Vidéo · Présentation de l’Alliance en 90 secondes (sous-titrée FR / EN)"
          capShort="Vidéo · L’Alliance en 90 s"
          className="al-video-ph"
        />
      </section>

      {/* Histoire */}
      <section id="histoire" className="paper hatch-dark">
        <div className="wrap sec">
          <div className="row between end g28 mb48 al-hist-head">
            <div className="stack g18" style={{ maxWidth: 720 }}>
              <p className="eyebrow">Notre histoire</p>
              <h2 className="h2">
                De 1956 à aujourd’hui, <i>une histoire kumasienne</i>
              </h2>
            </div>
            <Ph tone="gb" cap="Photo d’archive · années 1950–60" className="al-archive" />
          </div>
          <div className="tl">
            {FRISE.map((f, i) => (
              <div key={i} className="tl-i">
                <span className="tl-y">{f.an}</span>
                <div className="stack g6">
                  <h3 className="h4">{f.titre}</h3>
                  <p className="p muted tl-p">
                    <span className="d-only-i">{f.texte}</span>
                    <span className="m-only-i">{f.texteCourt}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe (portraits et noms à fournir par l'Alliance) */}
      <section id="equipe" className="wrap sec">
        <div className="stack g18 mb48" style={{ maxWidth: 760 }}>
          <p className="eyebrow">Notre équipe</p>
          <h2 className="h2">
            Les visages <i>de l’Alliance</i>
          </h2>
          <p className="lead muted d-only">
            Une équipe de professeurs diplômés et de passionnés de culture, au service de nos apprenants et de nos publics.
          </p>
        </div>
        <div className="grid al-team">
          {EQUIPE.map((m) => (
            <div key={m.lettre} className="stack g10 al-member">
              <Ph tone={m.ton} word={m.lettre} wordCenter cap="Portrait" style={{ aspectRatio: '4 / 5' }} />
              <h3 className="h4">[Prénom Nom]</h3>
              <p className="p small muted">
                <span className="d-only-i">{m.poste}</span>
                <span className="m-only-i">{m.court}</span>
              </p>
            </div>
          ))}
        </div>
        <Ph tone="gb" word="Professeurs" wordSize={160} cap="Photo de groupe · l’équipe pédagogique" className="mt48 d-only" style={{ minHeight: 300 }} />

        {/* Conseil d'administration : côte à côte sur grand écran, accordéon sur mobile. */}
        <div className="grid c2 g48 d-only" style={{ marginTop: 96 }}>
          <div className="stack g18">
            <p className="eyebrow">Gouvernance</p>
            <h2 className="h3" style={{ fontSize: 38 }}>
              Le conseil d’administration
            </h2>
            <p className="p muted">
              Composé de bénévoles élus par l’assemblée générale des membres, le conseil d’administration définit les orientations de l’Alliance.
            </p>
          </div>
          <dl className="facts">
            {CONSEIL.map(([role, , nom]) => (
              <div key={role} className="fact">
                <dt>{role}</dt>
                <dd>{nom}</dd>
              </div>
            ))}
            <div className="fact">
              <dt>Membres</dt>
              <dd>[Prénom Nom], [Prénom Nom], [Prénom Nom]</dd>
            </div>
          </dl>
        </div>
        <details className="acc m-only" style={{ marginTop: 24, borderTop: '2px solid #1a171b' }}>
          <summary>Le conseil d’administration</summary>
          <div className="acc-b">
            <p className="p small">Bénévoles élus par l’assemblée générale des membres.</p>
            <dl className="facts" style={{ borderTop: 0 }}>
              {CONSEIL.map(([, court, nom]) => (
                <div key={court} className="fact" style={{ gridTemplateColumns: '110px minmax(0, 1fr)' }}>
                  <dt>{court}</dt>
                  <dd>{nom}</dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
      </section>

      {/* Partenaires (logos à fournir) */}
      <section id="partenaires" className="paper">
        <div className="wrap sec-s">
          <div className="row between end g28 mb48 al-part-head">
            <div className="stack g18">
              <p className="eyebrow">Partenaires &amp; mécènes</p>
              <h2 className="h2">
                Ils nous <i>soutiennent</i>
              </h2>
            </div>
            <Link className="ulink d-only" href={ROUTES.contact}>
              Devenir partenaire
            </Link>
          </div>
          <div className="grid al-logos">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={i >= 4 ? 'al-logo d-only' : 'al-logo'}>
                Logo partenaire
              </div>
            ))}
          </div>
          <Link className="ulink m-only" href={ROUTES.contact} style={{ marginTop: 18 }}>
            Devenir partenaire
          </Link>
        </div>
      </section>

      {/* Appel à venir */}
      <section className="redbg">
        <div className="wrap sec-s row between g28 cta-band">
          <h2 className="h2" style={{ maxWidth: '16ch' }}>
            Venez nous rencontrer, <i>akwaaba&nbsp;!</i>
          </h2>
          <div className="row g14 cta-band-btns">
            <Link className="btn btn-white arr" href={ROUTES.contact}>
              Nous trouver
            </Link>
            <Link className="btn btn-linew d-only" href={ROUTES.cours}>
              Voir les cours
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
