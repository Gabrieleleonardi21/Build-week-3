import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/layout/Header";
import FooterNav from "@/layout/FooterNav";
import Card from "@/ui/Card";
import ProfileImage from "@/ui/ProfileImage";
import { getCurrentUser, processImage, subscribeFeed } from "@/lib/api";
import { timeAgo } from "@/lib/data";
import ProfileAside from "./profile/ProfileAside";
import {
  UnderConstructionModal,
  AboutModal,
  TagListModal,
  EntryListModal,
} from "./profile/ProfileModals";
import {
  ANALYTICS,
  INITIAL_ABOUT,
  INITIAL_TOP_SKILLS,
  INITIAL_FEATURED,
  INITIAL_EXPERIENCE,
  INITIAL_EDUCATION,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_COURSES,
  INITIAL_LANGUAGES,
  INITIAL_INTERESTS,
  INITIAL_CAUSES,
  ENTRY_SECTIONS,
  TAG_SECTIONS,
} from "./profile/profileData";
import { PROFILE_TRANSLATIONS } from "./profile/translations";

// Dati finti aggiuntivi, solo per questa pagina (non condivisi col resto dell'app)
const EXTRA = {
  verified: true,
  connections: 227,
};

// Intestazione riutilizzata da ogni sezione: titolo + matita che apre la
// modale di modifica passata da chi usa il componente (onEdit)
function SectionHeader({ title, onEdit }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="h5 fw-bold mb-0">{title}</h2>
      <button
        type="button"
        className="btn btn-light btn-sm rounded-circle"
        onClick={onEdit}
        aria-label={`Modifica ${title}`}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
    </div>
  );
}

