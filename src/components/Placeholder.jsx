import { Row, Col } from "react-bootstrap";

// Pagina segnaposto per le sezioni non ancora sviluppate (Rete, Lavoro, ...).
// Il titolo arriva dalla rotta, cosi' la stessa pagina serve tutte le sezioni.
function Placeholder({ titolo }) {
  return (
    <Row>
      <Col className="text-center text-muted py-5">
        <h4>{titolo}</h4>
        <p>Sezione in costruzione.</p>
      </Col>
    </Row>
  );
}

export default Placeholder;
