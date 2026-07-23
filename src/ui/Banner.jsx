import { Card, Button } from "react-bootstrap";
import ProfileImage from "@/ui/ProfileImage";
import { useAuth } from "@/features/auth/auth-context";

function Banner({ userInitials = "EPI" }) {
  const { avatar, nomeCompleto } = useAuth();
  const nomeMostrato = nomeCompleto || "Utente";

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="small text-muted">Annuncio</span>
          <i className="bi bi-three-dots text-muted"></i>
        </div>

        <p className="small text-center text-muted mb-3">
          {nomeMostrato}, sblocca il tuo pieno potenziale con LinkedIn Premium
        </p>

        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          {avatar ? (
            <ProfileImage src={avatar} alt="Foto profilo" size={96} />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-semibold"
              style={{ width: 96, height: 96, background: "#0a66c2", fontSize: "1.5rem" }}
            >
              {userInitials}
            </div>
          )}
          <span className="badge text-bg-warning d-inline-flex align-items-center gap-1 px-2 py-1">
            <i className="bi bi-bookmark-fill"></i> Premium
          </span>
        </div>

        <p className="text-center fw-semibold mb-3">
          Scopri chi ha visualizzato il tuo profilo negli ultimi 365 giorni
        </p>

        <div className="text-center">
          <Button variant="outline-primary" className="rounded-pill px-4">
            Prova gratis
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Banner;
