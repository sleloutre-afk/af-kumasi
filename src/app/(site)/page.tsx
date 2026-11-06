import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageShell } from '@/components/PageShell'
import { HeroWords } from '@/components/home/HeroWords'
import { StatsBar } from '@/components/home/StatsBar'
import { HomeAgenda } from '@/components/home/HomeAgenda'
import { HeroVideoProvider, HeroVideoToggle } from '@/components/home/HeroVideo'
import { ArrowIcon, CameraIcon, ChevronIcon } from '@/components/EventMedia'
import { aLaUne, aVenir, carte, prochain } from '@/lib/evenements'
import { ligneInfos, offresAccueil } from '@/lib/offres'
import { CHIFFRES, CREDIT, ROUTES } from '@/lib/site'
import facade from '@/assets/photos/alliance-facade.jpg'
import maison from '@/assets/photos/alliance-maison.jpg'
import heroPoster from '@/assets/photos/hero-poster.jpg'
import heroPosterMobile from '@/assets/photos/hero-poster-mobile.jpg'

/**
 * Vidéo d'ambiance du hero (muette, en boucle), dérivée de « Sources photos - videos/videos/full.mp4 » :
 * H.264 1280×720 allégé (≈ 2 Mo) et version portrait pour mobile (406×720, ≈ 0,8 Mo).
 * Les fichiers gardant leur nom, incrémenter « ?v= » à chaque remplacement (cache des navigateurs).
 */
const HERO_VIDEO = { src: '/videos/hero.mp4?v=1', srcMobile: '/videos/hero-mobile.mp4?v=1' }

// La page dépend de la date du jour (événements à venir) : régénérée au plus toutes les heures.
export const revalidate = 3600

const NIVEAUX = [
  ['A1', 'Découverte'],
  ['A2', 'Survie'],
  ['B1', 'Seuil'],
  ['B2', 'Avancé'],
  ['C1', 'Autonome'],
  ['C2', 'Maîtrise'],
] as const

