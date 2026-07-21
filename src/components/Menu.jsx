import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../assets/css/Menu.css";
import Pubblicita from "./Pubblicta";

// Colonna sinistra: gruppi di scorciatoie con icona
const APP_GROUPS = [
  {
    titolo: "Le mie app",
    voci: [
      { icona: "bi-compass", testo: "Vendi" },
      { icona: "bi-people-fill", testo: "Gruppi" },
    ],
  },
  {
    titolo: "Talent",
    voci: [
      { icona: "bi-bar-chart-fill", testo: "Talent Insights" },
      { icona: "bi-postcard-fill", testo: "Pubblica un'offerta di lavoro" },
    ],
  },
  {
    titolo: "Vendite",
    voci: [
      { icona: "bi-hand-thumbs-up-fill", testo: "Marketplace dei servizi" },
    ],
  },
  {
    titolo: "Marketing",
    voci: [{ icona: "bi-megaphone-fill", testo: "Pubblicizza" }],
  },
  {
    titolo: "Learning",
    voci: [{ icona: "bi-play-btn-fill", testo: "Learning" }],
  },
];

// Colonna destra: titolo + sottotitolo
const BUSINESS = [
  { testo: "Assumi su LinkedIn", sotto: "Trova, attrai e assumi" },
  {
    testo: "Vendi con LinkedIn",
    sotto: "Sblocca nuove opportunità di vendita",
  },
  {
    testo: "Offerta di lavoro gratuita",
    sotto: "Ottieni rapidamente candidati qualificati",
  },
  {
    testo: "Fai pubblicità su LinkedIn",
    sotto: "Acquisisci clienti e fai crescere la tua azienda",
  },
  { testo: "Inizia con Premium", sotto: "Amplia e sfrutta la tua rete" },
  {
    testo: "Impara con LinkedIn",
    sotto: "Corsi per formare i tuoi dipendenti",
  },
  {
    testo: "Centro per amministratori",
    sotto: "Gestisci i dettagli di fatturazione e account",
  },
];

// Come in DropdownUser: toggle custom per impilare icona e scritta.
const MenuToggle = forwardRef(function MenuToggle({ onClick }, ref) {
  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-3 d-flex flex-column align-items-center iconContainer"
    >
      <i className="bi bi-grid-3x3-gap-fill menuToggle-grid fs-5"></i>
      <p className="p-0 m-0 d-flex align-items-center gap-1">
        Per le aziende
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 5l5 6 5-6z" />
        </svg>
      </p>
    </a>
  );
});

function Menu() {
  return (
    <div className="d-flex border-start py-2">
      <Dropdown align="end">
        <Dropdown.Toggle as={MenuToggle} id="menu-aziende" />
        <Dropdown.Menu className="aziendeMenu dropdownCentrato">
          <div className="d-flex aziendeMenu-righe">
            <div className="aziendeMenu-col aziendeMenu-col--sx">
              <p className="aziendeMenu-titolo">Le mie app</p>

              {APP_GROUPS.map((gruppo, i) => (
                <div key={gruppo.titolo}>
                  {/* il primo gruppo usa gia' il titolo grande sopra */}
                  {i > 0 && (
                    <p className="aziendeMenu-sezione">{gruppo.titolo}</p>
                  )}
                  {gruppo.voci.map((voce) => (
                    <a key={voce.testo} href="#" className="aziendeMenu-app">
                      <i className={`bi ${voce.icona} aziendeMenu-icona`}></i>
                      <span>{voce.testo}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>

            <div className="aziendeMenu-col">
              <p className="aziendeMenu-titolo">Scopri altro per il business</p>

              {BUSINESS.map((voce) => (
                <a key={voce.testo} href="#" className="aziendeMenu-business">
                  <span className="aziendeMenu-business-testo">
                    {voce.testo}
                  </span>
                  <span className="aziendeMenu-business-sotto">
                    {voce.sotto}
                  </span>
                </a>
              ))}

              <hr className="aziendeMenu-hr" />

              <a href="#" className="aziendeMenu-crea">
                Crea una pagina aziendale <span>+</span>
              </a>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <Pubblicita />
    </div>
  );
}

export default Menu;
