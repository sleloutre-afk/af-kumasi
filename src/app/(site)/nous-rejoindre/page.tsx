import type { Metadata } from 'next'
import { CandidatureForm } from '@/components/CandidatureForm'
import { JobList } from '@/components/JobList'
import { PageShell } from '@/components/PageShell'
import { PageHero } from '@/components/PageHero'
import { Ph } from '@/components/Ph'
import { offresEnCours } from '@/lib/offres'

export const metadata: Metadata = {
  title: 'Nous rejoindre',
  description: 'Professeurs, équipe administrative, stagiaires, volontaires : les offres d’emploi de l’Alliance Française de Kumasi et la candidature spontanée.',
}

const ETAPES = [
  ['Candidature', 'CV et quelques mots de motivation via le formulaire.', 'CV et motivation via le formulaire.'],
  ['Premier échange', 'Un entretien, à l’Alliance ou en visio.', 'À l’Alliance ou en visio.'],
  ['Mise en situation', 'Pour les professeurs : une séance de cours d’essai.', 'Cours d’essai pour les professeurs.'],
  ['Réponse', 'Nous répondons à toutes les candidatures. [Délai à confirmer.]', 'Nous répondons à toutes les candidatures.'],
] as const

export default function RejoindrePage() {
  const offres = offresEnCours()
  return (
    <PageShell mobileAction={{ label: 'Postuler', href: '#candidature' }}>
      <PageHero
        current="rejoindre"
        tone="gb"
        crumb="Nous rejoindre"
        eyebrow="Nous rejoindre"
        title={
          <>
            Enseignez, créez, <i>partagez avec nous</i>
          </>
        }
        titleMaxWidth="13ch"
        lead={
          <>
            <span className="d-only-i">
              Professeurs, équipe administrative, stagiaires, volontaires&nbsp;: l’Alliance de Kumasi recrute des talents engagés au service de la langue
              française.
            </span>
            <span className="m-only-i">Professeurs, administratifs, stagiaires, volontaires&nbsp;: rejoignez l’Alliance.</span>
          </>
        }
        netDesktop={
          <>
            <path className="ln" d="M40 70L180 150L320 100L460 50M180 150L220 290L110 380M220 290L390 320L540 220M320 100L390 320M540 220L580 100" />
            <circle className="pulse" cx="40" cy="70" r="7" fill="#fff" />
            <circle className="pulse" cx="180" cy="150" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.6s' }} />
            <circle className="pulse" cx="320" cy="100" r="12" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.2s' }} />
            <rect x="453" y="43" width="14" height="14" fill="#1a171b" />
            <circle className="pulse" cx="390" cy="320" r="9" fill="#fff" style={{ animationDelay: '1.8s' }} />
            <rect x="532" y="212" width="16" height="16" fill="#da002e" stroke="#fff" strokeWidth="2" />
            <circle cx="110" cy="380" r="5" fill="#fff" />
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
        <div className="row g14 rise d3s d-only">
          <a className="btn btn-red arr" href="#offres">
            Voir les offres
          </a>
          <a className="btn btn-linew" href="#candidature">
            Candidature spontanée
          </a>
        </div>
      </PageHero>

      {/* Pourquoi nous rejoindre */}
      <section className="wrap sec grid c2 g72 rj-why" style={{ alignItems: 'center' }}>
        <div className="stack g28 rj-why-t">
          <div className="stack g18">
            <p className="eyebrow">Pourquoi nous rejoindre</p>
            <h2 className="h2">
              Une petite équipe, <i>un grand réseau</i>
            </h2>
          </div>
          <Ph tone="fu" word="Équipe" wordSize={110} cap="Photo · L’équipe" className="m-only" style={{ height: 220 }} />
          <div className="stack g18">
            <div className="rule">
              <h3 className="h4">Un réseau mondial</h3>
              <p className="p muted">
                <span className="d-only-i">Travailler à Kumasi, c’est appartenir à un réseau de plus de 800 Alliances Françaises dans le monde.</span>
                <span className="m-only-i">Plus de 800 Alliances Françaises dans le monde.</span>
              </p>
            </div>
            <div className="rule k">
              <h3 className="h4">Une équipe à taille humaine</h3>
              <p className="p muted">
                <span className="d-only-i">Des missions variées, de la responsabilité et une vraie place pour les initiatives.</span>
                <span className="m-only-i">Des missions variées et de la responsabilité.</span>
              </p>
            </div>
            <div className="rule g">
              <h3 className="h4">Apprendre en continu</h3>
              <p className="p muted">
                <span className="d-only-i">Formations pédagogiques et échanges avec les autres Alliances. [À confirmer.]</span>
                <span className="m-only-i">Formations et échanges entre Alliances. [À confirmer.]</span>
              </p>
            </div>
          </div>
        </div>
        <Ph tone="fu" word="Équipe" wordSize={180} cap="Photo · L’équipe en réunion pédagogique" className="d-only" style={{ minHeight: 520 }} />
      </section>

      {/* Offres en cours (exemples fictifs tant que le BO Offres d'emploi n'est pas construit) */}
      <section id="offres" className="paper hatch-dark">
        <div className="wrap sec">
          <JobList offres={offres} />
        </div>
      </section>

      {/* Le recrutement */}
      <section className="wrap sec">
        <div className="stack g18 mb48">
          <p className="eyebrow">Le recrutement</p>
          <h2 className="h2">
            Comment <i>ça se passe&nbsp;?</i>
          </h2>
        </div>
        <div className="steps rj-steps">
          {ETAPES.map(([t, d, dc]) => (
            <div key={t} className="step">
              <h3 className="h4">{t}</h3>
              <p className="p small muted">
                <span className="d-only-i">{d}</span>
                <span className="m-only-i">{dc}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Candidature */}
      <section id="candidature" className="dark">
        <div className="kente" />
        <div className="wrap sec grid c2 g72" style={{ alignItems: 'start' }}>
          <div className="stack g18">
            <p className="eyebrow pk">Candidater</p>
            <h2 className="h2">
              Envoyez-nous <i>votre candidature</i>
            </h2>
            <p className="p soft cp-txt">
              Pour une offre en cours ou une candidature spontanée&nbsp;: nous conservons les profils qui nous intéressent pour nos futurs besoins.
            </p>
            <p className="p small soft">Vos données sont utilisées uniquement pour le recrutement. [Mention de protection des données à valider.]</p>
          </div>
          <CandidatureForm postes={offres.map((o) => o.intitule)} />
        </div>
      </section>
    </PageShell>
  )
}
