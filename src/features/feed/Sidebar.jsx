import { useState, useRef } from "react";
import { useAuth } from "@/features/auth/auth-context";
import "@/features/feed/feed.css";
import {
  ExperienceModal,
  SavedItemsModal,
  GroupsModal,
  NewsletterModal,
  EventsModal,
} from "@/features/feed/SidebarModals";

function Sidebar() {
  // nome, cognome e foto profilo dell'utente loggato: stato condiviso da
  // tutta l'app (navbar, composer, banner premium) tramite AuthProvider
  const { nomeCompleto, avatar, setAvatar } = useAuth();
  const nomeMostrato = nomeCompleto || "Utente";
  const [activeModal, setActiveModal] = useState(null);
  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem("profileExperiences");
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSaveExperience(experienceData) {
    let updated;
    if (editingIndex !== null) {
      updated = [...experiences];
      updated[editingIndex] = experienceData;
    } else {
      updated = [...experiences, experienceData];
    }
    setExperiences(updated);
    localStorage.setItem("profileExperiences", JSON.stringify(updated));
    setActiveModal(null);
    setEditingIndex(null);
  }

  function handleDeleteExperience() {
    const updated = experiences.filter((_, i) => i !== editingIndex);
    setExperiences(updated);
    localStorage.setItem("profileExperiences", JSON.stringify(updated));
    setActiveModal(null);
    setEditingIndex(null);
  }
  
/* Rimozione esperienza senza aprire modale */

  function handleRemoveExperience(e, index) {
    e.stopPropagation();
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    localStorage.setItem("profileExperiences", JSON.stringify(updated));
  }

  function handleAddClick() {
    setEditingIndex(null);
    setActiveModal("experience");
  }

  function handleEditClick(index) {
    setEditingIndex(index);
    setActiveModal("experience");
  }

  function handlePremiumClick(e) {
    e.preventDefault();
    window.dispatchEvent(new Event("showPremiumToast"));
  }

  return (
    <div className="sidebar-fixed d-flex flex-column gap-2">
      <div className="card border-0 shadow-sm">
        <div
          style={{
            height: "54px",
            background: "linear-gradient(90deg, #6e8fae 60%, #9fb8cf 60%)",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        ></div>

        <div className="px-3">
          <img
            src={
              avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                nomeMostrato
              )}&background=6c8faf&color=fff`
            }
            alt="Avatar utente"
            className="rounded-circle border border-white border-3"
            style={{
              width: "64px",
              height: "64px",
              objectFit: "cover",
              marginTop: "-32px",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="px-3 pt-2 pb-3">
          <h6 className="mb-0 fw-bold" style={{ fontSize: "1.05rem" }}>
            {nomeMostrato}
          </h6>
          <p className="small text-muted mb-1">
            {experiences.length > 0
              ? experiences[experiences.length - 1].titolo
              : "--"}
          </p>
          <p className="small text-muted mb-3">Roma, Lazio</p>
          <button
            className="btn btn-outline-secondary btn-sm rounded-pill"
            onClick={handleAddClick}
          >
            + Esperienza
          </button>

          {experiences.length > 0 && (
            <div className="mt-3">
              <p className="small fw-semibold mb-1">Esperienze</p>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="small text-muted border-top pt-1 mt-1 d-flex justify-content-between align-items-start"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditClick(i)}
                >
                  <div>
                    <strong>{exp.titolo}</strong>
                    {exp.azienda && <> · {exp.azienda}</>}
                    {exp.meseInizio && exp.annoInizio && (
                      <div>
                        {exp.meseInizio} {exp.annoInizio} –{" "}
                        {exp.attuale
                          ? "presente"
                          : exp.meseFine && exp.annoFine
                            ? `${exp.meseFine} ${exp.annoFine}`
                            : "?"}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="experience-remove-btn"
                    aria-label="Rimuovi esperienza"
                    onClick={(e) => handleRemoveExperience(e, i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <p className="small mb-2" style={{ color: "#5e5e5e" }}>
          Sblocca strumenti Premium e dai una spinta alla tua carriera
        </p>
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: "1.1rem" }}>🏅</span>

          <a
            href="#"
            className="small fw-semibold text-decoration-none"
            style={{ color: "#0a66c2" }}
            onClick={handlePremiumClick}
          >
            Prova 1 mese per 0 €
          </a>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 fw-semibold small">Collegamenti</p>
            <p className="mb-0 small text-muted">Amplia la tua rete</p>
          </div>
          <span className="fw-bold" style={{ color: "#0a66c2" }}>
            0
          </span>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-2">
        <button
          className="btn d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2 text-start border-0 bg-transparent"
          onClick={() => setActiveModal("saved")}
        >
          🔖 <span className="small">Elementi salvati</span>
        </button>
        <button
          className="btn d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2 text-start border-0 bg-transparent"
          onClick={() => setActiveModal("groups")}
        >
          👥 <span className="small">Gruppi</span>
        </button>
        <button
          className="btn d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2 text-start border-0 bg-transparent"
          onClick={() => setActiveModal("newsletter")}
        >
          📰 <span className="small">Newsletter</span>
        </button>
        <button
          className="btn d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2 text-start border-0 bg-transparent"
          onClick={() => setActiveModal("events")}
        >
          📅 <span className="small">Eventi</span>
        </button>
      </div>

      <ExperienceModal
        show={activeModal === "experience"}
        onHide={() => {
          setActiveModal(null);
          setEditingIndex(null);
        }}
        onSave={handleSaveExperience}
        onDelete={handleDeleteExperience}
        initialData={editingIndex !== null ? experiences[editingIndex] : null}
      />
      <SavedItemsModal
        show={activeModal === "saved"}
        onHide={() => setActiveModal(null)}
      />
      <GroupsModal
        show={activeModal === "groups"}
        onHide={() => setActiveModal(null)}
      />
      <NewsletterModal
        show={activeModal === "newsletter"}
        onHide={() => setActiveModal(null)}
      />
      <EventsModal
        show={activeModal === "events"}
        onHide={() => setActiveModal(null)}
      />
    </div>
  );
}

export default Sidebar;
