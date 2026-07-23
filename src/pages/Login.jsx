import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingFooter from "@/layout/LandingFooter";
import { useAuth, authErrorMessage } from "@/features/auth/auth-context";
import { useGoogleLogin } from "@/features/auth/useGoogleLogin";

// Pagina di login
const Login = () => {
  const navigate = useNavigate();
  const { login, enabled } = useAuth();
  const { handleGoogle, error: googleError, loading: googleLoading } =
    useGoogleLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Accesso con Firebase Auth (email/password). Senza Firebase configurato
  // non c'è auth reale: si entra direttamente nel feed.
  async function handleSubmit(e) {
    e.preventDefault();
    if (!enabled) {
      navigate("/home");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(authErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f3f2ef" }}
    >
      <div className="px-5 py-4">
        <img
          src="/logo_esteso_LinkedIn.png"
          alt="Logo LinkedIn"
          className="logo-esteso"
        />
      </div>

      <div className="mx-auto flex-grow-1" style={{ maxWidth: "500px" }}>
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h1 className="fw-bold mb-3">Sign in</h1>

          <p className="mb-4">
            New to LinkedIn?{" "}
            <Link to="/signup" className="fw-bold text-decoration-none">
              Join now
            </Link>
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="btn btn-outline-secondary rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
          >
            <i className="bi bi-google"></i>
            Continue with Google
          </button>
          {googleError && (
            <p className="text-danger small mb-2">{googleError}</p>
          )}

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="btn btn-outline-secondary rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
          >
            <i className="bi bi-apple"></i>
            Sign in with Apple
          </button>

          <p className="small text-muted mb-3">
            By continuing, you agree to LinkedIn&rsquo;s{" "}
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
            .
          </p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <hr className="flex-grow-1" />
            <span className="small text-muted">or</span>
            <hr className="flex-grow-1" />
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="d-block mb-1">
              Email or phone
            </label>
            <input
              id="email"
              type="text"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="d-block mb-1">
              Password
            </label>
            <div className="position-relative mb-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                className="btn btn-link p-0 text-body"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <Link
              to="/forgot-password"
              className="fw-bold text-decoration-none small d-inline-block mb-3"
            >
              Forgot password?
            </Link>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="keepSignedIn"
                className="form-check-input"
                defaultChecked
              />
              <label htmlFor="keepSignedIn" className="form-check-label">
                Keep me signed in
              </label>
            </div>

            {error && <p className="text-danger small mb-2">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary rounded-pill w-100 py-2 fw-bold"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};

export default Login;
