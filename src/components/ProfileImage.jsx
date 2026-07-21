// Immagine profilo circolare riutilizzabile. `size` in px.
// Se manca la src mostra un segnaposto (icona persona) invece di un'immagine rotta.
function ProfileImage({ src, alt = 'Immagine profilo', size = 48 }) {
  const style = { width: size, height: size }

  if (!src) {
    return (
      <span className="profile-img profile-img--empty" style={style}>
        <i className="bi bi-person-fill" />
      </span>
    )
  }

  return <img className="profile-img" style={style} src={src} alt={alt} />
}

export default ProfileImage
