const LandingFooter = () => {
  return (
    <footer className="border-top mt-auto">
      <div style={{ height: "20px" }} className="bg-light"></div>

      <div className="d-flex flex-wrap align-items-center gap-4 px-5 py-3">
        <span
          className="bg-dark text-white d-inline-flex align-items-center justify-content-center fw-bold rounded-1"
          style={{ width: "18px", height: "18px", fontSize: "12px" }}
        >
          in
        </span>
        <span className="fw-bold small">LinkedIn</span>
        <span className="small text-muted">© 2026</span>

        <a href="#" className="small text-muted text-decoration-none">
          About
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Accessibility
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          User Agreement
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Privacy Policy
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Cookie Policy
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Copyright Policy
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Brand Policy
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Guest Controls
        </a>
        <a href="#" className="small text-muted text-decoration-none">
          Community Guidelines
        </a>

        <span className="small text-muted d-inline-flex align-items-center gap-1">
          Language
          <i className="bi bi-chevron-down"></i>
        </span>
      </div>
    </footer>
  );
};

export default LandingFooter;
