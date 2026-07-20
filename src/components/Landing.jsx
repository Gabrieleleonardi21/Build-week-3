import { Link } from "react-router-dom";

// Landing page pubblica
const Landing = () => {
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center px-5 py-3 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <img
          src="/logo_esteso_LinkedIn.png"
          alt="Logo LinkedIn"
          className="logo-esteso"
        />

        <nav className="d-flex align-items-center gap-4">
          <a
            href="#"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-rocket-takeoff fs-4"></i>
            <span className="small">Top Content</span>
          </a>
          <a
            href="#"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-people fs-4"></i>
            <span className="small">People</span>
          </a>
          <a
            href="#"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-mortarboard fs-4"></i>
            <span className="small">Learning</span>
          </a>
          <a
            href="#"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-briefcase fs-4"></i>
            <span className="small">Jobs</span>
          </a>
          <a
            href="#"
            className="d-flex flex-column align-items-center text-decoration-none text-body"
          >
            <i className="bi bi-puzzle fs-4"></i>
            <span className="small">Games</span>
          </a>
        </nav>

        <div className="vr" style={{ height: "32px" }}></div>

        <div className="d-flex gap-2">
          <Link
            to="/register"
            className="btn btn-outline-primary rounded-pill px-3 join-btn"
          >
            Join now
          </Link>
          <button className="btn btn-primary rounded-pill px-3 signin-btn">
            Sign in
          </button>
        </div>
      </div>

      <section
        className="d-flex align-items-center px-5 py-5 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <div className="w-50" style={{ maxWidth: "500px" }}>
          <h1 className="display-5 fw-normal mb-4">
            Welcome to your professional community
          </h1>

          <button className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 mb-3">
            <span
              className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "24px", height: "24px" }}
            >
              <i className="bi bi-google text-primary"></i>
            </span>
            Continue with Google
          </button>

          <div className="border rounded-4 d-flex align-items-center justify-content-between p-3 mb-4">
            <div className="d-flex align-items-center gap-2">
              <img
                src="/Logo.png"
                alt="Valentina"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <p className="fw-bold m-0">Sign in as Valentina</p>
                <p className="text-muted small m-0">v*****@hotmail.it</p>
              </div>
            </div>
            <i className="bi bi-envelope"></i>
          </div>

          <p className="small text-muted mb-4">
            By clicking &ldquo;Continue&rdquo; to join or sign in, you agree
            to LinkedIn <a href="#">User Agreement</a>,{" "}
            <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
            LinkedIn is partially supported by advertising, which means we
            may use your data to show you sponsored content and ads that we
            believe may be of interest to you.
          </p>

          <p>
            New to LinkedIn?{" "}
            <Link to="/register" className="fw-bold text-decoration-none">
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
    </>
  );
};

export default Landing;
