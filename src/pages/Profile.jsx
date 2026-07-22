import { Container } from "react-bootstrap";
import Header from "@/layout/Header";
import FooterNav from "@/layout/FooterNav";
import Card from "@/ui/Card";
import ProfileImage from "@/ui/ProfileImage";
import { getCurrentUser } from "@/lib/api";

// Dati finti aggiuntivi, solo per questa pagina (non condivisi col resto dell'app)
const EXTRA = {
  verified: true,
  connections: 227,
  openTo: "Open to",
};

// Contenuti finti delle sezioni sotto la card principale, coerenti con
// l'utente demo (nessun dato personale reale).
const ANALYTICS = { profileViews: 7, postImpressions: 0, searchAppearances: 3 };

const ABOUT =
  "Studente Full Stack AI Developer, appassionato di sviluppo web e intelligenza artificiale. " +
  "In questo periodo sto approfondendo React, Redux e Firebase costruendo progetti pratici in team.";

const TOP_SKILLS = ["React", "JavaScript", "Firebase"];

const FEATURED = [
  { kind: "Certification", title: "React - The Complete Guide", icon: "bi-patch-check" },
  { kind: "Certification", title: "JavaScript Algorithms and Data Structures", icon: "bi-patch-check" },
  { kind: "Project", title: "LinkedIn Clone", icon: "bi-code-slash" },
];

const EXPERIENCE = [
  {
    company: "EPICODE Institute of Technology",
    role: "Full Stack AI Developer Student",
    period: "Apr 2026 - Ott 2026",
    location: "Remoto",
  },
];

const EDUCATION = [
  {
    school: "EPICODE Institute of Technology",
    degree: "Full Stack AI Developer",
    period: "2026",
  },
];

const PROJECTS = [
  {
    name: "LinkedIn Clone",
    period: "2026",
    description: "Clone di LinkedIn realizzato in team con React, Redux e Firebase.",
  },
];

const SKILLS = ["React", "Redux", "JavaScript", "Firebase", "Bootstrap", "Git"];

const COURSES = ["React - The Complete Guide", "JavaScript Algorithms and Data Structures"];

const LANGUAGES = [
  { name: "Italiano", level: "Madrelingua o bilingue" },
  { name: "Inglese", level: "Conoscenza professionale" },
];

const INTERESTS = [
  { name: "Frontend Weekly", followers: "120k follower" },
  { name: "React News", followers: "80k follower" },
];

const CAUSES = ["Istruzione", "Scienza e tecnologia"];

// Intestazione riutilizzata da ogni sezione: titolo + icona matita decorativa
function SectionHeader({ title }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="h5 fw-bold mb-0">{title}</h2>
      <button type="button" className="btn btn-link p-0 text-body">
        <i className="bi bi-pencil"></i>
      </button>
    </div>
  );
}

