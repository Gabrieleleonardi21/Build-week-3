import { useState } from "react";
import { Link } from "react-router-dom";
import LandingFooter from "@/layout/LandingFooter";
import { useAuth, authErrorMessage } from "@/features/auth/auth-context";

// Pagina "Password dimenticata": form email -> invio reale del link di reset
// via Firebase Auth (sendPasswordResetEmail), poi schermata di conferma.
// Per non rivelare se un'email è registrata (comportamento standard di
// sicurezza), l'errore "utente non trovato" mostra comunque la conferma,
// come se l'invio fosse andato a buon fine.
const ForgotPassword = () => {
  const { resetPassword, enabled } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!enabled) {
      setSent(true);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setSent(true);
      } else {
        setError(authErrorMessage(err.code));
      }
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
          {!sent ? (
            <>
              <h1 className="fw-bold mb-2">Forgot password</h1>
              <p className="text-muted mb-4">
                Enter your email and we&rsquo;ll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="d-block mb-1">
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

                {error && <p className="text-danger small mb-2">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary rounded-pill w-100 py-2 fw-bold mb-3"
                >
                  {submitting ? "Sending…" : "Reset password"}
                </button>

                <p className="text-center mb-0">
                  <Link
                    to="/login"
                    className="fw-bold text-decoration-none"
                  >
                    Back to sign in
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center">
              <i className="bi bi-envelope-check fs-1 text-primary"></i>
              <h1 className="fw-bold mt-3 mb-2">Check your email</h1>
              <p className="text-muted mb-4">
                If an account exists for <strong>{email}</strong>, we&rsquo;ve
                sent a link to reset your password. Follow the instructions in
                the email to choose a new one.
              </p>
              <Link
                to="/login"
                className="btn btn-outline-primary rounded-pill w-100 py-2 fw-bold"
              >
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};

export default ForgotPassword;
