import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MESI = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const ANNO_CORRENTE = new Date().getFullYear();
const ANNI = Array.from({ length: 60 }, (_, i) => ANNO_CORRENTE - i);

export function ExperienceModal({
  show,
  onHide,
  onSave,
  onDelete,
  initialData,
}) {
  const [titolo, setTitolo] = useState("");
  const [azienda, setAzienda] = useState("");
  const [localita, setLocalita] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [meseInizio, setMeseInizio] = useState("");
  const [annoInizio, setAnnoInizio] = useState("");
  const [meseFine, setMeseFine] = useState("");
  const [annoFine, setAnnoFine] = useState("");
  const [attuale, setAttuale] = useState(false);

  // Sincronizza i campi del form quando il modale si apre o cambia l'elemento
  // da modificare: uso legittimo di un effect (sync con prop esterna), quindi
  // la regola set-state-in-effect (troppo severa qui) è disattivata.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (show) {
      if (initialData) {
        setTitolo(initialData.titolo || "");
        setAzienda(initialData.azienda || "");
        setLocalita(initialData.localita || "");
        setDescrizione(initialData.descrizione || "");
        setMeseInizio(initialData.meseInizio || "");
        setAnnoInizio(initialData.annoInizio || "");
        setMeseFine(initialData.meseFine || "");
        setAnnoFine(initialData.annoFine || "");
        setAttuale(initialData.attuale || false);
      } else {
        setTitolo("");
        setAzienda("");
        setLocalita("");
        setDescrizione("");
        setMeseInizio("");
        setAnnoInizio("");
        setMeseFine("");
        setAnnoFine("");
        setAttuale(false);
      }
    }
  }, [show, initialData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function handleSubmit() {
    if (!titolo.trim() || !azienda.trim()) return;
    onSave({
      titolo,
      azienda,
      localita,
      descrizione,
      meseInizio,
      annoInizio,
      meseFine: attuale ? "" : meseFine,
      annoFine: attuale ? "" : annoFine,
      attuale,
    });
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Modifica esperienza" : "Aggiungi esperienza"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Attualmente stai studiando? Allora compila il modulo sulla formazione.
        </p>
        <hr />
        <p className="small text-muted">* Indica che è obbligatorio</p>

        <Form.Group className="mb-3">
          <Form.Label>Titolo*</Form.Label>
          <Form.Control
            type="text"
            placeholder="es. Sviluppatrice Frontend"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Azienda o organizzazione*</Form.Label>
          <Form.Control
            type="text"
            placeholder="es. Epicode"
            value={azienda}
            onChange={(e) => setAzienda(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data di inizio</Form.Label>
          <div className="d-flex gap-2">
            <Form.Select
              value={meseInizio}
              onChange={(e) => setMeseInizio(e.target.value)}
            >
              <option value="">Mese</option>
              {MESI.map((mese) => (
                <option key={mese} value={mese}>
                  {mese}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={annoInizio}
              onChange={(e) => setAnnoInizio(e.target.value)}
            >
              <option value="">Anno</option>
              {ANNI.map((anno) => (
                <option key={anno} value={anno}>
                  {anno}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="esperienza-attuale"
            label="Lavoro attualmente in questo ruolo"
            checked={attuale}
            onChange={(e) => setAttuale(e.target.checked)}
          />
        </Form.Group>

        {!attuale && (
          <Form.Group className="mb-3">
            <Form.Label>Data di fine</Form.Label>
            <div className="d-flex gap-2">
              <Form.Select
                value={meseFine}
                onChange={(e) => setMeseFine(e.target.value)}
              >
                <option value="">Mese</option>
                {MESI.map((mese) => (
                  <option key={mese} value={mese}>
                    {mese}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                value={annoFine}
                onChange={(e) => setAnnoFine(e.target.value)}
              >
                <option value="">Anno</option>
                {ANNI.map((anno) => (
                  <option key={anno} value={anno}>
                    {anno}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Località</Form.Label>
          <Form.Control
            type="text"
            placeholder="es. Roma, Lazio, Italia"
            value={localita}
            onChange={(e) => setLocalita(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            maxLength={2000}
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          />
          <div className="text-end small text-muted">
            {descrizione.length}/2.000
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {initialData && (
          <Button
            variant="outline-danger"
            onClick={onDelete}
            className="me-auto"
          >
            Elimina
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function SavedItemsModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>I miei elementi</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5 className="text-start mb-2">Post salvati</h5>
        <Button variant="success" size="sm" className="rounded-pill mb-4">
          Tutto
        </Button>
        <div style={{ fontSize: "4rem" }}>📋</div>
        <h5 className="mt-3">Inizia a salvare post</h5>
        <p className="text-muted small">I post salvati appariranno qui</p>
        <Button
          variant="outline-primary"
          className="rounded-pill"
          onClick={onHide}
        >
          Vai al feed di LinkedIn
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function GroupsModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>I tuoi gruppi</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button variant="outline-primary" className="rounded-pill mb-4">
          Crea gruppo
        </Button>
        <div style={{ fontSize: "4rem" }}>🖥️</div>
        <h5 className="mt-3">Scopri i gruppi</h5>
        <p className="text-muted small">
          Trova altre community affidabili che condividono e supportano i tuoi
          obiettivi.
        </p>
        <Button variant="outline-primary" className="rounded-pill">
          Scopri
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export function NewsletterModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Newsletter</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="text-end mb-3">
          <Button variant="outline-primary" size="sm" className="rounded-pill">
            Crea newsletter
          </Button>
        </div>
        <div style={{ fontSize: "4rem" }}>📰</div>
        <h5 className="mt-3">Nessuna newsletter</h5>
        <p className="text-muted small">
          Al momento non ricevi o gestisci alcuna newsletter.
        </p>
      </Modal.Body>
    </Modal>
  );
}

export function EventsModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Eventi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="mb-3">I tuoi eventi</h6>
        <p className="text-muted small">Nessun evento al momento.</p>
        <hr />
        <h6 className="mb-3">In esclusiva per Premium</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <div
              style={{ height: "80px", background: "#333" }}
              className="rounded mb-2"
            ></div>
            <p className="small text-muted mb-1">gio, 23 lug 2026, 18:00</p>
            <p className="small fw-semibold">
              The 4-Week Career Reset: How to Stand Out
            </p>
          </div>
          <div className="col-md-4">
            <div
              style={{ height: "80px", background: "#333" }}
              className="rounded mb-2"
            ></div>
            <p className="small text-muted mb-1">mer, 29 lug 2026, 17:00</p>
            <p className="small fw-semibold">
              The 4-Week Career Reset: How to Network
            </p>
          </div>
          <div className="col-md-4">
            <div
              style={{ height: "80px", background: "#333" }}
              className="rounded mb-2"
            ></div>
            <p className="small text-muted mb-1">mer, 5 ago 2026, 17:00</p>
            <p className="small fw-semibold">
              The 4-Week Career Reset: How to Nail Your Interview
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
          <span className="small">Sblocca più di 50 eventi Premium</span>
        </div>
      </Modal.Body>
    </Modal>
  );
}
