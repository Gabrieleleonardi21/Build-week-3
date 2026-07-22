// Livello dati del feed su Firebase Realtime Database.
// Lettura in tempo reale (onValue) + scrittura (post, commenti, like, condivisioni)
// e condivisione immagini. randomuser.me serve solo a generare i dati iniziali.
import {
  ref,
  push,
  set,
  update,
  remove,
  get,
  onValue,
  runTransaction,
} from "firebase/database";
import { db, auth } from "@/lib/firebase";
import {
  HEADLINES,
  POST_TEXTS,
  POST_IMAGES,
  COMMENT_TEXTS,
  rand,
  initialsAvatar,
} from "@/lib/data";

const API = "https://randomuser.me/api/";
const CLIENT_KEY = "linkedin-client-id";

// Utente attualmente loggato (dati dello screenshot). Avatar generato offline.
export const CURRENT_USER = {
  id: "me",
  name: "Gabriele Leonardi",
  headline: "full stack ai developer",
  location: "Roma, Lazio",
  avatar: initialsAvatar("Gabriele Leonardi"),
};

// Utente corrente per il feed: se c'è un login Firebase usa i suoi dati,
// altrimenti ripiega sul mock CURRENT_USER (Firebase non configurato o non loggato).
export function getCurrentUser() {
  const u = auth?.currentUser;
  if (!u) return CURRENT_USER;
  const nome = u.displayName || u.email || CURRENT_USER.name;
  return {
    id: u.uid,
    name: nome,
    headline: CURRENT_USER.headline,
    location: CURRENT_USER.location,
    avatar: u.photoURL || initialsAvatar(nome),
  };
}

// ---------- Helper interni ----------

// Id univoco (crypto quando disponibile, altrimenti fallback su tempo+random)
function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

