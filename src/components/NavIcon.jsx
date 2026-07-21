import { Link, useLocation } from "react-router-dom";

// Voce di navigazione condivisa tra header, menu a tendina e footer.
// La voce attiva (quella la cui rotta combacia con l'URL corrente) prende
// il border-bottom nero tramite la classe iconAttiva.
function NavIcon({ to, src, alt, testo, classeTesto = "p-0 m-0" }) {
  const { pathname } = useLocation();
  const attiva = pathname === to;

  // niente ternari: la classe attiva si aggiunge solo se il path combacia
  const className = [
    "px-2 px-lg-3 d-flex flex-column align-items-center iconContainer",
    attiva && "iconAttiva",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={className}>
      <img src={src} alt={alt} className="icon" />
      <p className={classeTesto}>{testo}</p>
    </Link>
  );
}

export default NavIcon;
