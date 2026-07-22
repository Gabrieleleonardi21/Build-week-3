const footerLinks = [
  { label: "Informazioni" },
  { label: "Accessibilità" },
  { label: "Centro assistenza" },
  { label: "Privacy e condizioni" },
  { label: "Opzioni per gli annunci pubblicitari" },
  { label: "Pubblicità" },
  { label: "Servizi alle aziende" },
  { label: "Scarica l'app LinkedIn" },
  { label: "Altro" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-muted text-center px-2"
      style={{ fontSize: "12px" }}
    >
      <ul className="list-inline mb-2">
        {footerLinks.map((link) => (
          <li key={link.label} className="list-inline-item me-1 footer-link">
            {link.label}
          </li>
        ))}
      </ul>
      <p className="mb-0 d-flex align-items-center justify-content-center gap-1">
        <span className="footer-logo" aria-hidden="true">
          in
        </span>
        <span className="footer-brand">LinkedIn</span>
        <span>Corporation © {year}</span>
      </p>
    </footer>
  );
}

export default Footer;