// Id stabile del client (salvato in localStorage): identifica "chi" mette like,
// dato che non usiamo l'autenticazione.
function clientId() {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = uid();
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

// Consente solo immagini sicure: data:image/... oppure URL http(s).
// Scarta schemi pericolosi (es. javascript:) per evitare XSS.
export function sanitizeImage(url) {
  if (!url) return "";
  if (/^data:image\//i.test(url)) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return "";
}

// Converte un nodo grezzo del DB nel formato usato dai componenti
function toPost(id, p) {
  const likesMap = p.likes || {};
  const commentsMap = p.comments || {};
  const comments = Object.entries(commentsMap).map(([cid, c]) => ({
    id: cid,
    author: { name: c.authorName, avatar: c.authorAvatar },
    text: c.text,
    createdAt: c.createdAt,
  }));
  comments.sort((a, b) => a.createdAt - b.createdAt);

  return {
    id,
    author: {
      name: p.authorName,
      headline: p.authorHeadline,
      avatar: p.authorAvatar,
    },
    text: p.text || "",
    image: p.image || "",
    createdAt: p.createdAt || 0,
    likes: Object.keys(likesMap).length,
    likedByMe: Boolean(likesMap[clientId()]),
    shares: p.shares || 0,
    comments,
  };
}

// ---------- Lettura remota (randomuser) ----------

// Recupera n persone casuali (autori dei post seed e "persone che potresti conoscere")
export async function fetchPeople(n) {
  const res = await fetch(
    `${API}?results=${n}&nat=it,us,gb,fr,es&inc=name,picture,location,login`
  );
  if (!res.ok) throw new Error("Errore di rete randomuser.me");
  const d = await res.json();
  return d.results.map((u) => ({
    id: u.login.uuid,
    name: `${u.name.first} ${u.name.last}`,
    avatar: u.picture.large,
    thumb: u.picture.thumbnail,
    headline: HEADLINES[rand(0, HEADLINES.length - 1)],
    location: `${u.location.city}, ${u.location.country}`,
  }));
}

// ---------- Seed del DB (solo la prima volta) ----------

// Like fittizi iniziali: alcune chiavi casuali (il conteggio = numero di chiavi)
function buildSeedLikes() {
  const out = {};
  const n = rand(0, 8);
  for (let i = 0; i < n; i++) out[`seed-${uid()}`] = true;
  return out;
}

// Commenti iniziali con autori scelti a caso tra le persone generate
function buildSeedComments(people) {
  const out = {};
  const howMany = rand(0, 2);
  for (let i = 0; i < howMany; i++) {
    const author = people[rand(0, people.length - 1)];
    out[uid()] = {
      authorName: author.name,
      authorAvatar: author.avatar,
      text: COMMENT_TEXTS[rand(0, COMMENT_TEXTS.length - 1)],
      createdAt: Date.now() - rand(1, 45) * 60000,
    };
  }
  return out;
}

// Nodo post nel formato del Realtime Database
function buildSeedPost(person, i, people) {
  return {
    authorName: person.name,
    authorHeadline: person.headline,
    authorAvatar: person.avatar,
    text: POST_TEXTS[i % POST_TEXTS.length],
    image: sanitizeImage(POST_IMAGES[i % POST_IMAGES.length]),
    createdAt: Date.now() - (i + 1) * 3600 * 1000, // post scaglionati nel tempo
    shares: rand(0, 15),
    likes: buildSeedLikes(),
    comments: buildSeedComments(people),
  };
}

// Se /posts è vuoto, genera e salva i post iniziali (una sola scrittura batch)
export async function seedIfEmpty(seedCount = 6) {
  if (!db) return;
  const snap = await get(ref(db, "posts"));
  if (snap.exists()) return;
  const people = await fetchPeople(seedCount);
  const updates = {};
  people.forEach((person, i) => {
    const postId = push(ref(db, "posts")).key;
    updates[`posts/${postId}`] = buildSeedPost(person, i, people);
  });
  await update(ref(db), updates);
}

// ---------- Lettura in tempo reale ----------

// Si iscrive al feed: `cb(posts)` viene richiamato a ogni cambiamento del DB.
// Ritorna la funzione per annullare l'iscrizione (da usare nel cleanup useEffect).
export function subscribeFeed(cb) {
  if (!db) {
    cb([]);
    return () => {};
  }
  const postsRef = ref(db, "posts");
  return onValue(postsRef, (snap) => {
    const val = snap.val() || {};
    const posts = Object.entries(val).map(([id, p]) => toPost(id, p));
    posts.sort((a, b) => b.createdAt - a.createdAt); // più recenti in cima
    cb(posts);
  });
}

// ---------- Scrittura ----------

// Pubblica un nuovo post dell'utente corrente
export async function addPost({ text, image }) {
  if (!db) return;
  const me = getCurrentUser();
  const node = push(ref(db, "posts"));
  await set(node, {
    authorName: me.name,
    authorHeadline: me.headline,
    authorAvatar: me.avatar,
    text: text || "",
    image: sanitizeImage(image),
    createdAt: Date.now(),
    shares: 0,
  });
}

// Aggiunge un commento (dell'utente corrente) al post indicato
export async function addComment(postId, text) {
  if (!db) return;
  const me = getCurrentUser();
  const node = push(ref(db, `posts/${postId}/comments`));
  await set(node, {
    authorName: me.name,
    authorAvatar: me.avatar,
    text,
    createdAt: Date.now(),
  });
}

// Attiva/disattiva il "Mi piace" dell'utente corrente (una chiave per client)
export async function toggleLike(postId, liked) {
  if (!db) return;
  const likeRef = ref(db, `posts/${postId}/likes/${clientId()}`);
  if (liked) {
    await remove(likeRef);
    return;
  }
  await set(likeRef, true);
}

// Incrementa in modo atomico il contatore delle condivisioni
export async function sharePost(postId) {
  if (!db) return;
  const sharesRef = ref(db, `posts/${postId}/shares`);
  await runTransaction(sharesRef, (curr) => {
    if (!curr) return 1;
    return curr + 1;
  });
}

// ---------- Immagini (data URL nel Realtime Database) ----------

// Vincoli sull'immagine di input: solo JPEG/PNG e sempre sotto i 30 MB.
export const MAX_IMAGE_BYTES = 30 * 1024 * 1024; // 30 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

// Valida formato e dimensione del file; lancia un errore con messaggio se non ok.
export function validateImageFile(file) {
  if (!file || !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Formato non valido: sono ammessi solo JPEG e PNG");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Immagine troppo grande: massimo 30 MB");
  }
}

// Valida, ridimensiona (via canvas) e ricomprime l'immagine in un data URL JPEG.
// Il Realtime Database non è pensato per file grandi: qui salviamo una versione
// compatta (lato massimo `maxSize`px) per non appesantire il DB.
export function processImage(file, maxSize = 1080, quality = 0.8) {
  return new Promise((resolve, reject) => {
    try {
      validateImageFile(file);
    } catch (err) {
      reject(err);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      // riduce mantenendo le proporzioni se supera il lato massimo
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Immagine non leggibile"));
    };
    img.src = url;
  });
}
