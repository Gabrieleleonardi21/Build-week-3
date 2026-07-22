import { useState } from "react";
import Card from "@/ui/Card";
import { ASIDE_VIEWERS, ASIDE_PEOPLE, ASIDE_PAGES } from "./profileData";
import { PROFILE_TRANSLATIONS } from "./translations";

// Trasforma il nome utente in uno slug tipo "nome-cognome" per l'URL pubblico
// finto (mai il vero username LinkedIn di nessuno).
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // spazi/accenti/punteggiatura -> trattino
    .replace(/(^-|-$)/g, ""); // niente trattini a inizio/fine
}

// Colonna laterale destra della pagina Profilo: lingua, URL pubblico, banner
// Premium, "chi ha visto il tuo profilo", persone che potresti conoscere e
// pagine consigliate. Tutto qui è decorativo tranne i toggle Connect/Follow
// (stato solo locale, nessuna scrittura sul DB), il toggle Profile language
// (controllato dal genitore: cambia la lingua di tutta la pagina Profilo) e
// i bottoni che aprono la modale "Pagina in costruzione" tramite la callback
// `onConstruction`.
function ProfileAside({ user, language, onLanguageChange, onConstruction }) {
  const t = PROFILE_TRANSLATIONS[language];

  // Un Set con i nomi già "connessi/seguiti": basta un click per passare
  // da "Connect"/"Follow" a "Pending"/"Following" e viceversa
  const [connected, setConnected] = useState(new Set());
  const [followed, setFollowed] = useState(new Set());

  function toggleConnected(name) {
    setConnected((s) => {
      const next = new Set(s);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function toggleFollowed(name) {
    setFollowed((s) => {
      const next = new Set(s);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div>
      <Card className="mb-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h6 fw-bold mb-0">{t.profileLanguage}</h2>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-circle"
            onClick={() => onConstruction(t.profileLanguage)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
        <div className="d-flex gap-2 mb-3">
          {["English", "Italiano"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onLanguageChange(lang)}
              className={`btn btn-sm rounded-pill ${
                language === lang ? "btn-success text-white" : "btn-outline-secondary"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <hr />

        {/* Sezione statica: nessuna azione di modifica collegata */}
        <h2 className="h6 fw-bold mb-2">{t.publicProfileUrl}</h2>
        <p className="small text-muted mb-0">
          www.linkedin.com/in/{slugify(user.name)}
        </p>
      </Card>

      {/* Banner pubblicitario Premium: decorativo, apre il placeholder al click */}
      <Card className="mb-3 p-3">
        <div className="d-flex justify-content-between mb-2">
          <span className="small text-muted">{t.ad}</span>
          <i className="bi bi-three-dots text-muted"></i>
        </div>
        <p className="small text-center mb-3">{t.premiumPitch(user.name)}</p>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <span
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
          >
            <i className="bi bi-person-fill text-muted"></i>
          </span>
          <span className="badge text-bg-warning">{t.premium}</span>
        </div>
        <p className="small text-center mb-3">{t.premiumInvest}</p>
        <button
          type="button"
          className="btn btn-outline-primary rounded-pill w-100"
          onClick={() => onConstruction(t.premium)}
        >
          {t.premiumCta}
        </button>
      </Card>

      {/* Elenco finto di "chi ha visto il profilo": nessun nome/foto reale, solo un ruolo generico */}
      <Card className="mb-3 p-3">
        <h2 className="h6 fw-bold mb-1">{t.viewersAlsoViewed}</h2>
        <p className="small text-muted mb-3">{t.privateToYou}</p>
        {ASIDE_VIEWERS.map((v) => (
          <div key={v.role} className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-person-circle fs-2 text-muted"></i>
            <div className="flex-grow-1">
              <div className="small">{v.role}</div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill mt-1"
                onClick={() => onConstruction(t.view)}
              >
                {t.view}
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Persone che potresti conoscere: il bottone Connect è un toggle locale, nessuna richiesta reale */}
      <Card className="mb-3 p-3">
        <h2 className="h6 fw-bold mb-1">{t.peopleYouMayKnow}</h2>
        <p className="small text-muted mb-3">{t.fromYourSchool}</p>
        {ASIDE_PEOPLE.map((p) => (
          <div key={p.name} className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-person-circle fs-2 text-muted"></i>
            <div className="flex-grow-1">
              <div className="small fw-bold">{p.name}</div>
              <div className="small text-muted">{p.role}</div>
              <button
                type="button"
                className="btn btn-sm rounded-pill mt-1 d-flex align-items-center gap-1 btn-outline-secondary"
                onClick={() => toggleConnected(p.name)}
              >
                <i className={`bi ${connected.has(p.name) ? "bi-check2" : "bi-person-plus"}`}></i>
                {connected.has(p.name) ? t.pending : t.connect}
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Pagine consigliate: il bottone Follow è anch'esso un toggle locale */}
      <Card className="mb-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h2 className="h6 fw-bold mb-0">{t.youMightLike}</h2>
        </div>
        <p className="small text-muted mb-3">{t.pagesForYou}</p>
        {ASIDE_PAGES.map((p) => (
          <div key={p.name} className="d-flex align-items-center gap-2 mb-3">
            <span
              className="rounded bg-light d-inline-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
            >
              <i className="bi bi-building text-muted"></i>
            </span>
            <div className="flex-grow-1">
              <div className="small fw-bold">{p.name}</div>
              <div className="small text-muted">{p.category}</div>
              <div className="small text-muted">{p.followers}</div>
              <button
                type="button"
                className="btn btn-sm rounded-pill mt-1 btn-outline-secondary"
                onClick={() => toggleFollowed(p.name)}
              >
                {followed.has(p.name) ? t.following : t.follow}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-link btn-sm p-0"
          onClick={() => onConstruction(t.youMightLike)}
        >
          {t.showAll}
        </button>
      </Card>

      {/* Banner statico finale, decorativo. Card non inoltra la prop `style`,
          quindi qui uso un div con la sua stessa classe per poter impostare
          lo sfondo scuro inline. */}
      <div className="li-card mb-3 p-3 text-white" style={{ background: "#1a1a2e" }}>
        <p className="fw-bold mb-2">
          {t.jobSearchLine1} <span className="text-info">{t.jobSearchLine2}</span>
        </p>
        <button
          type="button"
          className="btn btn-info btn-sm rounded-pill"
          onClick={() => onConstruction(t.exploreJobs)}
        >
          {t.exploreJobs}
        </button>
      </div>
    </div>
  );
}

export default ProfileAside;
