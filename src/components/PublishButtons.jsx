// Riga di bottoni di pubblicazione (Foto, Video, Scrivi articolo).
// `actions` = array di { icon, label, color, onClick }: così evitiamo di
// ripetere lo stesso markup per ogni bottone.
function PublishButtons({ actions }) {
  return (
    <div className="d-flex flex-wrap">
      {actions.map((a) => (
        <button
          key={a.label}
          type="button"
          className="publish-btn"
          onClick={a.onClick}
        >
          <i className={`bi ${a.icon}`} style={{ color: a.color }} />
          <span>{a.label}</span>
        </button>
      ))}
    </div>
  )
}

export default PublishButtons
