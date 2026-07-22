import Card from "@/ui/Card";
import {
  htmlToText,
  excerpt,
  jobTypeLabel,
  formatDate,
  safeUrl,
} from "@/lib/jobs";

// Singola offerta di lavoro: intestazione (ruolo + azienda), badge tipo contratto,
// meta (località / categoria / data), estratto della descrizione in testo semplice,
// link all'annuncio originale (apertura sicura) e bottone Salva/Salvata.
function JobCard({ job, saved, onToggleSave }) {
  const descrizione = excerpt(htmlToText(job.description));
  const link = safeUrl(job.url);

  // Etichetta e icona del bottone Salva (niente ternari nel JSX)
  let labelSalva = "Salva";
  let iconaSalva = "bi-bookmark";
  if (saved) {
    labelSalva = "Salvata";
    iconaSalva = "bi-bookmark-fill";
  }
  const classeSalva = [
    "btn btn-sm rounded-pill job-save",
    saved && "job-save--active",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className="job-card p-3 mb-2">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div>
          <h6 className="job-title mb-1">{job.title}</h6>
          <p className="job-company mb-0">{job.company_name}</p>
        </div>
        <span className="job-type">{jobTypeLabel(job.job_type)}</span>
      </div>

      <div className="job-meta small text-muted my-2">
        {job.candidate_required_location && (
          <span>
            <i className="bi bi-geo-alt" /> {job.candidate_required_location}
          </span>
        )}
        {job.category && (
          <span>
            <i className="bi bi-tag" /> {job.category}
          </span>
        )}
        {job.publication_date && (
          <span>
            <i className="bi bi-calendar3" /> {formatDate(job.publication_date)}
          </span>
        )}
      </div>

      {descrizione && <p className="job-desc small mb-2">{descrizione}</p>}

      <div className="d-flex gap-2">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm rounded-pill"
          >
            Vedi offerta
          </a>
        )}
        <button
          type="button"
          className={classeSalva}
          onClick={() => onToggleSave(job)}
        >
          <i className={`bi ${iconaSalva}`} /> {labelSalva}
        </button>
      </div>
    </Card>
  );
}

export default JobCard;
