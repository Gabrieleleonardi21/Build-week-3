import { useState } from "react";
import Card from "@/ui/Card";
import { ASIDE_VIEWERS, ASIDE_PEOPLE, ASIDE_PAGES } from "./profileData";

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
// (stato solo locale, nessuna scrittura sul DB) e i bottoni che aprono la
// modale "Pagina in costruzione" tramite la callback `onConstruction`.
function ProfileAside({ user, onConstruction }) {
  const [language, setLanguage] = useState("English");
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
          <h2 className="h6 fw-bold mb-0">Profile language</h2>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-circle"
            onClick={() => onConstruction("Lingua del profilo")}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
        <div className="d-flex gap-2 mb-3">
          {["English", "Italiano"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`btn btn-sm rounded-pill ${
                language === lang ? "btn-success text-white" : "btn-outline-secondary"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h6 fw-bold mb-0">Public profile & URL</h2>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-circle"
            onClick={() => onConstruction("URL del profilo pubblico")}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
        <p className="small text-muted mb-0">
          www.linkedin.com/in/{slugify(user.name)}
        </p>
      </Card>

      {/* Banner pubblicitario Premium: decorativo, apre il placeholder al click */}
      <Card className="mb-3 p-3">
        <div className="d-flex justify-content-between mb-2">
          <span className="small text-muted">Ad</span>
          <i className="bi bi-three-dots text-muted"></i>
        </div>
        <p className="small text-center mb-3">
          {user.name}, enjoy 50% off 2 months of LinkedIn Premium!
        </p>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <span
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
          >
            <i className="bi bi-person-fill text-muted"></i>
          </span>
          <span className="badge text-bg-warning">Premium</span>
        </div>
        <p className="small text-center mb-3">Invest in your future with this exclusive offer.</p>
        <button
          type="button"
          className="btn btn-outline-primary rounded-pill w-100"
          onClick={() => onConstruction("LinkedIn Premium")}
        >
          Get 50% off today
        </button>
      </Card>

      {/* Elenco finto di "chi ha visto il profilo": nessun nome/foto reale, solo un ruolo generico */}
      <Card className="mb-3 p-3">
        <h2 className="h6 fw-bold mb-1">Who your viewers also viewed</h2>
        <p className="small text-muted mb-3">Private to you</p>
        {ASIDE_VIEWERS.map((v) => (
          <div key={v.role} className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-person-circle fs-2 text-muted"></i>
            <div className="flex-grow-1">
              <div className="small">{v.role}</div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill mt-1"
                onClick={() => onConstruction("Profilo")}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Persone che potresti conoscere: il bottone Connect è un toggle locale, nessuna richiesta reale */}
      <Card className="mb-3 p-3">
        <h2 className="h6 fw-bold mb-1">People you may know</h2>
        <p className="small text-muted mb-3">From your school</p>
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
                {connected.has(p.name) ? "Pending" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Pagine consigliate: il bottone Follow è anch'esso un toggle locale */}
      <Card className="mb-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h2 className="h6 fw-bold mb-0">You might like</h2>
        </div>
        <p className="small text-muted mb-3">Pages for you</p>
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
                {followed.has(p.name) ? "Following" : "+ Follow"}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-link btn-sm p-0"
          onClick={() => onConstruction("Pagine consigliate")}
        >
          Show all →
        </button>
      </Card>

      {/* Banner statico finale, decorativo. Card non inoltra la prop `style`,
          quindi qui uso un div con la sua stessa classe per poter impostare
          lo sfondo scuro inline. */}
      <div className="li-card mb-3 p-3 text-white" style={{ background: "#1a1a2e" }}>
        <p className="fw-bold mb-2">
          Your job search <span className="text-info">powered by your network</span>
        </p>
        <button
          type="button"
          className="btn btn-info btn-sm rounded-pill"
          onClick={() => onConstruction("Offerte di lavoro")}
        >
          Explore jobs
        </button>
      </div>
    </div>
  );
}

export default ProfileAside;
