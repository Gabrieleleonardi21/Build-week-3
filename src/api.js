// Fetch da API gratuita randomuser.me
import { HEADLINES, rand } from './data'

const API = 'https://randomuser.me/api/'

export async function fetchPeople(n) {
  const res = await fetch(
    `${API}?results=${n}&nat=it,us,gb,fr,es&inc=name,picture,location,login`
  )
  if (!res.ok) throw new Error('Errore di rete randomuser.me')
  const d = await res.json()
  return d.results.map((u) => ({
    id: u.login.uuid,
    name: `${u.name.first} ${u.name.last}`,
    avatar: u.picture.large,
    thumb: u.picture.thumbnail,
    headline: HEADLINES[rand(0, HEADLINES.length - 1)],
    location: `${u.location.city}, ${u.location.country}`,
  }))
}
