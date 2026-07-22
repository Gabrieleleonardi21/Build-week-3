import { useRef, useState } from "react";
import Card from "@/ui/Card";
import ProfileImage from "@/ui/ProfileImage";
import PublishButtons from "@/features/feed/PublishButtons";
import { processImage } from "@/lib/api";

// Box "Crea un post": scrittura del testo + condivisione immagine.
// L'immagine viene validata, ridimensionata e compressa in un data URL leggero
// (processImage) e salvata direttamente nel Realtime Database col post.
function CreatePost({ user, onPublish }) {
  const [open, setOpen] = useState(false); // true = composer espanso
  const [text, setText] = useState("");
  const [image, setImage] = useState(""); // data URL compresso
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef(null);

  // Apre il selettore file di sistema
  function pickImage() {
    fileRef.current.click();
  }

  // Valida (JPEG/PNG, max 30 MB), ridimensiona e comprime il file in un data URL
  async function onFile(e) {
    const file = e.target.files[0];
    e.target.value = ""; // consente di ricaricare lo stesso file
    if (!file) return;
    try {
      setProcessing(true);
      setImage(await processImage(file));
      setOpen(true);
    } catch (err) {
      alert(err.message);
    }
    setProcessing(false);
  }

  // Svuota il composer e lo richiude
  function reset() {
    setText("");
    setImage("");
    setOpen(false);
  }

  // Pubblica solo se c'è testo o immagine
  function publish() {
    const clean = text.trim();
    if (!clean && !image) return;
    onPublish({ text: clean, image });
    reset();
  }

  // Definite come dati per non ripetere il markup dei bottoni
  const actions = [
    {
      icon: "bi-image-fill",
      label: "Foto",
      color: "#378fe9",
      onClick: pickImage,
    },
    {
      icon: "bi-camera-video-fill",
      label: "Video",
      color: "#5f9b41",
      onClick: pickImage,
    },
    {
      icon: "bi-newspaper",
      label: "Scrivi articolo",
      color: "#e06847",
      onClick: () => setOpen(true),
    },
  ];

  const canPublish = (Boolean(text.trim()) || Boolean(image)) && !processing;

  // Etichetta del bottone Pubblica (evito l'operatore ternario nel JSX)
  let publishLabel = "Pubblica";
  if (processing) publishLabel = "Elaboro…";

  return (
    <Card className="p-3 mb-2">
      <div className="d-flex gap-2 align-items-center">
        <ProfileImage src={user.avatar} alt={user.name} size={48} />

        {!open && (
          <button
            type="button"
            className="composer-trigger"
            onClick={() => setOpen(true)}
          >
            Crea un post
          </button>
        )}

        {open && (
          <textarea
            className="composer-area"
            placeholder="Di cosa vuoi parlare?"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>

      {open && image && (
        <div className="composer-preview mt-2">
          <img src={image} alt="Anteprima immagine" />
          <button
            type="button"
            className="preview-remove"
            onClick={() => setImage("")}
            aria-label="Rimuovi immagine"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
      )}

      {/* input file nascosto: accetta solo PNG/JPEG, pilotato dai bottoni Foto/Video */}
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg"
        hidden
        onChange={onFile}
      />

      <hr className="my-2" />

      <div className="d-flex align-items-center justify-content-between">
        <PublishButtons actions={actions} />

        {open && (
          <button
            type="button"
            className="btn-publish"
            onClick={publish}
            disabled={!canPublish}
          >
            {publishLabel}
          </button>
        )}
      </div>
    </Card>
  );
}

export default CreatePost;
