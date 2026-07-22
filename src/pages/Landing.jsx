import { Link } from "react-router-dom";
import LandingFooter from "@/layout/LandingFooter";

// Landing page pubblica
const Landing = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <div
        className="d-flex justify-content-between align-items-center px-5 py-3 mx-auto w-100"
        style={{ maxWidth: "1200px" }}
      >
        <img
          src="/logo_esteso_LinkedIn.png"
          alt="Logo LinkedIn"
          className="logo-esteso"
        />

        {/* Voci della nav: per ora puntano tutte al feed (/home) */}
        <nav className="d-flex align-items-center gap-4">
          <Link
            to="/home"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-rocket-takeoff fs-4"></i>
            <span className="small">Top Content</span>
          </Link>
          <Link
            to="/home"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-people fs-4"></i>
            <span className="small">People</span>
          </Link>
          <Link
            to="/home"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-mortarboard fs-4"></i>
            <span className="small">Learning</span>
          </Link>
          <Link
            to="/home"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-briefcase fs-4"></i>
            <span className="small">Jobs</span>
          </Link>
          <Link
            to="/home"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-puzzle fs-4"></i>
            <span className="small">Games</span>
          </Link>
        </nav>

        <div className="vr" style={{ height: "32px" }}></div>

        <div className="d-flex gap-2">
          <Link
            to="/signup"
            className="btn btn-outline-primary rounded-pill px-3 join-btn"
          >
            Join now
          </Link>
          <Link
            to="/login"
            className="btn btn-primary rounded-pill px-3 signin-btn"
          >
            Sign in
          </Link>
        </div>
      </div>

      <section
        className="d-flex align-items-center px-5 py-5 mx-auto flex-grow-1 w-100"
        style={{ maxWidth: "1200px" }}
      >
        <div className="w-50" style={{ maxWidth: "500px" }}>
          <h1 className="display-5 fw-normal mb-4">
            Welcome to your professional community
          </h1>

          {/* Accesso rapido con Google: porta al feed */}
          <Link
            to="/home"
            className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 mb-3"
          >
            <span
              className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "24px", height: "24px" }}
            >
              <i className="bi bi-google text-primary"></i>
            </span>
            Continue with Google
          </Link>

          <Link
            to="/login"
            className="border rounded-4 d-flex align-items-center justify-content-between p-3 mb-4 text-decoration-none text-body"
          >
            <div className="d-flex align-items-center gap-2">
              <span
                className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="bi bi-person-fill text-muted"></i>
              </span>
              <p className="fw-bold m-0">Sign in with your credentials</p>
            </div>
            <i className="bi bi-envelope"></i>
          </Link>

          <p className="small text-muted mb-4">
            By clicking &ldquo;Continue&rdquo; to join or sign in, you agree to
            LinkedIn <a href="#">User Agreement</a>,{" "}
            <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
            LinkedIn is partially supported by advertising, which means we may
            use your data to show you sponsored content and ads that we believe
            may be of interest to you.
          </p>

          <p>
            New to LinkedIn?{" "}
            <Link to="/signup" className="fw-bold text-decoration-none">
              Join now
            </Link>
          </p>
        </div>

        <div className="w-50">
          <img
            src="/background image register.svg"
            alt="Illustrazione LinkedIn"
            className="img-fluid"
          />
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Landing;
