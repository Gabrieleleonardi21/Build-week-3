import { Container } from "react-bootstrap";
import Header from "@/layout/Header";
import FooterNav from "@/layout/FooterNav";
import Card from "@/ui/Card";
import ProfileImage from "@/ui/ProfileImage";
import { getCurrentUser } from "@/lib/api";

// Dati finti aggiuntivi, solo per questa pagina (non condivisi col resto dell'app)
const EXTRA = {
  verified: true,
  connections: 227,
  openTo: "Open to",
};

// Pagina profilo utente completa (diversa da ProfileCard, che è solo il
// riepilogo nella colonna laterale del feed)
function Profile() {
  const u = getCurrentUser();

  return (
    <>
      <Header />
      <Container className="mt-3" style={{ maxWidth: "700px" }}>
        <Card className="mb-3">
          <div
            className="position-relative"
            style={{
              height: "160px",
              background: "linear-gradient(135deg, #a3c6e8, #dce6f0)",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle position-absolute"
              style={{ top: "12px", right: "12px" }}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>

          <div className="px-3 pb-3">
            <div
              className="position-relative d-inline-block"
              style={{ marginTop: "-48px" }}
            >
              <ProfileImage src={u.avatar} alt={u.name} size={120} />
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle position-absolute"
                style={{ bottom: "4px", right: "4px" }}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>

            <h1 className="h4 fw-bold mb-1 mt-2 d-flex align-items-center gap-2">
              {u.name}
              {EXTRA.verified && (
                <i className="bi bi-patch-check-fill text-secondary fs-6"></i>
              )}
            </h1>
            <p className="mb-1">{u.headline}</p>
            <p className="text-muted small mb-1">
              {u.location} ·{" "}
              <a href="#" className="fw-bold">
                Contact info
              </a>
            </p>
            <a href="#" className="fw-bold small d-inline-block mb-3">
              {EXTRA.connections} connections
            </a>

            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-primary rounded-pill fw-bold">
                {EXTRA.openTo}
              </button>
              <button className="btn btn-outline-primary rounded-pill fw-bold">
                Add section
              </button>
              <button className="btn btn-outline-secondary rounded-pill">
                Enhance profile
              </button>
              <button className="btn btn-outline-secondary rounded-pill">
                Resources
              </button>
            </div>
          </div>
        </Card>
      </Container>
      <FooterNav />
    </>
  );
}

export default Profile;