// Pagina profilo utente completa (diversa da ProfileCard, che è solo il
// riepilogo nella colonna laterale del feed)
function Profile() {
  const u = getCurrentUser();

  return (
    <>
      <Header />
      <Container className="mt-3 mb-4" style={{ maxWidth: "700px" }}>
        <Card className="mb-3">
          <div
            className="position-relative"
            style={{
              height: "160px",
              background: "linear-gradient(135deg, #a3c6e8, #dce6f0)",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle position-absolute"
              style={{ top: "12px", right: "12px" }}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>

          <div className="px-3 pb-3">
            <div
              className="position-relative d-inline-block"
              style={{ marginTop: "-48px" }}
            >
              <ProfileImage src={u.avatar} alt={u.name} size={120} />
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle position-absolute"
                style={{ bottom: "4px", right: "4px" }}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>

            <h1 className="h4 fw-bold mb-1 mt-2 d-flex align-items-center gap-2">
              {u.name}
              {EXTRA.verified && (
                <i className="bi bi-patch-check-fill text-secondary fs-6"></i>
              )}
            </h1>
            <p className="mb-1">{u.headline}</p>
            <p className="text-muted small mb-1">
              {u.location} ·{" "}
              <a href="#" className="fw-bold">
                Contact info
              </a>
            </p>
            <a href="#" className="fw-bold small d-inline-block mb-3">
              {EXTRA.connections} connections
            </a>

            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-primary rounded-pill fw-bold">
                {EXTRA.openTo}
              </button>
              <button className="btn btn-outline-primary rounded-pill fw-bold">
                Add section
              </button>
              <button className="btn btn-outline-secondary rounded-pill">
                Enhance profile
              </button>
              <button className="btn btn-outline-secondary rounded-pill">
                Resources
              </button>
            </div>
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <h2 className="h5 fw-bold mb-1">Analytics</h2>
          <p className="text-muted small mb-3">
            <i className="bi bi-eye me-1"></i>Private to you
          </p>
          <div className="d-flex flex-wrap gap-4">
            <div className="d-flex align-items-start gap-2">
              <i className="bi bi-people-fill fs-5 mt-1"></i>
              <div>
                <div className="fw-bold">{ANALYTICS.profileViews} profile views</div>
                <div className="small text-muted">Discover who's viewed your profile.</div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2">
              <i className="bi bi-bar-chart-fill fs-5 mt-1"></i>
              <div>
                <div className="fw-bold">{ANALYTICS.postImpressions} post impressions</div>
                <div className="small text-muted">Start a post to increase engagement.</div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-2">
              <i className="bi bi-search fs-5 mt-1"></i>
              <div>
                <div className="fw-bold">{ANALYTICS.searchAppearances} search appearances</div>
                <div className="small text-muted">See how often you appear in search results.</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="About" />
          <p className="mb-3">{ABOUT}</p>
          <div className="border rounded-3 p-3">
            <div className="fw-bold small mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-gem"></i>Top skills
            </div>
            <div className="small">{TOP_SKILLS.join(" · ")}</div>
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Featured" />
          <div className="d-flex flex-wrap gap-3">
            {FEATURED.map((f) => (
              <div key={f.title} className="border rounded-3 p-3 flex-fill" style={{ minWidth: "160px" }}>
                <div className="small text-muted mb-2">{f.kind}</div>
                <i className={`bi ${f.icon} fs-3`}></i>
                <div className="fw-bold small mt-2">{f.title}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2 className="h5 fw-bold mb-0">Activity</h2>
            <button className="btn btn-outline-primary rounded-pill btn-sm">Create a post</button>
          </div>
          <p className="text-muted small mb-3">0 followers</p>
          <p className="text-muted small mb-0">Ancora nessun post pubblicato.</p>
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Experience" />
          {EXPERIENCE.map((e) => (
            <div key={e.company} className="d-flex gap-3">
              <i className="bi bi-building fs-4"></i>
              <div>
                <div className="fw-bold">{e.role}</div>
                <div className="small">{e.company}</div>
                <div className="small text-muted">
                  {e.period} · {e.location}
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Education" />
          {EDUCATION.map((ed) => (
            <div key={ed.school} className="d-flex gap-3">
              <i className="bi bi-mortarboard fs-4"></i>
              <div>
                <div className="fw-bold">{ed.school}</div>
                <div className="small">{ed.degree}</div>
                <div className="small text-muted">{ed.period}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Projects" />
          {PROJECTS.map((p) => (
            <div key={p.name} className="mb-2">
              <div className="fw-bold">{p.name}</div>
              <div className="small text-muted mb-1">{p.period}</div>
              <div className="small">{p.description}</div>
            </div>
          ))}
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title={`Skills (${SKILLS.length})`} />
          <div className="d-flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="badge rounded-pill text-dark border fw-normal px-3 py-2">
                {s}
              </span>
            ))}
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title={`Courses (${COURSES.length})`} />
          {COURSES.map((c, i) => (
            <div key={c} className={i < COURSES.length - 1 ? "border-bottom pb-2 mb-2" : ""}>
              {c}
            </div>
          ))}
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title={`Languages (${LANGUAGES.length})`} />
          {LANGUAGES.map((l, i) => (
            <div key={l.name} className={i < LANGUAGES.length - 1 ? "border-bottom pb-2 mb-2" : ""}>
              <div className="fw-bold">{l.name}</div>
              <div className="small text-muted">{l.level}</div>
            </div>
          ))}
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Interests" />
          <div className="d-flex flex-wrap gap-3">
            {INTERESTS.map((it) => (
              <div key={it.name} className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle fs-2 text-muted"></i>
                <div>
                  <div className="fw-bold small">{it.name}</div>
                  <div className="small text-muted">{it.followers}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-3 p-3">
          <SectionHeader title="Causes" />
          <div className="d-flex flex-wrap gap-2">
            {CAUSES.map((c) => (
              <span key={c} className="badge rounded-pill text-dark border fw-normal px-3 py-2">
                {c}
              </span>
            ))}
          </div>
        </Card>
      </Container>
      <FooterNav />
    </>
  );
}

export default Profile;
