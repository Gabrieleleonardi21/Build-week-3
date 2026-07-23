import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "@/assets/css/DropdownUser.css";
import { useAuth } from "@/features/auth/auth-context";

// Placeholder usato finché l'utente non carica una foto propria dalla Sidebar
const AVATAR_PLACEHOLDER = "https://i.pravatar.cc/150?img=12";

// Stessa chiave usata dalla Sidebar quando salvi una nuova esperienza.
function leggiEsperienze() {
  const saved = localStorage.getItem("profileExperiences");
  if (saved) return JSON.parse(saved);
  return [];
}

// Toggle personalizzato: senza questo react-bootstrap applica le classi btn
// e non si riesce a impilare avatar + scritta come nelle altre icone.
const UserToggle = forwardRef(function UserToggle({ onClick }, ref) {
  const { avatar } = useAuth();
  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-3 d-flex flex-column align-items-center userToggle dropdown"
    >
      <img
        src={avatar || AVATAR_PLACEHOLDER}
        alt="foto profilo"
        className="icon rounded-circle"
      />
      <p className="p-0 m-0 d-flex align-items-center gap-1">
        Tu
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 5l5 6 5-6z" />
        </svg>
      </p>
    </a>
  );
});

function DropdownUser() {
  const navigate = useNavigate();
  // nome, cognome e foto profilo dell'utente loggato (impostati alla
  // registrazione / dalla Sidebar)
  const { logout, enabled, nomeCompleto, avatar } = useAuth();
  const nomeMostrato = nomeCompleto || "Utente";
  // stesse esperienze salvate dalla Sidebar: mostriamo il titolo dell'ultima
  const [experiences, setExperiences] = useState(leggiEsperienze);
  const ultimaEsperienza =
    experiences.length > 0 ? experiences[experiences.length - 1].titolo : "--";

  // Il menu si apre dopo che la Sidebar ha già scritto in localStorage,
  // quindi rileggiamo a ogni apertura per restare allineati.
  function handleToggle(isOpen) {
    if (isOpen) setExperiences(leggiEsperienze());
  }

  // Logout reale con Firebase Auth, poi torna alla Landing pubblica.
  // Se l'auth è disabilitata (Firebase non configurato) fa solo il redirect.
  async function handleLogout() {
    if (enabled) await logout();
    navigate("/");
  }

  return (
    <Dropdown align="end" onToggle={handleToggle}>
      <Dropdown.Toggle as={UserToggle} id="user-dropdown" />

      <Dropdown.Menu className="userMenu dropdownCentrato">
        <div className="px-3 pt-2 d-flex gap-2">
          <img
            src={avatar || AVATAR_PLACEHOLDER}
            alt="foto profilo"
            className="rounded-circle userMenu-avatar"
          />
          <div>
            <p className="userMenu-name m-0">{nomeMostrato}</p>
            <p className="userMenu-sub m-0">{ultimaEsperienza}</p>
          </div>
        </div>

        <div className="px-3 py-2 d-flex gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile");
            }}
            className="userMenu-btn userMenu-btn--outline"
          >
            Visualizza profilo
          </a>
          <a href="#" className="userMenu-btn userMenu-btn--fill">
            Verifica
          </a>
        </div>

        <p className="userMenu-title">Account</p>
        <Dropdown.Item href="#">Prova 1 mese di Premium per 0 €</Dropdown.Item>
        <Dropdown.Item href="#">Impostazioni e privacy</Dropdown.Item>
        <Dropdown.Item href="#">Guida</Dropdown.Item>
        <Dropdown.Item href="#">Lingua</Dropdown.Item>

        <Dropdown.Divider />

        <p className="userMenu-title">Gestisci</p>
        <Dropdown.Item href="#">Post e attività</Dropdown.Item>
        <Dropdown.Item href="#">
          Account per la pubblicazione di offerte di lavoro
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={handleLogout}>Esci</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUser;
