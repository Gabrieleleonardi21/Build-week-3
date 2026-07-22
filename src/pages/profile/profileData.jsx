// Dati iniziali (finti) delle sezioni editabili della pagina Profilo.
// Coerenti con l'utente demo, nessun dato personale reale.

export const ANALYTICS = { profileViews: 7, postImpressions: 0, searchAppearances: 3 };

export const INITIAL_ABOUT =
  "Studente Full Stack AI Developer, appassionato di sviluppo web e intelligenza artificiale. " +
  "In questo periodo sto approfondendo React, Redux e Firebase costruendo progetti pratici in team.";

export const INITIAL_TOP_SKILLS = ["React", "JavaScript", "Firebase"];

export const INITIAL_FEATURED = [
  { kind: "Certification", title: "React - The Complete Guide", icon: "bi-patch-check" },
  { kind: "Certification", title: "JavaScript Algorithms and Data Structures", icon: "bi-patch-check" },
  { kind: "Project", title: "LinkedIn Clone", icon: "bi-code-slash" },
];

export const INITIAL_EXPERIENCE = [
  {
    role: "Full Stack AI Developer Student",
    company: "EPICODE Institute of Technology",
    period: "Apr 2026 - Ott 2026",
    location: "Remoto",
  },
];

export const INITIAL_EDUCATION = [
  {
    school: "EPICODE Institute of Technology",
    degree: "Full Stack AI Developer",
    period: "2026",
  },
];

export const INITIAL_PROJECTS = [
  {
    name: "LinkedIn Clone",
    period: "2026",
    description: "Clone di LinkedIn realizzato in team con React, Redux e Firebase.",
  },
];

export const INITIAL_SKILLS = ["React", "Redux", "JavaScript", "Firebase", "Bootstrap", "Git"];

export const INITIAL_COURSES = ["React - The Complete Guide", "JavaScript Algorithms and Data Structures"];

export const INITIAL_LANGUAGES = [
  { name: "Italiano", level: "Madrelingua o bilingue" },
  { name: "Inglese", level: "Conoscenza professionale" },
];

export const INITIAL_INTERESTS = [
  { name: "Frontend Weekly", followers: "120k follower" },
  { name: "React News", followers: "80k follower" },
];

export const INITIAL_CAUSES = ["Istruzione", "Scienza e tecnologia"];

// Configurazione dei campi per l'EntryListModal, una per ogni sezione a voci strutturate
export const ENTRY_SECTIONS = {
  experience: {
    title: "Esperienza",
    fields: [
      { key: "role", label: "Ruolo", placeholder: "es. Full Stack Developer", required: true },
      { key: "company", label: "Azienda", placeholder: "es. EPICODE", required: true },
      { key: "period", label: "Periodo", placeholder: "es. Gen 2026 - Giu 2026" },
      { key: "location", label: "Località", placeholder: "es. Remoto" },
    ],
    renderSummary: (e) => (
      <>
        <div className="fw-bold">{e.role}</div>
        <div className="text-muted">
          {e.company}
          {e.period ? ` · ${e.period}` : ""}
        </div>
      </>
    ),
  },
  education: {
    title: "Formazione",
    fields: [
      { key: "school", label: "Istituto", placeholder: "es. EPICODE Institute of Technology", required: true },
      { key: "degree", label: "Titolo di studio", placeholder: "es. Full Stack AI Developer" },
      { key: "period", label: "Periodo", placeholder: "es. 2026" },
    ],
    renderSummary: (e) => (
      <>
        <div className="fw-bold">{e.school}</div>
        <div className="text-muted">{e.degree}</div>
      </>
    ),
  },
  projects: {
    title: "Progetti",
    fields: [
      { key: "name", label: "Nome progetto", placeholder: "es. LinkedIn Clone", required: true },
      { key: "period", label: "Periodo", placeholder: "es. 2026" },
      { key: "description", label: "Descrizione", placeholder: "Di cosa si tratta?", as: "textarea" },
    ],
    renderSummary: (e) => (
      <>
        <div className="fw-bold">{e.name}</div>
        <div className="text-muted">{e.period}</div>
      </>
    ),
  },
  languages: {
    title: "Lingue",
    fields: [
      { key: "name", label: "Lingua", placeholder: "es. Francese", required: true },
      { key: "level", label: "Livello", placeholder: "es. Conoscenza elementare" },
    ],
    renderSummary: (e) => (
      <>
        <div className="fw-bold">{e.name}</div>
        <div className="text-muted">{e.level}</div>
      </>
    ),
  },
  interests: {
    title: "Interessi",
    fields: [
      { key: "name", label: "Nome", placeholder: "es. Frontend Weekly", required: true },
      { key: "followers", label: "Follower", placeholder: "es. 120k follower" },
    ],
    renderSummary: (e) => (
      <>
        <div className="fw-bold">{e.name}</div>
        <div className="text-muted">{e.followers}</div>
      </>
    ),
  },
  featured: {
    title: "In evidenza",
    fields: [
      { key: "kind", label: "Tipo", placeholder: "es. Certification" },
      { key: "title", label: "Titolo", placeholder: "es. React - The Complete Guide", required: true },
    ],
    renderSummary: (e) => (
      <>
        <div className="text-muted">{e.kind}</div>
        <div className="fw-bold">{e.title}</div>
      </>
    ),
  },
};

// Configurazione per il TagListModal (sezioni fatte di semplici elenchi di testo)
export const TAG_SECTIONS = {
  skills: { title: "Competenze", placeholder: "Aggiungi una competenza" },
  courses: { title: "Corsi", placeholder: "Aggiungi un corso" },
  causes: { title: "Cause", placeholder: "Aggiungi una causa" },
};

// Placeholder generici per la colonna laterale (nessun dato reale di terzi)
export const ASIDE_VIEWERS = [
  { role: "Full Stack Developer presso un'azienda tech" },
  { role: "Specialista Localizzazione e Lingue" },
  { role: "Addetto/a Operativo" },
  { role: "Assistenza Tecnica IT" },
];

export const ASIDE_PEOPLE = [
  { name: "Sara Colombo", role: "Career Advisor · Talent Acquisition" },
  { name: "Marco Bruno", role: "Full Stack Developer (Java/React)" },
];

export const ASIDE_PAGES = [
  { name: "Rete Sviluppatori Italia", category: "Associazione no profit", followers: "3.7k follower" },
  { name: "Global Energy Co.", category: "Utilities", followers: "1.5M follower" },
];
