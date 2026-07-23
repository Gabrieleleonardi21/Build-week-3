// Persistenza delle offerte salvate in localStorage (dati locali dell'utente,
// come le esperienze del profilo). Salviamo solo i campi utili al pannello
// laterale, per non appesantire lo storage con le lunghe descrizioni HTML.
const KEY = "savedJobs";

// Legge l'elenco delle offerte salvate.
export function readSavedJobs() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

// Scrive l'elenco in localStorage.
export function writeSavedJobs(saved) {
  localStorage.setItem(KEY, JSON.stringify(saved));
}

// Aggiunge o rimuove un'offerta (in base all'_id) e restituisce il NUOVO elenco.
// Non scrive: la persistenza la decide chi chiama, dopo aver aggiornato lo stato.
export function toggleSavedJob(saved, job) {
  const giaSalvata = saved.some((s) => s._id === job._id);
  if (giaSalvata) return saved.filter((s) => s._id !== job._id);

  // versione compatta: solo ciò che serve a mostrare e ri-linkare l'offerta
  const compatta = {
    _id: job._id,
    title: job.title,
    company_name: job.company_name,
    candidate_required_location: job.candidate_required_location,
    url: job.url,
  };
  return [compatta, ...saved];
}
