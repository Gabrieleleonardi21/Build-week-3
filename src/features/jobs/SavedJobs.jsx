import Card from "@/ui/Card";
import { safeUrl } from "@/lib/jobs";

// Pannello laterale con le offerte salvate (persistite in localStorage).
// Sticky (classe sidebar-fixed): resta sempre visibile scorrendo la lista.
function SavedJobs({ saved, onRemove }) {
  return (
    <Card className="saved-jobs sidebar-fixed p-3">
      <h6 className="mb-3">
        <i className="bi bi-bookmark-fill text-primary" /> Offerte salvate
      </h6>

      {saved.length === 0 && (
        <p className="small text-muted mb-0">
          Nessuna offerta salvata. Usa “Salva” per tenerle qui.
        </p>
      )}

      {saved.map((job) => (
        <div key={job._id} className="saved-job border-top pt-2 mt-2">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <div>
              {safeUrl(job.url) && (
                <a
                  href={safeUrl(job.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saved-job-title"
                >
                  {job.title}
                </a>
              )}
              {!safeUrl(job.url) && (
                <span className="saved-job-title">{job.title}</span>
              )}
              <p className="small text-muted mb-0">{job.company_name}</p>
            </div>
            <button
              type="button"
              className="saved-job-remove"
              aria-label="Rimuovi offerta salvata"
              onClick={() => onRemove(job)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default SavedJobs;
