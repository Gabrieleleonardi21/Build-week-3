import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../assets/css/DropdownUser.css";

const AVATAR = "https://i.pravatar.cc/150?img=12";

// Toggle personalizzato: senza questo react-bootstrap applica le classi btn
// e non si riesce a impilare avatar + scritta come nelle altre icone.
const UserToggle = forwardRef(function UserToggle({ onClick }, ref) {
  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-3 d-flex flex-column align-items-center userToggle"
    >
      <img src={AVATAR} alt="foto profilo" className="icon rounded-circle" />
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
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={UserToggle} id="user-dropdown" />

      <Dropdown.Menu className="userMenu">
        <div className="px-3 pt-2 d-flex gap-2">
          <img
            src={AVATAR}
            alt="foto profilo"
            className="rounded-circle userMenu-avatar"
          />
          <div>
            <p className="userMenu-name m-0">simone pierantozzi</p>
            <p className="userMenu-sub m-0">--</p>
          </div>
        </div>

        <div className="px-3 py-2 d-flex gap-2">
          <a href="#" className="userMenu-btn userMenu-btn--outline">
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

        <Dropdown.Item href="#">Esci</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUser;
