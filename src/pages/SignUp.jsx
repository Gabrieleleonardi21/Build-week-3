import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingFooter from "@/layout/LandingFooter";
import { useAuth, authErrorMessage } from "@/features/auth/auth-context";

// Effettiva pagina per la registrazione di un nuovo utente
const SignUp = () => {
  const navigate = useNavigate();
  const { signup, enabled } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Registrazione con Firebase Auth (email/password). Senza Firebase
  // configurato non c'è auth reale: si entra direttamente nel feed.
  async function handleSubmit(e) {
    e.preventDefault();
    if (!enabled) {
      navigate("/home");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await signup(email, password);
      navigate("/home");
    } catch (err) {
      setError(authErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f3f2ef" }}>
      <div className="px-5 py-4">
        <img
          src="/logo_esteso_LinkedIn.png"
          alt="Logo LinkedIn"
          className="logo-esteso"
        />
      </div>

      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <h1 className="fw-normal mb-4">Join LinkedIn now — it's free!</h1>

        <div className="bg-white rounded-3 shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="fw-bold small d-block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="fw-bold small d-block mb-1">
              Password
            </label>
            <div className="position-relative mb-3">
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                href="#"
                className="text-primary fw-bold small text-decoration-none"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Show
              </a>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
                defaultChecked
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>

            <p className="small text-muted text-center mb-3">
              By clicking &ldquo;Agree &amp; Join&rdquo; or
              &ldquo;Continue&rdquo;, you agree to the LinkedIn{" "}
              <a href="#" className="fw-bold">
                User Agreement
              </a>
              ,{" "}
              <a href="#" className="fw-bold">
                Privacy Policy
              </a>
              , and{" "}
              <a href="#" className="fw-bold">
                Cookie Policy
              </a>
              . LinkedIn is partially supported by advertising, which means we
              may use your data to show you sponsored content and ads that we
              believe may be of interest to you.
            </p>

            {error && <p className="text-danger small mb-2">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary rounded-pill w-100 py-2 fw-bold"
            >
              Agree &amp; Join
            </button>
          </form>

          <div className="d-flex align-items-center gap-2 my-3">
            <hr className="flex-grow-1" />
            <span className="small text-muted">or</span>
            <hr className="flex-grow-1" />
          </div>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="btn btn-outline-secondary rounded-pill w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-google"></i>
            Continue with Google
          </button>

          <p className="text-center mt-3 mb-0">
            Already on LinkedIn?{" "}
            <Link to="/login" className="fw-bold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center small mt-3 mb-4">
          Looking to create a page for a business?{" "}
          <a href="#" className="fw-bold">
            Get help
          </a>
        </p>
      </div>

      <LandingFooter />
    </div>
  );
};

export default SignUp;
