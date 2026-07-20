import { Card, Button } from "react-bootstrap"

function Banner({ userInitials = "EPI" }) {
  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex align-items-center gap-3">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-semibold"
          style={{ width: 48, height: 48, background: "#0a66c2" }}
        >
          {userInitials}
        </div>
        <div>
          <p className="mb-2 small">
            Sblocca il tuo pieno potenziale con LinkedIn Premium
          </p>
          <Button variant="outline-primary" size="sm">
            Prova gratis
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Banner
