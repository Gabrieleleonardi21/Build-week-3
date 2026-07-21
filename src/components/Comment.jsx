import ProfileImage from './ProfileImage'
import { timeAgo } from '../data'

// Singolo commento già pubblicato sotto un post.
function Comment({ comment }) {
  return (
    <div className="comment d-flex gap-2 mb-2">
      <ProfileImage src={comment.author.avatar} alt={comment.author.name} size={32} />
      <div className="comment-body">
        <div className="comment-author">{comment.author.name}</div>
        <div className="comment-text">{comment.text}</div>
        <div className="comment-time">{timeAgo(comment.createdAt)}</div>
      </div>
    </div>
  )
}

export default Comment
