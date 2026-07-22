// Livello dati della sezione Lavori (API pubblica Strive). Sola lettura.
// La descrizione arriva in HTML: la convertiamo sempre in testo semplice
// (mai innerHTML) per essere sicuri contro attacchi XSS.
const API = "https://strive-benchmark.herokuapp.com/api/jobs";

// Scarica le offerte. `search` filtra per parola chiave, `limit` limita i risultati.
export async function fetchJobs({ search = "", limit = 20 } = {}) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  params.set("limit", String(limit));

  const res = await fetch(`${API}?${params.toString()}`);
  if (!res.ok) throw new Error("Errore nel caricamento delle offerte");
  const body = await res.json();
  return body.data || [];
}

// HTML -> testo semplice senza innerHTML: DOMParser crea un documento inerte
// (non esegue script né carica risorse) e ne leggiamo solo il textContent.
export function htmlToText(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent.replace(/\s+/g, " ").trim();
}

// Accorcia un testo a `max` caratteri aggiungendo i puntini di sospensione.
export function excerpt(text, max = 220) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

// Etichette italiane per i tipi di contratto (fallback: valore grezzo).
const JOB_TYPES = {
  full_time: "Tempo pieno",
  part_time: "Part-time",
  contract: "Contratto",
  freelance: "Freelance",
  internship: "Tirocinio",
};
export function jobTypeLabel(type) {
  if (!type) return "Non specificato";
  return JOB_TYPES[type] || type.replace(/_/g, " ");
}

// Data di pubblicazione in formato leggibile italiano.
export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Consente solo URL http(s): scarta schemi pericolosi (es. javascript:).
export function safeUrl(url) {
  if (url && /^https?:\/\//i.test(url)) return url;
  return "";
}