// Pagina profilo utente completa (diversa da ProfileCard, che è solo il
// riepilogo nella colonna laterale del feed).
//
// Tutti i contenuti delle sezioni (Experience, Skills, ecc.) vivono in
// questo componente come stato React locale: non c'è un backend dedicato al
// profilo, quindi le modifiche sono valide solo per la sessione corrente e
// si perdono al reload — è la stessa logica "demo" già usata per i dati
// hardcoded che sostituiscono.
function Profile() {
  const u = getCurrentUser();

  // Lingua dell'interfaccia della pagina Profilo, pilotata dal toggle
  // "Profile language" nell'aside (vedi ProfileAside). Vive qui perché serve
  // sia al contenuto principale sia all'aside stesso.
  const [language, setLanguage] = useState("English");
  const t = PROFILE_TRANSLATIONS[language];

  // Immagine profilo e copertina: partono dall'utente corrente e possono
  // essere sostituite dall'utente tramite i due input file nascosti sotto.
  const [avatar, setAvatar] = useState(u.avatar);
  const [banner, setBanner] = useState("");
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Contenuti editabili delle sezioni, uno stato per sezione
  const [about, setAbout] = useState(INITIAL_ABOUT);
  const [topSkills, setTopSkills] = useState(INITIAL_TOP_SKILLS);
  const [featured, setFeatured] = useState(INITIAL_FEATURED);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [education, setEducation] = useState(INITIAL_EDUCATION);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [languages, setLanguages] = useState(INITIAL_LANGUAGES);
  const [interests, setInterests] = useState(INITIAL_INTERESTS);
  const [causes, setCauses] = useState(INITIAL_CAUSES);

  // Feed reale (stesso Realtime Database letto dalla Home): serve solo per
  // ricavare "la tua" attività (post pubblicati, mi piace messi, commenti
  // scritti). Ci si iscrive in sola lettura, nessuna scrittura da qui.
  const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = subscribeFeed(setFeedPosts);
    return () => unsubscribe();
  }, []);

  const myPosts = feedPosts.filter((p) => p.author.name === u.name);
  const likedPosts = feedPosts.filter((p) => p.likedByMe);
  const myComments = feedPosts.flatMap((p) =>
    p.comments
      .filter((c) => c.author.name === u.name)
      .map((c) => ({ ...c, post: p }))
  );
  // Non c'è modo di sapere "chi" ha condiviso un post (sharePost salva solo
  // un contatore globale, non un elenco per utente): qui sommiamo le
  // condivisioni ricevute sui post che hai pubblicato tu, non quelle fatte da te.
  const sharesReceived = myPosts.reduce((sum, p) => sum + (p.shares || 0), 0);
  // Post pubblicati + commenti scritti, in un'unica timeline in ordine
  // cronologico inverso (i like non hanno un timestamp per utente nel DB,
  // quindi restano fuori da questa lista ed elencati a parte).
  const activityTimeline = [
    ...myPosts.map((p) => ({ type: "post", createdAt: p.createdAt, post: p })),
    ...myComments.map((c) => ({ type: "comment", createdAt: c.createdAt, comment: c })),
  ].sort((a, b) => b.createdAt - a.createdAt);

  // Quale modale è aperta in questo momento. Invece di un booleano show per
  // ciascuna delle tante modali, si tiene una sola variabile per tipo, che
  // contiene "cosa" mostrare (il titolo, o la chiave della sezione) oppure
  // null se quella modale è chiusa.
  const [constructionTitle, setConstructionTitle] = useState(null); // stringa = titolo mostrato, null = chiusa
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [tagModalKey, setTagModalKey] = useState(null); // "skills" | "courses" | "causes" | null
  const [entryModalKey, setEntryModalKey] = useState(null); // una chiave di ENTRY_SECTIONS oppure null

  // Dizionari {chiave sezione -> valore attuale / setter}, usati per passare
  // alla singola EntryListModal/TagListModal i dati giusti in base a quale
  // sezione è stata aperta (vedi entryModalKey/tagModalKey sopra)
  const entryData = { experience, education, projects, languages, interests, featured };
  const entrySetters = {
    experience: setExperience,
    education: setEducation,
    projects: setProjects,
    languages: setLanguages,
    interests: setInterests,
    featured: setFeatured,
  };
  const tagData = { skills, courses, causes };
  const tagSetters = { skills: setSkills, courses: setCourses, causes: setCauses };

  // Valida, ridimensiona e converte il file scelto in un data URL (stessa
  // funzione usata per le immagini dei post), poi aggiorna lo stato locale
  async function handleImageChange(e, setter) {
    const file = e.target.files[0];
    e.target.value = ""; // permette di riselezionare lo stesso file una seconda volta
    if (!file) return;
    try {
      setter(await processImage(file));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Header />
      <Container className="mt-3 mb-4" style={{ maxWidth: "1128px" }}>
        <Row className="g-3">
          <Col lg={8}>
            <Card className="mb-3">
              <div
                className="position-relative"
                style={{
                  height: "160px",
                  background: banner
                    ? `url(${banner}) center/cover no-repeat`
                    : "linear-gradient(135deg, #a3c6e8, #dce6f0)",
                  borderRadius: "8px 8px 0 0",
                }}
              >
                <button
                  type="button"
                  className="btn btn-light btn-sm rounded-circle position-absolute"
                  style={{ top: "12px", right: "12px" }}
                  onClick={() => bannerInputRef.current.click()}
                  aria-label="Cambia immagine di copertina"
                >
                  <i className="bi bi-camera-fill"></i>
                </button>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={(e) => handleImageChange(e, setBanner)}
                />
              </div>

              <div className="px-3 pb-3">
                <div
                  className="position-relative d-inline-block"
                  style={{ marginTop: "-48px" }}
                >
                  <ProfileImage src={avatar} alt={u.name} size={120} />
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded-circle position-absolute"
                    style={{ bottom: "4px", right: "4px" }}
                    onClick={() => avatarInputRef.current.click()}
                    aria-label="Cambia immagine profilo"
                  >
                    <i className="bi bi-camera-fill"></i>
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    hidden
                    onChange={(e) => handleImageChange(e, setAvatar)}
                  />
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
                    {t.contactInfo}
                  </a>
                </p>
                <a href="#" className="fw-bold small d-inline-block mb-3">
                  {EXTRA.connections} {t.connections}
                </a>

                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-primary rounded-pill fw-bold"
                    onClick={() => setConstructionTitle(t.openTo)}
                  >
                    {t.openTo}
                  </button>
                  <button
                    className="btn btn-outline-primary rounded-pill fw-bold"
                    onClick={() => setConstructionTitle(t.addSection)}
                  >
                    {t.addSection}
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setConstructionTitle(t.enhanceProfile)}
                  >
                    {t.enhanceProfile}
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setConstructionTitle(t.resources)}
                  >
                    {t.resources}
                  </button>
                </div>
              </div>
            </Card>

            <Card className="mb-3 p-3">
              <h2 className="h5 fw-bold mb-1">{t.analytics}</h2>
              <p className="text-muted small mb-3">
                <i className="bi bi-eye me-1"></i>
                {t.privateToYou}
              </p>
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-people-fill fs-5 mt-1"></i>
                  <div>
                    <div className="fw-bold">
                      {ANALYTICS.profileViews} {t.profileViews}
                    </div>
                    <div className="small text-muted">{t.profileViewsHint}</div>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-bar-chart-fill fs-5 mt-1"></i>
                  <div>
                    <div className="fw-bold">
                      {ANALYTICS.postImpressions} {t.postImpressions}
                    </div>
                    <div className="small text-muted">{t.postImpressionsHint}</div>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-search fs-5 mt-1"></i>
                  <div>
                    <div className="fw-bold">
                      {ANALYTICS.searchAppearances} {t.searchAppearances}
                    </div>
                    <div className="small text-muted">{t.searchAppearancesHint}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.about} onEdit={() => setAboutModalOpen(true)} />
              <p className="mb-3">{about}</p>
              <div className="border rounded-3 p-3">
                <div className="fw-bold small mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-gem"></i>
                  {t.topSkills}
                </div>
                <div className="small">{topSkills.join(" · ")}</div>
              </div>
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.featured} onEdit={() => setEntryModalKey("featured")} />
              <div className="d-flex flex-wrap gap-3">
                {featured.map((f) => (
                  <div key={f.title} className="border rounded-3 p-3 flex-fill" style={{ minWidth: "160px" }}>
                    <div className="small text-muted mb-2">{f.kind}</div>
                    <i className={`bi ${f.icon || "bi-star"} fs-3`}></i>
                    <div className="fw-bold small mt-2">{f.title}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h2 className="h5 fw-bold mb-0">{t.activity}</h2>
                <button
                  className="btn btn-outline-primary rounded-pill btn-sm"
                  onClick={() => setConstructionTitle(t.createAPost)}
                >
                  {t.createAPost}
                </button>
              </div>
              <p className="text-muted small mb-3">
                0 {t.followers} · {myPosts.length} {t.postsPublished} ·{" "}
                {likedPosts.length} {t.likesGiven} · {myComments.length} {t.commentsWritten} ·{" "}
                {sharesReceived} {t.sharesReceived}
              </p>

              {activityTimeline.length === 0 && likedPosts.length === 0 && (
                <p className="text-muted small mb-0">{t.noPosts}</p>
              )}

              {activityTimeline.slice(0, 8).map((item) => (
                <div
                  key={`${item.type}-${item.type === "post" ? item.post.id : item.comment.id}`}
                  className="d-flex gap-2 border-bottom py-2"
                >
                  <i
                    className={`bi ${item.type === "post" ? "bi-file-earmark-post" : "bi-chat-dots"} text-muted mt-1`}
                  ></i>
                  <div className="flex-grow-1">
                    {item.type === "post" ? (
                      <>
                        <div className="small fw-bold">{t.youPosted}</div>
                        <div className="small">
                          {item.post.text || <span className="text-muted">—</span>}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="small fw-bold">
                          {t.youCommented} {t.onPostBy} {item.comment.post.author.name}
                        </div>
                        <div className="small">"{item.comment.text}"</div>
                      </>
                    )}
                    <div className="small text-muted">{timeAgo(item.createdAt)}</div>
                  </div>
                </div>
              ))}

              {likedPosts.length > 0 && (
                <div className="mt-3">
                  <div className="small fw-bold mb-2">{t.likedPosts}</div>
                  {likedPosts.map((p) => (
                    <div key={p.id} className="d-flex gap-2 border-bottom py-2">
                      <i className="bi bi-hand-thumbs-up-fill text-primary mt-1"></i>
                      <div className="small">
                        <span className="fw-bold">{p.author.name}</span>
                        {p.text ? `: ${p.text}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.experience} onEdit={() => setEntryModalKey("experience")} />
              {experience.map((e, i) => (
                <div key={`${e.company}-${i}`} className="d-flex gap-3 mb-2">
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
              {experience.length === 0 && <p className="text-muted small mb-0">{t.noExperience}</p>}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.education} onEdit={() => setEntryModalKey("education")} />
              {education.map((ed, i) => (
                <div key={`${ed.school}-${i}`} className="d-flex gap-3 mb-2">
                  <i className="bi bi-mortarboard fs-4"></i>
                  <div>
                    <div className="fw-bold">{ed.school}</div>
                    <div className="small">{ed.degree}</div>
                    <div className="small text-muted">{ed.period}</div>
                  </div>
                </div>
              ))}
              {education.length === 0 && <p className="text-muted small mb-0">{t.noEducation}</p>}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.projects} onEdit={() => setEntryModalKey("projects")} />
              {projects.map((p, i) => (
                <div key={`${p.name}-${i}`} className="mb-2">
                  <div className="fw-bold">{p.name}</div>
                  <div className="small text-muted mb-1">{p.period}</div>
                  <div className="small">{p.description}</div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-muted small mb-0">{t.noProjects}</p>}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={`${t.skills} (${skills.length})`} onEdit={() => setTagModalKey("skills")} />
              <div className="d-flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="badge rounded-pill text-dark border fw-normal px-3 py-2">
                    {s}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={`${t.courses} (${courses.length})`} onEdit={() => setTagModalKey("courses")} />
              {courses.map((c, i) => (
                <div key={c} className={i < courses.length - 1 ? "border-bottom pb-2 mb-2" : ""}>
                  {c}
                </div>
              ))}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader
                title={`${t.languages} (${languages.length})`}
                onEdit={() => setEntryModalKey("languages")}
              />
              {languages.map((l, i) => (
                <div key={`${l.name}-${i}`} className={i < languages.length - 1 ? "border-bottom pb-2 mb-2" : ""}>
                  <div className="fw-bold">{l.name}</div>
                  <div className="small text-muted">{l.level}</div>
                </div>
              ))}
            </Card>

            <Card className="mb-3 p-3">
              <SectionHeader title={t.interests} onEdit={() => setEntryModalKey("interests")} />
              <div className="d-flex flex-wrap gap-3">
                {interests.map((it, i) => (
                  <div key={`${it.name}-${i}`} className="d-flex align-items-center gap-2">
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
              <SectionHeader title={t.causes} onEdit={() => setTagModalKey("causes")} />
              <div className="d-flex flex-wrap gap-2">
                {causes.map((c) => (
                  <span key={c} className="badge rounded-pill text-dark border fw-normal px-3 py-2">
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <ProfileAside
              user={u}
              language={language}
              onLanguageChange={setLanguage}
              onConstruction={setConstructionTitle}
            />
          </Col>
        </Row>
      </Container>
      <FooterNav />

      <UnderConstructionModal
        show={Boolean(constructionTitle)}
        onHide={() => setConstructionTitle(null)}
        title={constructionTitle}
      />

      <AboutModal
        show={aboutModalOpen}
        onHide={() => setAboutModalOpen(false)}
        title={t.about}
        topSkillsLabel={t.topSkills}
        about={about}
        topSkills={topSkills}
        onSave={({ about: newAbout, topSkills: newTopSkills }) => {
          setAbout(newAbout);
          setTopSkills(newTopSkills);
        }}
      />

      {tagModalKey && (
        <TagListModal
          show
          onHide={() => setTagModalKey(null)}
          title={t[tagModalKey]}
          placeholder={TAG_SECTIONS[tagModalKey].placeholder}
          items={tagData[tagModalKey]}
          onSave={tagSetters[tagModalKey]}
        />
      )}

      {entryModalKey && (
        <EntryListModal
          show
          onHide={() => setEntryModalKey(null)}
          title={t[entryModalKey]}
          fields={ENTRY_SECTIONS[entryModalKey].fields}
          renderSummary={ENTRY_SECTIONS[entryModalKey].renderSummary}
          items={entryData[entryModalKey]}
          onSave={entrySetters[entryModalKey]}
        />
      )}
    </>
  );
}

export default Profile;
