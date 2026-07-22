import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Modale generica per le azioni non ancora implementate (bottoni Open to,
// Add section, Enhance profile, Resources, Create a post, voci dell'aside...).
// Basta passare show/onHide/title: nessuna logica interna.
export function UnderConstructionModal({ show, onHide, title }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-5">
        <i className="bi bi-cone-striped fs-1 text-muted"></i>
        <p className="text-muted mt-3 mb-0">Pagina in costruzione.</p>
      </Modal.Body>
    </Modal>
  );
}

// Modale della sezione "About": un textarea per la bio + un elenco di tag
// per le top skills. Le due cose sono legate (stessa sezione), quindi le
// gestiamo in un'unica modale invece di riusare TagListModal a parte.
export function AboutModal({ show, onHide, about, topSkills, onSave }) {
  // Stato "di lavoro" interno alla modale: si parte da una copia dei dati
  // correnti e si scrive nel profilo vero solo al click su "Salva"
  // (così "Annulla"/chiudi non lascia modifiche a metà).
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // Ogni volta che la modale si apre, ricarica i dati attuali del profilo
  // nello stato locale (altrimenti riaprendola si vedrebbe l'ultima bozza
  // non salvata invece dei dati reali).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (show) {
      setBio(about);
      setSkills(topSkills);
      setSkillInput("");
    }
  }, [show, about, topSkills]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Aggiunge la skill scritta nell'input all'elenco (niente duplicati/vuoti)
  function addSkill() {
    const v = skillInput.trim();
    if (!v || skills.includes(v)) return;
    setSkills((s) => [...s, v]);
    setSkillInput("");
  }

  // Comunica i nuovi dati al genitore (che li salva nello stato della pagina)
  // e chiude la modale
  function handleSave() {
    onSave({ about: bio, topSkills: skills });
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Informazioni</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>

        <Form.Label className="small fw-bold">Top skills</Form.Label>
        {/* Ogni skill è un badge con una x per rimuoverla al volo */}
        <div className="d-flex flex-wrap gap-2 mb-2">
          {skills.map((s) => (
            <span
              key={s}
              className="badge rounded-pill text-dark border fw-normal px-3 py-2 d-inline-flex align-items-center gap-2"
            >
              {s}
              <button
                type="button"
                className="btn-close"
                style={{ fontSize: "0.55rem" }}
                aria-label={`Rimuovi ${s}`}
                onClick={() => setSkills((sk) => sk.filter((x) => x !== s))}
              ></button>
            </span>
          ))}
          {skills.length === 0 && <span className="text-muted small">Nessuna skill</span>}
        </div>
        <div className="d-flex gap-2">
          <Form.Control
            placeholder="Aggiungi una skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            // Invio = stesso effetto del bottone "Aggiungi", per non dover
            // sempre staccare le mani dalla tastiera
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button variant="outline-primary" onClick={addSkill}>
            Aggiungi
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modale riutilizzabile per le sezioni fatte di semplici elenchi di testo
// (Skills, Courses, Causes): stesso identico comportamento per tutte e tre,
// cambia solo titolo/placeholder/dati passati dal genitore.
export function TagListModal({ show, onHide, title, items, placeholder, onSave }) {
  const [draft, setDraft] = useState([]); // copia locale modificabile della lista
  const [input, setInput] = useState("");

  // Sincronizza la bozza con i dati reali ogni volta che la modale si apre
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (show) {
      setDraft(items);
      setInput("");
    }
  }, [show, items]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function addItem() {
    const v = input.trim();
    if (!v || draft.includes(v)) return; // niente vuoti o doppioni
    setDraft((d) => [...d, v]);
    setInput("");
  }

  function handleSave() {
    onSave(draft);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {draft.map((it) => (
            <span
              key={it}
              className="badge rounded-pill text-dark border fw-normal px-3 py-2 d-inline-flex align-items-center gap-2"
            >
              {it}
              <button
                type="button"
                className="btn-close"
                style={{ fontSize: "0.55rem" }}
                aria-label={`Rimuovi ${it}`}
                onClick={() => setDraft((d) => d.filter((x) => x !== it))}
              ></button>
            </span>
          ))}
          {draft.length === 0 && <span className="text-muted small">Nessun elemento</span>}
        </div>
        <div className="d-flex gap-2">
          <Form.Control
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
          />
          <Button variant="outline-primary" onClick={addItem}>
            Aggiungi
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modale riutilizzabile per le sezioni fatte di voci strutturate con più
// campi (Experience, Education, Projects, Languages, Interests, Featured).
// `fields` descrive il form (chiave, etichetta, placeholder, obbligatorio,
// tipo di input) e `renderSummary` disegna l'anteprima di ogni voce salvata:
// così la stessa modale serve a sei sezioni diverse senza duplicare codice.
export function EntryListModal({ show, onHide, title, fields, items, renderSummary, onSave }) {
  const [draft, setDraft] = useState([]); // copia locale modificabile dell'elenco voci
  const [form, setForm] = useState({}); // valori del form "nuova voce / voce in modifica"
  const [editingIndex, setEditingIndex] = useState(null); // null = sto aggiungendo, altrimenti indice in modifica

  // Ricarica bozza e form ogni volta che la modale si apre
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (show) {
      setDraft(items);
      setForm({});
      setEditingIndex(null);
    }
  }, [show, items]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Svuota il form e torna in modalità "aggiungi nuova voce"
  function startNew() {
    setForm({});
    setEditingIndex(null);
  }

  // Carica una voce esistente nel form per modificarla
  function startEdit(i) {
    setForm(draft[i]);
    setEditingIndex(i);
  }

  function removeEntry(i) {
    setDraft((d) => d.filter((_, idx) => idx !== i));
    if (editingIndex === i) startNew(); // se stavo modificando quella appena eliminata, resetto il form
  }

  // Aggiunge una nuova voce oppure aggiorna quella in modifica, poi torna
  // in modalità "nuova voce" così si può continuarne ad aggiungere altre
  // prima di chiudere la modale con "Salva"
  function submitForm() {
    const ok = fields.every((f) => !f.required || (form[f.key] || "").trim());
    if (!ok) return;
    if (editingIndex === null) {
      setDraft((d) => [...d, form]);
    } else {
      setDraft((d) => d.map((it, idx) => (idx === editingIndex ? form : it)));
    }
    startNew();
  }

  function handleSave() {
    onSave(draft);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered scrollable size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Elenco delle voci già presenti, con matita (modifica) e cestino (elimina) */}
        {draft.length > 0 && (
          <div className="mb-3">
            {draft.map((it, i) => (
              <div
                key={`${i}-${it[fields[0].key]}`}
                className="d-flex justify-content-between align-items-start border-bottom py-2"
              >
                <div className="small">{renderSummary(it)}</div>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0"
                    onClick={() => startEdit(i)}
                    aria-label="Modifica"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-danger"
                    onClick={() => removeEntry(i)}
                    aria-label="Elimina"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form per aggiungere una voce nuova o, se editingIndex è impostato, modificarne una esistente */}
        <p className="fw-bold small mb-2">
          {editingIndex === null ? "Aggiungi nuovo" : "Modifica voce"}
        </p>
        {fields.map((f) => (
          <Form.Group className="mb-2" key={f.key}>
            <Form.Label className="small">
              {f.label}
              {f.required && "*"}
            </Form.Label>
            <Form.Control
              as={f.as || "input"}
              rows={f.as === "textarea" ? 3 : undefined}
              value={form[f.key] || ""}
              placeholder={f.placeholder}
              onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
            />
          </Form.Group>
        ))}
        <Button variant="outline-primary" size="sm" onClick={submitForm}>
          {editingIndex === null ? "Aggiungi alla lista" : "Aggiorna voce"}
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
