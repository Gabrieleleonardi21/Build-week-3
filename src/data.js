// Dati statici e funzioni helper condivise. Nessuna dipendenza esterna.

// Numero intero casuale tra min e max (inclusi)
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Titoli professionali assegnati agli autori generati da randomuser.me
export const HEADLINES = [
  'Full Stack Developer',
  'UX/UI Designer',
  'Frontend Developer @ EPICODE',
  'Data Analyst',
  'Project Manager',
  'Cloud Engineer',
  'Tech Recruiter',
  'Backend Developer',
  'DevOps Engineer',
  'Mobile Developer',
]

// Testi di esempio per i post iniziali (seed)
export const POST_TEXTS = [
  'Felice di condividere il mio nuovo progetto React! 🚀 #buildweek',
  'Oggi ho imparato a gestire lo stato con i custom hook. Consigliatissimo. #react',
  'Domanda per la community: qual è il vostro stack preferito nel 2026?',
  'Grande giornata di studio in EPICODE 💪 Il team è on fire!',
  'Ho appena pubblicato un articolo sul CSS moderno: container query ovunque.',
  'Piccolo traguardo: primo deploy in produzione andato liscio 🎉',
]

// Testi di esempio per i commenti iniziali (seed)
export const COMMENT_TEXTS = [
  'Complimenti! 👏',
  'Molto interessante, grazie per la condivisione.',
  'Ottimo lavoro 🙌',
  'Concordo pienamente!',
  'Puoi dirci di più?',
  'Grande, ci ispiri 🔥',
]

// Immagini di esempio per i post seed (Picsum: servizio pubblico solo per demo).
// Le stringhe vuote lasciano il post senza immagine.
export const POST_IMAGES = [
  'https://picsum.photos/seed/li1/600/340',
  '',
  'https://picsum.photos/seed/li2/600/340',
  '',
  'https://picsum.photos/seed/li3/600/340',
  '',
]

// Genera un avatar con le iniziali come SVG (data URI): niente rete, niente file.
// Uso solo caratteri "word" (\w) per le iniziali, così l'SVG non è iniettabile.
export function initialsAvatar(name) {
  const initials = (String(name).match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase()
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">` +
    `<rect width="96" height="96" fill="#0a66c2"/>` +
    `<text x="50%" y="50%" dy=".35em" text-anchor="middle" ` +
    `font-family="Arial, sans-serif" font-size="40" fill="#ffffff">${initials}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// Tempo trascorso in formato breve (es. "ora", "12 min", "3 h", "2 g")
export function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'ora'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} h`
  const g = Math.floor(h / 24)
  return `${g} g`
}
