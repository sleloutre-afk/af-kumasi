import type { Metadata } from 'next'
import Link from 'next/link'
import { external } from '@/components/Footer'
import { PageShell } from '@/components/PageShell'
import { PageHero } from '@/components/PageHero'
import { Ph } from '@/components/Ph'
import { getCoordonnees } from '@/lib/reglages'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Examens DELF, DALF, TCF, médiathèque, traduction, adhésion : les services de l’Alliance Française de Kumasi.',
}

// Diplômes et tests : dates de session à fournir par l'Alliance.
const EXAMENS = [
  ['DELF Prim', 'Enfants scolarisés en primaire', 'A1.1 · A1 · A2', 'Enfants scolarisés en primaire · A1.1, A1, A2'],
  ['DELF Junior', 'Adolescents', 'A1 à B2', 'Adolescents · A1 à B2'],
  ['DELF tout public', 'Adultes', 'A1 à B2', 'Adultes · A1 à B2'],
  ['DALF', 'Adultes, niveau avancé', 'C1 · C2', 'Adultes, niveau avancé · C1, C2'],
  ['TCF', 'Tout public : études, immigration, emploi', 'Résultat de A1 à C2', 'Études, immigration, emploi · résultat de A1 à C2'],
  ['DFP', 'Professionnels (français des affaires, du tourisme…)', 'A1 à C1', 'Français professionnel · A1 à C1'],
  ['DAEFLE', 'Futurs enseignants de FLE', 'Formation diplômante', 'Pour les futurs enseignants de FLE.'],
] as const

// Déroulé d'un examen (l'étape « Inscription » des maquettes est retirée : site informatif).
const ETAPES_EXAMEN = [
  ['Convocation', 'Date, heure et salle envoyées par email et WhatsApp.'],
  ['Épreuves', 'Compréhension et production, à l’écrit et à l’oral.'],
  ['Résultats', 'Attestation, puis diplôme officiel. [Délais à confirmer.]'],
] as const

const AVANTAGES = [
  ['Apprendre', 'Tarifs réduits sur les cours et les certifications, accompagnement personnalisé.', 'tarifs réduits sur cours et certifications'],
  ['Sortir', 'Invitations aux événements, entrées réduites ou gratuites, soirées réservées.', 'invitations et entrées réduites'],
  ['Lire', 'Emprunts à la médiathèque et accès à Culturethèque.', 'médiathèque et Culturethèque'],
  ['S’ouvrir au monde', 'Un réseau de plus de 800 Alliances, des bourses, des stages et des échanges.', 'réseau de 800+ Alliances, bourses, échanges'],
  ['Rencontrer', 'Ateliers, rencontres d’artistes, une communauté francophile à Kumasi.', 'ateliers et artistes'],
  ['Grandir', 'Compétences linguistiques et réseau, pour vos projets personnels et professionnels.', 'compétences et réseau'],
] as const

