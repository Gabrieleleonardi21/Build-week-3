import { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import {
  CURRENT_USER,
  loadFeed,
  addPost,
  addComment,
  toggleLike,
  sharePost,
} from '../api'

// Colonna centrale del feed: orchestrazione dello stato dei post e delle azioni.
// Tutte le scritture passano da api.js (che aggiorna anche localStorage).
function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const user = CURRENT_USER

  useEffect(() => {
    let alive = true
    loadFeed()
      .then((data) => {
        if (alive) setPosts(data)
      })
      .catch(() => {
        // offline o API non raggiungibile: si parte comunque da feed vuoto
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  function publish({ text, image }) {
    setPosts((prev) => addPost(prev, { text, image }))
  }
  function comment(id, text) {
    setPosts((prev) => addComment(prev, id, text))
  }
  function like(id) {
    setPosts((prev) => toggleLike(prev, id))
  }
  function share(id) {
    setPosts((prev) => sharePost(prev, id))
  }

  return (
    <div className="feed">
      <CreatePost user={user} onPublish={publish} />

      {loading && <p className="text-center text-muted mt-3">Caricamento del feed…</p>}

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