import { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import { isFirebaseConfigured } from '../firebase'
import {
  CURRENT_USER,
  subscribeFeed,
  seedIfEmpty,
  addPost,
  addComment,
  toggleLike,
  sharePost,
} from '../api'

// Colonna centrale del feed. I dati vivono su Firebase Realtime Database:
// ci si iscrive con subscribeFeed e la UI si aggiorna in tempo reale a ogni
// scrittura (anche da altri utenti). Le mutazioni passano tutte da api.js.
function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const user = CURRENT_USER

  useEffect(() => {
    // semina il DB se vuoto, poi ascolta gli aggiornamenti in tempo reale
    seedIfEmpty().catch(() => {})
    const unsubscribe = subscribeFeed((data) => {
      setPosts(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Handler: delegano la scrittura ad api.js; il refresh arriva da subscribeFeed
  function publish({ text, image }) {
    addPost({ text, image })
  }
  function comment(id, text) {
    addComment(id, text)
  }
  function like(id, likedByMe) {
    toggleLike(id, likedByMe)
  }
  function share(id) {
    sharePost(id)
  }

  return (
    <div className="feed">
      <CreatePost user={user} onPublish={publish} />

      {!isFirebaseConfigured && (
        <p className="text-center text-muted mt-3">
          Configura Firebase (file <code>.env.local</code>) per attivare il feed in tempo reale.
        </p>
      )}

      {isFirebaseConfigured && loading && (
        <p className="text-center text-muted mt-3">Caricamento del feed…</p>
      )}

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          user={user}
          onLike={like}
          onComment={comment}
          onShare={share}
        />
      ))}
    </div>
  )
}

export default Feed
