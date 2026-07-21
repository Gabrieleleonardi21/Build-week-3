import Card from './Card'
import ProfileImage from './ProfileImage'
import { CURRENT_USER } from '../api'

// Colonna sinistra della home: riepilogo profilo dell'utente corrente.
// Riutilizza Card e ProfileImage.
function ProfileCard() {
  const u = CURRENT_USER

  return (
    <Card className="profile-card mb-2">
      <div className="profile-banner" />
      <div className="text-center px-3 pb-3">
        <div className="profile-avatar">
          <ProfileImage src={u.avatar} alt={u.name} size={72} />
        </div>
        <div className="profile-name">{u.name}</div>
        <div className="profile-headline">{u.headline}</div>
        <div className="profile-location">{u.location}</div>
      </div>
    </Card>
  )
}

export default ProfileCard
