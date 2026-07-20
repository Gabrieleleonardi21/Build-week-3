// Riga azioni sotto ogni post: Mi piace, Commenta, Condividi.
// `liked` evidenzia in blu il bottone quando l'utente ha già messo "Mi piace".
function PostActions({ liked, onLike, onComment, onShare }) {
  const likeActive = liked && 'action-btn--active'

  return (
    <div className="d-flex justify-content-around">
      <button type="button" className={`action-btn ${likeActive || ''}`} onClick={onLike}>
        <i className="bi bi-hand-thumbs-up" />
        <span>Mi piace</span>
      </button>
      <button type="button" className="action-btn" onClick={onComment}>
        <i className="bi bi-chat-text" />
        <span>Commenta</span>
      </button>
      <button type="button" className="action-btn" onClick={onShare}>
        <i className="bi bi-arrow-right-circle" />
        <span>Condividi</span>
      </button>
    </div>
  )
}

export default PostActions
