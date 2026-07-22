import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "@/features/jobs/jobs.css";
import Sidebar from "@/features/feed/Sidebar";
import JobCard from "@/features/jobs/JobCard";
import SavedJobs from "@/features/jobs/SavedJobs";
import { fetchJobs } from "@/lib/jobs";
import { readSavedJobs, writeSavedJobs, toggleSavedJob } from "@/lib/savedJobs";

// Contenuto della rotta /lavoro: ricerca e lista di offerte dall'API Strive.
// Tre colonne: Sidebar profilo (sx), offerte (centro), offerte salvate (dx).
// Le colonne laterali sono sticky, così restano sempre visibili scorrendo.
// Header, Container e FooterNav arrivano dal Layout condiviso.
function Jobs() {
  const [query, setQuery] = useState(""); // testo digitato nel campo
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // offerte salvate: init lazy da localStorage (niente setState nell'effect)
  const [saved, setSaved] = useState(readSavedJobs);

  // Esegue la fetch e aggiorna i risultati. Il setState sta nelle callback
  // della promise (asincrono), quindi non innesca render sincroni nell'effect.
  function caricaOfferte(search) {
    fetchJobs({ search, limit: 20 })
      .then((data) => {
        setJobs(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  // Primo caricamento: offerte di default (loading parte già a true)
  useEffect(() => {
    caricaOfferte("");
  }, []);

  // Submit del form di ricerca: qui (handler evento) il setState sincrono è ok
  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    caricaOfferte(query);
  }

  // Salva/rimuove un'offerta e persiste subito su localStorage
  function handleToggleSave(job) {
    const aggiornate = toggleSavedJob(saved, job);
    setSaved(aggiornate);
    writeSavedJobs(aggiornate);
  }

  // Insieme degli id salvati: dice a ogni card se è già salvata
  const idSalvati = new Set(saved.map((s) => s._id));

  // Messaggio "nessun risultato" solo a caricamento finito e senza errori
  const nessunRisultato = !loading && !error && jobs.length === 0;

  return (
    <Row>
      <Col xs={12} md={4} lg={3}>
        <Sidebar />
      </Col>

      <Col xs={12} md={8} lg={6}>
        <h4 className="mb-3">Offerte di lavoro</h4>

        <form className="d-flex gap-2 mb-3" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Cerca per ruolo, tecnologia, azienda…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary rounded-pill px-4">
            Cerca
          </button>
        </form>

        {loading && (
          <p className="text-center text-muted">Caricamento offerte…</p>
        )}
        {error && <p className="text-center text-danger">{error}</p>}
        {nessunRisultato && (
          <p className="text-center text-muted">Nessuna offerta trovata.</p>
        )}

        {!loading &&
          !error &&
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              saved={idSalvati.has(job._id)}
              onToggleSave={handleToggleSave}
            />
          ))}
      </Col>

      <Col xs={12} md={12} lg={3}>
        <SavedJobs saved={saved} onRemove={handleToggleSave} />
      </Col>
    </Row>
  );
}

export default Jobs;