export default async function ServicesPage() {
  const c = await getCoordonnees()
  return (
    <PageShell>
      <PageHero
        current="services"
        crumb="Services"
        eyebrow="Services"
        title={
          <>
            Bien plus <i>qu’une école de langue</i>
          </>
        }
        titleMaxWidth="14ch"
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
        overlapBelow
      />

      {/* Raccourcis vers les quatre services (chevauchent le visuel sur grand écran). */}
      <div className="wrap sv-quick">
        <div className="grid sv-quick-g">
          <Link className="tile lift sv-q" href="#examens">
            <ExamIcon />
            <h2 className="h4 sv-q-t">
              <span className="d-only-i">Examens &amp; certifications</span>
              <span className="m-only-i">Examens</span>
            </h2>
            <span className="tlink d-only">Voir</span>
          </Link>
          <Link className="tile lift sv-q" href="#mediatheque">
            <BookIcon />
            <h2 className="h4 sv-q-t">Médiathèque</h2>
            <span className="tlink d-only">Voir</span>
          </Link>
          <Link className="tile lift sv-q" href="#traduction">
            <TranslateIcon />
            <h2 className="h4 sv-q-t">Traduction</h2>
            <span className="tlink d-only">Voir</span>
          </Link>
          <Link className="tile lift redbg sv-q sv-q-red" href="#adhesion">
            <span className="serif sv-q-af" aria-hidden="true">
              a<i>f</i>
            </span>
            <h2 className="h4 sv-q-t">Devenir membre</h2>
            <span className="tlink d-only" style={{ color: '#fff' }}>
              Voir
            </span>
          </Link>
        </div>
      </div>

      {/* Examens */}
      <section id="examens" className="wrap sec">
        <div className="grid c2 g72 mb48 sv-ex-head" style={{ alignItems: 'end' }}>
          <div className="stack g18">
            <p className="eyebrow">Examens &amp; certifications</p>
            <h2 className="h2">
              Des diplômes{' '}
              <i>
                <span className="d-only-i">reconnus dans le monde entier</span>
                <span className="m-only-i">reconnus partout</span>
              </i>
            </h2>
          </div>
          <p className="p muted cp-txt">
            <span className="d-only-i">L’Alliance de Kumasi organise les sessions des diplômes et tests officiels de français. </span>
            Le DELF et le DALF, délivrés par le ministère français de l’Éducation nationale, sont valables à vie.
          </p>
        </div>
        <div className="tblbox d-only">
          <table className="tbl">
            <thead>
              <tr>
                <th>Diplôme / test</th>
                <th>Pour qui</th>
                <th>Niveaux</th>
                <th>Prochaine session</th>
              </tr>
            </thead>
            <tbody>
              {EXAMENS.map(([nom, qui, niv]) => (
                <tr key={nom}>
                  <td>{nom}</td>
                  <td>{qui}</td>
                  <td>{niv}</td>
                  <td>[DATE]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-only" style={{ borderTop: '2px solid #1a171b' }}>
          {EXAMENS.map(([nom, , , court]) => (
            <details key={nom} className="acc">
              <summary>{nom}</summary>
              <div className="acc-b">
                <p className="p">{court}</p>
                {nom !== 'DAEFLE' && <p className="p xs up red">Prochaine session&nbsp;: [DATE]</p>}
              </div>
            </details>
          ))}
        </div>
        <div className="steps mt48 sv-ex-steps">
          {ETAPES_EXAMEN.map(([t, d]) => (
            <div key={t} className="step">
              <h3 className="h4">{t}</h3>
              <p className="p small muted d-only">{d}</p>
            </div>
          ))}
        </div>
        <div className="row g14 mt48 sv-ex-btns">
          <Link className="btn btn-red arr" href={`${ROUTES.contact}?sujet=Examens`}>
            Nous contacter
          </Link>
          <Link className="btn btn-line d-only" href={`${ROUTES.cours}#adultes`}>
            Préparer l’examen
          </Link>
        </div>
      </section>

      {/* Médiathèque */}
      <section id="mediatheque" className="paper hatch-dark">
        <div className="wrap sec grid c2 g72" style={{ alignItems: 'center' }}>
          <div className="sv-med-collage d-only" aria-hidden="true">
            <Ph tone="gb" word="Livres" wordSize={160} cap="Photo · Rayonnages de la médiathèque" className="sv-m1" />
            <Ph tone="fu" cap="Photo · Espace jeunesse" className="sv-m2" />
          </div>
          <div className="stack g18">
            <p className="eyebrow">Médiathèque</p>
            <h2 className="h2">
              Lire, regarder, <i>écouter en français</i>
            </h2>
            <Ph tone="gb" word="Livres" wordSize={100} cap="Photo · La médiathèque" className="m-only" style={{ height: 220 }} />
            <p className="p muted cp-txt d-only">Un lieu calme pour étudier et des collections pour tous les âges, en accès libre sur place.</p>
            <div className="grid sv-med-g">
              <div className="rule">
                <h3 className="h4">Emprunter</h3>
                <p className="p small muted">Livres, films, magazines et BD, pour les membres.</p>
              </div>
              <div className="rule k">
                <h3 className="h4">Étudier</h3>
                <p className="p small muted">Un espace de travail calme, ouvert à tous.</p>
              </div>
              <div className="rule g">
                <h3 className="h4">Culturethèque</h3>
                <p className="p small muted">La bibliothèque numérique de l’Institut français, gratuite pour nos membres.</p>
              </div>
              <div className="rule">
                <h3 className="h4">Horaires</h3>
                <p className="p small muted">{c.horairesMediatheque === '[HORAIRES]' ? '[À COMPLÉTER]' : c.horairesMediatheque}</p>
              </div>
            </div>
            <a className="ulink d-only" href="#adhesion">
              Devenir membre pour emprunter
            </a>
          </div>
        </div>
      </section>

      {/* Traduction : la demande de devis passe par le formulaire de contact (sujet « Traduction »). */}
      <section id="traduction" className="gbbg">
        <div className="wrap sec grid c2 g72" style={{ alignItems: 'start' }}>
          <div className="stack g18">
            <p className="eyebrow w">Traduction</p>
            <h2 className="h2">
              Vos documents, <i>dans la bonne langue</i>
            </h2>
            <p className="p wsoft cp-txt">
              <span className="d-only-i">Traductions anglais–français, français–anglais et autres langues&nbsp;: documents personnels, académiques et professionnels.</span>
              <span className="m-only-i">Anglais–français, français–anglais et autres langues.</span>
            </p>
            <p className="p small sv-tr-note">
              <span className="d-only-i">[À confirmer par l’Alliance&nbsp;: traductions certifiées ou non, et reconnaissance par les administrations.]</span>
              <span className="m-only-i">[À confirmer&nbsp;: traductions certifiées ou non.]</span>
            </p>
            <div className="steps sv-tr-steps d-only">
              <div className="step">
                <h3 className="h4">Envoi du document</h3>
                <p className="p small wsoft">Par email ou à l’accueil.</p>
              </div>
              <div className="step">
                <h3 className="h4">Devis</h3>
                <p className="p small wsoft">Sous [X] jours ouvrés.</p>
              </div>
              <div className="step">
                <h3 className="h4">Traduction</h3>
                <p className="p small wsoft">Par un traducteur qualifié.</p>
              </div>
              <div className="step">
                <h3 className="h4">Remise</h3>
                <p className="p small wsoft">Version numérique et papier.</p>
              </div>
            </div>
          </div>
          <div className="sv-tr-box stack g14">
            <h3 className="h3">Demander un devis</h3>
            <p className="p muted">
              Écrivez-nous en choisissant le sujet «&nbsp;Traduction&nbsp;» et précisez les langues souhaitées. Nous vous indiquerons ensuite comment nous
              transmettre votre document, par e-mail ou sur WhatsApp. Une photo nette du document suffit.
            </p>
            <Link className="btn btn-red btn-block" href={`${ROUTES.contact}?sujet=Traduction#ecrire`}>
              Nous écrire
            </Link>
            <a className="btn btn-line btn-block" href={c.waHref ?? ROUTES.contact} {...external(c.waHref)}>
              WhatsApp&nbsp;: {c.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Adhésion */}
      <section id="adhesion" className="wrap sec">
        <div className="row between end g28 mb48 sv-ad-head">
          <div className="stack g18" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Adhésion</p>
            <h2 className="h2">
              Devenez membre <i>de l’Alliance</i>
            </h2>
          </div>
          <Link className="btn btn-red arr d-only" href={`${ROUTES.contact}?sujet=Adh%C3%A9sion`}>
            Nous contacter
          </Link>
        </div>
        <div className="grid c3 sv-av d-only">
          {AVANTAGES.map(([t, d], i) => (
            <div key={t} className="stack g10 sv-av-i">
              <span className="serif red sv-av-n">0{i + 1}</span>
              <h3 className="h4">{t}</h3>
              <p className="p small muted">{d}</p>
            </div>
          ))}
        </div>
        <div className="stack m-only" style={{ borderTop: '2px solid #1a171b' }}>
          {AVANTAGES.map(([t, , court], i) => (
            <div key={t} className="fact" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
              <span className="serif red" style={{ fontSize: 26, fontStyle: 'italic' }}>
                0{i + 1}
              </span>
              <span>
                <b>{t === 'S’ouvrir au monde' ? 'S’ouvrir' : t}</b> · {court}
              </span>
            </div>
          ))}
        </div>
        <div className="grid c3 mt48 sv-tarifs rail snap">
          {(
            [
              ['Adulte', 'Adulte'],
              ['Étudiant · jeune', 'Étudiant'],
              ['Famille', 'Famille'],
            ] as const
          ).map(([l, lc], i) => (
            <div key={l} className={i === 2 ? 'tile redbg' : 'tile'} style={i === 2 ? undefined : { border: '1px solid #e4e1e0' }}>
              <p className={i === 2 ? 'p up' : 'p up muted'}>
                <span className="d-only-i">{l}</span>
                <span className="m-only-i">{lc}</span>
              </p>
              <p className="serif sv-tarif">
                [X] <span>GHS / an</span>
              </p>
            </div>
          ))}
        </div>
        <Link className="btn btn-red btn-block arr m-only" href={`${ROUTES.contact}?sujet=Adh%C3%A9sion`} style={{ marginTop: 18 }}>
          Nous contacter
        </Link>
      </section>

      {/* Boutique */}
      <section className="dark">
        <div className="wrap sec-s row between g28">
          <div className="stack g10">
            <h2 className="h3 sv-bt">Boutique</h2>
            <p className="p soft">
              <span className="d-only-i">Manuels de cours, livres et objets de l’Alliance, disponibles à l’accueil.</span>
              <span className="m-only-i">Manuels, livres et objets de l’Alliance, disponibles à l’accueil.</span>
            </p>
          </div>
          <Link className="btn btn-white arr d-only" href={ROUTES.contact}>
            Nous contacter
          </Link>
        </div>
      </section>
    </PageShell>
  )
}

function ExamIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <circle cx="24" cy="20" r="11" />
      <path d="M18 29l-4 13 10-5 10 5-4-13" />
      <path d="M19 20l3.5 3.5L29 17" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <path d="M8 10h10a6 6 0 016 6v24a4 4 0 00-4-4H8z" />
      <path d="M40 10H30a6 6 0 00-6 6v24a4 4 0 014-4h12z" />
    </svg>
  )
}
function TranslateIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <path d="M6 12h20M16 8v4M10 12c1 6 6 11 12 13" />
      <path d="M22 12c-1 6-6 11-12 13" />
      <path d="M26 40l7-18 7 18M28.5 34h9" />
    </svg>
  )
}
