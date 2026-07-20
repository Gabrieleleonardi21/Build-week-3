// Livello dati del feed: lettura (randomuser.me) + scrittura/condivisione immagini
// con persistenza locale (localStorage). Nessun backend richiesto.
import {
  HEADLINES,
  POST_TEXTS,
  POST_IMAGES,
  COMMENT_TEXTS,
  rand,
  initialsAvatar,
} from './data'

const API = 'https://randomuser.me/api/'
const STORE_KEY = 'linkedin-feed-posts'

// Utente attualmente loggato (dati dello screenshot). Avatar generato offline.
export const CURRENT_USER = {
  id: 'me',
  name: 'Gabriele Leonardi',
  headline: 'full stack ai developer',
  location: 'Roma, Lazio',
  avatar: initialsAvatar('Gabriele Leonardi'),
}

// ---------- Helper interni ----------

// Id univoco (crypto quando disponibile, altrimenti fallback su tempo+random)
function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

// Consente solo immagini sicure: data:image/... oppure URL http(s).
// Scarta schemi pericolosi (es. javascript:) per evitare XSS.
export function sanitizeImage(url) {
  if (!url) return ''
  if (/^data:image\//i.test(url)) return url
  if (/^https?:\/\//i.test(url)) return url
  return ''
}

// Lettura dello store locale (array di post) con parsing sicuro
function readStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// Scrittura dello store locale; il try evita crash se la quota è superata
function writeStore(posts) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(posts))
  } catch {
    console.warn('Impossibile salvare il feed in localStorage (quota superata?)')
  }
}

// ---------- Lettura remota ----------

// Recupera n persone casuali da randomuser.me (autori e "persone che potresti conoscere")
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

// ---------- Seed del feed ----------

// Crea i commenti iniziali di un post scegliendo autori a caso tra le persone
function buildSeedComments(people) {
  const out = []
  const howMany = rand(0, 2)
  for (let i = 0; i < howMany; i++) {
    const author = people[rand(0, people.length - 1)]
    out.push({
      id: uid(),
      author: { id: author.id, name: author.name, avatar: author.avatar },
      text: COMMENT_TEXTS[rand(0, COMMENT_TEXTS.length - 1)],
      createdAt: Date.now() - rand(1, 45) * 60000,
    })
  }
  return out
}

// Costruisce un singolo post seed a partire da una persona
function buildSeedPost(person, i, people) {
  return {
    id: uid(),
    author: person,
    text: POST_TEXTS[i % POST_TEXTS.length],
    image: sanitizeImage(POST_IMAGES[i % POST_IMAGES.length]),
    createdAt: Date.now() - (i + 1) * 3600 * 1000, // post scaglionati nel tempo
    likes: rand(3, 90),
    likedByMe: false,
    shares: rand(0, 15),
    comments: buildSeedComments(people),
  }
}

// Carica il feed: se esiste in localStorage lo riusa, altrimenti lo genera e salva
export async function loadFeed(seedCount = 6) {
  const cached = readStore()
  if (cached) return cached
  const people = await fetchPeople(seedCount)
  const posts = people.map((p, i) => buildSeedPost(p, i, people))
  writeStore(posts)
  return posts
}

// ---------- Scrittura ----------

// Aggiunge un nuovo post dell'utente corrente in cima al feed e lo persiste
export function addPost(posts, { text, image }) {
  const post = {
    id: uid(),
    author: CURRENT_USER,
    text: text || '',
    image: sanitizeImage(image),
    createdAt: Date.now(),
    likes: 0,
    likedByMe: false,
    shares: 0,
    comments: [],
  }
  const next = [post, ...posts]
  writeStore(next)
  return next
}

// Aggiunge un commento (dell'utente corrente) al post indicato
export function addComment(posts, postId, text) {
  const next = posts.map((p) => {
    if (p.id !== postId) return p
    const comment = {
      id: uid(),
      author: { id: CURRENT_USER.id, name: CURRENT_USER.name, avatar: CURRENT_USER.avatar },
      text,
      createdAt: Date.now(),
    }
    return { ...p, comments: [...p.comments, comment] }
  })
  writeStore(next)
  return next
}

// Attiva/disattiva il "Mi piace" dell'utente corrente sul post
export function toggleLike(posts, postId) {
  const next = posts.map((p) => {
    if (p.id !== postId) return p
    if (p.likedByMe) return { ...p, likedByMe: false, likes: p.likes - 1 }
    return { ...p, likedByMe: true, likes: p.likes + 1 }
  })
  writeStore(next)
  return next
}

// Incrementa il contatore delle condivisioni del post
export function sharePost(posts, postId) {
  const next = posts.map((p) => {
    if (p.id !== postId) return p
    return { ...p, shares: p.shares + 1 }
  })
  writeStore(next)
  return next
}

// Vincoli sulle immagini condivise: solo JPEG/PNG e sempre sotto i 30 MB.
export const MAX_IMAGE_BYTES = 30 * 1024 * 1024 // 30 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']

// Legge un file immagine locale e lo converte in data URL (per la condivisione).
// Rifiuta formati diversi da JPEG/PNG e file oltre i 30 MB.
export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !ALLOWED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error('Formato non valido: sono ammessi solo JPEG e PNG'))
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error('Immagine troppo grande: massimo 30 MB'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Lettura immagine fallita'))
    reader.readAsDataURL(file)
  })
}