export default function AccueilPage() {
  const now = new Date()
  const next = prochain(now)
  const nextCarte = next ? carte(next) : null
  const cartes = aVenir(now).map((e) => carte(e))
  const une = aLaUne(now)
  const offres = offresAccueil()

  return (
    <PageShell>
      {/* ============ HERO ============ */}
      <section className="hero">
        {/* Vidéo d'ambiance : image fixe d'abord, lecture selon l'écran et la connexion (HeroVideo). */}
        <HeroVideoProvider src={HERO_VIDEO.src} srcMobile={HERO_VIDEO.srcMobile} poster={heroPoster} posterMobile={heroPosterMobile}>
        <HeroNet />
        <div className="hero-veil" aria-hidden="true" />
        <Header current="accueil" />

        <div className="wrap hero-b">
          <p className="hero-eyebrow rise">
            <span aria-hidden="true" />
            <span className="d-only">Akwaaba · Bienvenue à Kumasi</span>
            <span className="m-only">Akwaaba · Bienvenue</span>
          </p>
          <h1 className="hero-t serif rise d1s">
            Le français,
            <br />
            <HeroWords />
          </h1>
          <p className="hero-lead rise">
            Depuis 1956, l’Alliance Française de Kumasi enseigne le français à tous les âges et fait vivre les cultures francophones et ghanéennes
            <span className="d-only-i">, au cœur de la région Ashanti</span>.
          </p>
          <div className="hero-ctas rise">
            <Link className="btn btn-red" href={`${ROUTES.cours}#trouver`}>
              Trouver mon cours <ArrowIcon />
            </Link>
            <a className="btn btn-white" href="#evenements">
              Voir l’agenda
            </a>
          </div>
          <HeroVideoToggle className="hero-vid m-only" />
        </div>

        <div className="wrap hero-foot d-only">
          {nextCarte ? (
            <Link href={nextCarte.href} className="hero-next lift">
              <span className="hero-next-d">
                <span className="serif">{nextCarte.d2}</span>
                <span>{nextCarte.d3}</span>
              </span>
              <span className="hero-next-b">
                <span className="hero-next-k">Prochain événement</span>
                <span className="serif">{nextCarte.titre}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          <HeroVideoToggle className="hero-vid" />
        </div>
        {/* Crédit de la vidéo d'ambiance (charte AF). */}
        <span className="credit hero-credit">{CREDIT}</span>
        <div className="kente-fine" />
        </HeroVideoProvider>
      </section>

      {/* ============ CHIFFRES CLÉS ============ */}
      <section aria-label="Chiffres clés" className="redbg">
        <StatsBar
          stats={[
            { value: String(CHIFFRES.anneeFondation), label: 'Année de fondation de l’Alliance', labelCourt: 'Année de fondation' },
            { value: CHIFFRES.apprenants2025, label: 'apprenants en 2025' },
            { value: 'A1 → C2', label: 'Tous les niveaux, enfants et adultes', labelCourt: 'Tous les niveaux' },
            { value: CHIFFRES.alliancesDansLeMonde, suffix: '+', label: 'Alliances Françaises dans le monde', labelCourt: 'Alliances dans le monde' },
            { value: '[XX]', label: 'événements culturels par an' },
          ]}
        />
      </section>

      {/* ============ PROCHAIN ÉVÉNEMENT (mobile) ============ */}
      {nextCarte && (
        <Link href={nextCarte.href} className="m-next m-only">
          <span className="m-next-d">
            <span className="serif">{nextCarte.d2}</span>
            <span>{nextCarte.d3}</span>
          </span>
          <span className="m-next-b">
            <span className="m-next-k">Prochain événement</span>
            <span className="serif">{nextCarte.titre}</span>
          </span>
          <span className="m-next-c">
            <ChevronIcon size={20} />
          </span>
        </Link>
      )}

      {/* ============ L'ALLIANCE ============ */}
      <section id="alliance" className="wrap home-al">
        <div className="home-al-head stack g18">
          <p className="eyebrow">L’Alliance</p>
          <h2 className="h2">
            Un lieu de langue et de culture, <i>au cœur de l’Ashanti</i>
          </h2>
        </div>
        <div className="home-al-collage">
          {/* Photos posées dans leur cadre de couleur (gris-bleu, fuchsia) ; crédit dans la bande du bas. */}
          <figure className="al-p1 al-frame hatch">
            <div className="al-frame-img">
              <Image
                src={facade}
                alt="Façade de l’Alliance Française de Kumasi : mur blanc, enseigne de l’Alliance et portail noir, drapeau français devant l’entrée."
                fill
                sizes="(max-width: 760px) 66vw, (max-width: 1360px) 32vw, 420px"
                style={{ objectFit: 'cover', objectPosition: '0% 50%' }}
                placeholder="blur"
              />
            </div>
            <figcaption className="al-frame-cap al-cap-p1">
              <CameraIcon size={14} />
              {CREDIT}
            </figcaption>
          </figure>
          <figure className="al-p2 al-frame hatch">
            <div className="al-frame-img">
              <Image
                src={maison}
                alt="Le bâtiment de l’Alliance : maison blanche aux grandes arcades vitrées, au milieu d’un jardin fleuri."
                fill
                sizes="(max-width: 760px) 44vw, (max-width: 1360px) 24vw, 320px"
                style={{ objectFit: 'cover', objectPosition: '55% 50%' }}
                placeholder="blur"
              />
            </div>
            <figcaption className="al-frame-cap al-cap-p2">
              <CameraIcon size={14} />
              {CREDIT}
            </figcaption>
          </figure>
          <div className="al-70" aria-hidden="true">
            <span className="serif">70</span>
            <span className="al-70-ans">ans</span>
            <span className="al-70-dates d-only">1956 — 2026</span>
          </div>
        </div>
        <div className="home-al-body stack g18">
          <p className="home-al-p">
            Fondée le 16&nbsp;mai 1956, l’Alliance Française de Kumasi est une association indépendante, membre du réseau mondial des Alliances
            Françaises. Elle accueille chaque année des centaines d’apprenants<span className="d-only-i">, enfants et adultes,</span> et programme
            une saison culturelle ouverte à tous.
          </p>
          <div className="pillars">
            <div className="pillar" style={{ borderTopColor: '#da002e' }}>
              <p className="serif">Enseigner</p>
              <p>Le français pour tous, de A1 à C2.</p>
            </div>
            <div className="pillar" style={{ borderTopColor: '#1a171b' }}>
              <p className="serif">Certifier</p>
              <p>DELF, DALF, TCF&nbsp;: des diplômes reconnus.</p>
            </div>
            <div className="pillar" style={{ borderTopColor: '#87888a' }}>
              <p className="serif">Partager</p>
              <p>Cinéma, musique, expositions, rencontres.</p>
            </div>
          </div>
          <Link className="ulink" href={ROUTES.alliance}>
            Notre histoire, notre équipe
          </Link>
        </div>
      </section>

      {/* ============ ÉVÉNEMENTS ============ */}
      <section id="evenements" className="dark home-ev">
        <div className="kente" />
        <div className="home-ev-word serif d-only" aria-hidden="true">
          Agenda
        </div>
        <div className="wrap home-ev-in">
          <div className="row between end g28">
            <div className="stack g18">
              <p className="eyebrow pk">Agenda culturel</p>
              <h2 className="h2 home-ev-t">
                À l’affiche <i>à l’Alliance</i>
              </h2>
            </div>
            <Link className="ulink w d-only" href={ROUTES.agenda}>
              Tout l’agenda
            </Link>
          </div>
          <HomeAgenda cartes={cartes} uneSlug={une?.slug} />
          <Link className="btn btn-linew btn-block m-only home-ev-all" href={ROUTES.agenda}>
            Tout l’agenda
          </Link>
        </div>
      </section>

      {/* ============ COURS ============ */}
      <section id="cours" className="wrap home-co">
        <div className="row between end g28 home-co-head">
          <div className="stack g18" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Apprendre le français</p>
            <h2 className="h2">
              Un cours pour chaque âge, <i>chaque niveau, chaque projet</i>
            </h2>
          </div>
          <Link className="btn btn-dark d-only" href={ROUTES.cours}>
            Voir tous les cours <ArrowIcon />
          </Link>
        </div>

        <div className="co-cards">
          <CourseCard
            href={`${ROUTES.cours}#adultes`}
            tone="red"
            word="Aa"
            photo="Photo · Adultes en cours collectif"
            titre="Adultes"
            texte="Cours collectifs tous niveaux, pour voyager, étudier, travailler ou simplement le plaisir de parler français."
            texteCourt="Cours collectifs tous niveaux, pour voyager, étudier ou travailler."
            lien="Voir les cours adultes"
            lienCourt="Voir les cours"
          />
          <CourseCard
            href={`${ROUTES.cours}#enfants`}
            tone="fu"
            word="abc"
            photo="Photo · Enfants en atelier ludique"
            titre="Enfants & ados"
            texte="Apprendre en jouant, en chantant, en créant : des cours adaptés à chaque tranche d’âge, à partir de [ÂGE] ans."
            texteCourt="Apprendre en jouant, en chantant, en créant, dès [ÂGE] ans."
            lien="Voir les cours jeunesse"
            lienCourt="Voir les cours"
          />
          <CourseCard
            href={ROUTES.contact}
            tone="gb"
            word="1:1"
            photo="Photo · Cours particulier / entreprise"
            titre="Particuliers & entreprises"
            texte="Des formations sur mesure, en présentiel ou en ligne, construites autour de vos objectifs et de votre agenda."
            texteCourt="Sur mesure, en présentiel ou en ligne."
            lien="Demander un devis"
            lienCourt="Demander un devis"
          />
        </div>

        <div className="co-levels">
          <p className="co-levels-k">
            <span className="d-only-i">Six niveaux du Cadre européen commun de référence</span>
            <span className="m-only-i">Six niveaux du CECRL</span>
          </p>
          <div className="co-levels-row rail">
            {NIVEAUX.map(([code, nom], i) => (
              <div key={code} className={`co-lvl l${i + 1}`}>
                <span className="serif">{code}</span>
                <span>{nom}</span>
              </div>
            ))}
          </div>
        </div>
        <Link className="btn btn-dark btn-block m-only" href={ROUTES.cours}>
          Voir tous les cours
        </Link>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="paper hatch-dark">
        <div className="wrap sec">
          <div className="stack g18 home-sv-head">
            <p className="eyebrow">Services</p>
            <h2 className="h2">
              Bien plus <i>qu’une école de langue</i>
            </h2>
          </div>
          <div className="sv-cards">
            <ServiceCard
              href={`${ROUTES.services}#examens`}
              icon={<ExamIcon />}
              titre="Examens & certifications"
              texte="DELF, DALF, TCF, DAEFLE, DFP : préparez et passez à Kumasi des diplômes et tests officiels reconnus à l’international."
              texteCourt="DELF, DALF, TCF, DAEFLE, DFP"
              lien="Dates des sessions →"
            />
            <ServiceCard
              href={`${ROUTES.services}#mediatheque`}
              icon={<BookIcon />}
              titre="Médiathèque"
              texte="Livres, films, magazines et BD à emprunter, un espace calme pour étudier et un accès gratuit à Culturethèque."
              texteCourt="Livres, films, BD · Culturethèque"
              lien="Découvrir la médiathèque →"
            />
            <ServiceCard
              href={`${ROUTES.services}#traduction`}
              icon={<TranslateIcon />}
              titre="Traduction"
              texte="Traductions anglais–français, français–anglais et autres langues, pour vos documents personnels et professionnels."
              texteCourt="Anglais ↔ français et autres langues"
              lien="Demander une traduction →"
            />
            <ServiceCard
              href={`${ROUTES.services}#adhesion`}
              red
              icon={
                <span className="serif sv-af" aria-hidden="true">
                  a<i>f</i>
                </span>
              }
              titre="Devenir membre"
              texte="Tarifs réduits, invitations aux événements, emprunts à la médiathèque et accès au réseau de plus de 800 Alliances."
              texteCourt="Tarifs réduits, invitations, médiathèque"
              lien="En savoir plus →"
            />
          </div>
        </div>
      </section>

      {/* ============ NOUS REJOINDRE ============ */}
      <section id="rejoindre" className="gbbg home-rj">
        <svg className="home-rj-net d-only" aria-hidden="true" viewBox="0 0 400 300">
          <g fill="none" stroke="rgba(255,255,255,.5)" strokeDasharray="4 6">
            <path d="M20 260L120 160L240 200L360 80" />
            <path d="M120 160L160 40" />
          </g>
          <circle cx="120" cy="160" r="8" fill="#da002e" />
          <circle cx="240" cy="200" r="6" fill="#fff" />
          <rect x="352" y="72" width="14" height="14" fill="#a9005d" />
          <circle cx="160" cy="40" r="5" fill="#fff" />
        </svg>
        <div className="wrap home-rj-in">
          <div className="stack g18">
            <p className="eyebrow w">Nous rejoindre</p>
            <h2 className="h2">
              Enseignez, créez, <i>partagez avec nous</i>
            </h2>
            <p className="home-rj-p">
              Professeurs, équipe administrative, stagiaires, volontaires&nbsp;: rejoignez une équipe engagée
              <span className="d-only-i"> au service de la langue française et du dialogue des cultures</span>.
            </p>
          </div>
          <div className="stack g12">
            {offres.map((o) => (
              <Link key={o.slug} href={`${ROUTES.rejoindre}#offre-${o.slug}`} className="rj-job lift">
                <span className="stack g4">
                  <span className="serif rj-job-t">{o.intitule}</span>
                  <span className="rj-job-m">
                    <span className="d-only-i">{ligneInfos(o)}</span>
                    <span className="m-only-i">{ligneInfos(o, true)}</span>
                  </span>
                </span>
                <span className="d-only-i">
                  <ArrowIcon size={22} color="#da002e" />
                </span>
                <span className="m-only-i">
                  <ChevronIcon size={20} />
                </span>
              </Link>
            ))}
            <Link className="ulink w rj-all" href={ROUTES.rejoindre}>
              <span className="d-only-i">Toutes les offres · Candidature spontanée</span>
              <span className="m-only-i">Toutes les offres</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function CourseCard(props: {
  href: string
  tone: 'red' | 'fu' | 'gb'
  word: string
  photo: string
  titre: string
  texte: string
  texteCourt: string
  lien: string
  lienCourt: string
}) {
  return (
    <Link href={props.href} className="co-card lift">
      <div className={`co-img hatch t-${props.tone}`}>
        <span className="co-word serif" aria-hidden="true">
          {props.word}
        </span>
        <span className="co-cap d-only">{props.photo}</span>
      </div>
      <div className="co-b">
        <h3 className="serif co-t">{props.titre}</h3>
        <p className="co-p">
          <span className="d-only-i">{props.texte}</span>
          <span className="m-only-i">{props.texteCourt}</span>
        </p>
        <span className="co-l">
          <span className="d-only-i">{props.lien}</span>
          <span className="m-only-i">{props.lienCourt} →</span>
          <span className="d-only-i">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>
    </Link>
  )
}

function ServiceCard(props: { href: string; icon: React.ReactNode; titre: string; texte: string; texteCourt: string; lien: string; red?: boolean }) {
  return (
    <Link href={props.href} className={props.red ? 'sv-card lift red-card' : 'sv-card lift'}>
      <span className="sv-ic">{props.icon}</span>
      <span className="sv-txt">
        <span className="serif sv-t">{props.titre}</span>
        <span className="sv-p">
          <span className="d-only-i">{props.texte}</span>
          <span className="m-only-i">{props.texteCourt}</span>
        </span>
      </span>
      <span className="sv-l d-only">{props.lien}</span>
      <span className="sv-chev m-only">
        <ChevronIcon color={props.red ? '#fff' : '#da002e'} />
      </span>
    </Link>
  )
}

function ExamIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <circle cx="24" cy="20" r="11" />
      <path d="M18 29l-4 13 10-5 10 5-4-13" />
      <path d="M19 20l3.5 3.5L29 17" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <path d="M8 10h10a6 6 0 016 6v24a4 4 0 00-4-4H8z" />
      <path d="M40 10H30a6 6 0 00-6 6v24a4 4 0 014-4h12z" />
    </svg>
  )
}

function TranslateIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="#da002e" strokeWidth="2">
      <path d="M6 12h20M16 8v4M10 12c1 6 6 11 12 13" />
      <path d="M22 12c-1 6-6 11-12 13" />
      <path d="M26 40l7-18 7 18M28.5 34h9" />
    </svg>
  )
}

