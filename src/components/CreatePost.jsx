import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import ProfileImage from './ProfileImage'
import PublishButtons from './PublishButtons'
import { validateImageFile, uploadImage } from '../api'

// Box "Crea un post": scrittura del testo + condivisione immagine.
// L'immagine viene mostrata in anteprima (object URL locale) alla selezione e
// caricata su Firebase Storage solo al momento della pubblicazione.
function CreatePost({ user, onPublish }) {
  const [open, setOpen] = useState(false) // true = composer espanso
  const [text, setText] = useState('')
  const [file, setFile] = useState(null) // File immagine selezionato
  const [preview, setPreview] = useState('') // object URL per l'anteprima
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  // Revoca l'object URL quando cambia o al dismount, per non sprecare memoria
  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  // Apre il selettore file di sistema
  function pickImage() {
    fileRef.current.click()
  }

  // Valida (JPEG/PNG, max 30 MB) e imposta file + anteprima locale
  function onFile(e) {
    const selected = e.target.files[0]
    e.target.value = '' // consente di ricaricare lo stesso file
    if (!selected) return
    try {
      validateImageFile(selected)
    } catch (err) {
      alert(err.message)
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setOpen(true)
  }

  function clearImage() {
    setFile(null)
    setPreview('')
  }

  // Svuota il composer e lo richiude
  function reset() {
    setText('')
    clearImage()
    setOpen(false)
  }

  // Pubblica: se c'è un'immagine la carica su Storage e usa l'URL ottenuto
  async function publish() {
    const clean = text.trim()
    if (!clean && !file) return

    let image = ''
    if (file) {
      try {
        setUploading(true)
        image = await uploadImage(file)
      } catch (err) {
        alert(`Caricamento immagine fallito: ${err.message}`)
        setUploading(false)
        return
      }
      setUploading(false)
    }

    onPublish({ text: clean, image })
    reset()
  }

  // Definite come dati per non ripetere il markup dei bottoni
  const actions = [
    { icon: 'bi-image-fill', label: 'Foto', color: '#378fe9', onClick: pickImage },
    { icon: 'bi-camera-video-fill', label: 'Video', color: '#5f9b41', onClick: pickImage },
    { icon: 'bi-newspaper', label: 'Scrivi articolo', color: '#e06847', onClick: () => setOpen(true) },
  ]

  const canPublish = (Boolean(text.trim()) || Boolean(file)) && !uploading

  // Etichetta del bottone Pubblica (evito l'operatore ternario nel JSX)
  let publishLabel = 'Pubblica'
  if (uploading) publishLabel = 'Pubblico…'

  return (
    <Card className="p-3 mb-2">
      <div className="d-flex gap-2 align-items-center">
        <ProfileImage src={user.avatar} alt={user.name} size={48} />

        {!open && (
          <button type="button" className="composer-trigger" onClick={() => setOpen(true)}>
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

      {open && preview && (
        <div className="composer-preview mt-2">
          <img src={preview} alt="Anteprima immagine" />
          <button
            type="button"
            className="preview-remove"
            onClick={clearImage}
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
          <button type="button" className="btn-publish" onClick={publish} disabled={!canPublish}>
            {publishLabel}
          </button>
        )}
      </div>
    </Card>
  )
}

export default CreatePost