/** Motif « réseau » de la charte (points + pointillés) : version grand écran et version mobile. */
function HeroNet() {
  return (
    <>
      <svg className="hero-net d-only" aria-hidden="true" viewBox="0 0 640 520">
        <g fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" strokeDasharray="4 6" className="dash">
          <path d="M60 80 L190 170 L330 120 L470 60" />
          <path d="M190 170 L230 320 L120 420" />
          <path d="M230 320 L400 360 L560 250" />
          <path d="M330 120 L400 360" />
          <path d="M400 360 L470 480" />
          <path d="M560 250 L600 120" />
        </g>
        <rect x="300" y="90" width="70" height="70" fill="rgba(169,0,93,.35)" transform="rotate(-8 335 125)" />
        <rect x="370" y="330" width="62" height="62" fill="rgba(255,255,255,.18)" transform="rotate(12 401 361)" />
        <circle className="pulse" cx="60" cy="80" r="7" fill="#ffffff" />
        <circle className="pulse" cx="190" cy="170" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.6s' }} />
        <circle className="pulse" cx="330" cy="120" r="12" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.2s' }} />
        <rect x="463" y="53" width="14" height="14" fill="#1a171b" />
        <rect x="223" y="313" width="14" height="14" fill="#ffffff" transform="rotate(20 230 320)" />
        <circle className="pulse" cx="400" cy="360" r="9" fill="#ffffff" style={{ animationDelay: '1.8s' }} />
        <circle cx="120" cy="420" r="5" fill="#87888a" />
        <rect x="552" y="242" width="16" height="16" fill="#da002e" stroke="#fff" strokeWidth="2" transform="rotate(-15 560 250)" />
        <circle className="pulse" cx="600" cy="120" r="6" fill="#1a171b" style={{ animationDelay: '2.4s' }} />
        <circle cx="470" cy="480" r="5" fill="#ffffff" />
      </svg>
      <svg className="hero-net-m m-only" aria-hidden="true" viewBox="0 0 390 300">
        <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.2" strokeDasharray="4 6" className="dash">
          <path d="M200 40 L290 110 L370 70" />
          <path d="M290 110 L260 220 L340 270" />
          <path d="M260 220 L160 250" />
        </g>
        <circle className="pulse" cx="200" cy="40" r="6" fill="#fff" />
        <circle className="pulse" cx="290" cy="110" r="10" fill="#da002e" stroke="#fff" strokeWidth="2" style={{ animationDelay: '.8s' }} />
        <rect x="363" y="63" width="13" height="13" fill="#1a171b" />
        <circle className="pulse" cx="260" cy="220" r="8" fill="#a9005d" stroke="#fff" strokeWidth="2" style={{ animationDelay: '1.6s' }} />
        <circle cx="340" cy="270" r="5" fill="#fff" />
        <rect x="153" y="243" width="12" height="12" fill="#fff" transform="rotate(20 159 249)" />
      </svg>
    </>
  )
}
