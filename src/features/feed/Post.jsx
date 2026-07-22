import { useState } from "react";
import Card from "@/ui/Card";
import ProfileImage from "@/ui/ProfileImage";
import PostActions from "@/features/feed/PostActions";
import Comments from "@/features/feed/Comments";
import { timeAgo } from "@/lib/data";

// Singolo post pubblicato: intestazione autore, testo, immagine, contatori,
// azioni (mi piace/commenta/condividi) e sezione commenti a scomparsa.
function Post({ post, user, onLike, onComment, onShare }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="post mb-2">
      <div className="p-3 pb-0">
        <div className="d-flex gap-2">
          <ProfileImage
            src={post.author.avatar}
            alt={post.author.name}
            size={48}
          />
          <div>
            <div className="post-author">{post.author.name}</div>
            <div className="post-headline">{post.author.headline}</div>
            <div className="post-time">
              {timeAgo(post.createdAt)} · <i className="bi bi-globe-americas" />
            </div>
          </div>
        </div>

        {post.text && <p className="post-text mt-2 mb-2">{post.text}</p>}
      </div>

      {post.image && (
        <img className="post-image" src={post.image} alt="Immagine del post" />
      )}

      <div className="px-3 pt-2">
        <div className="post-counters d-flex justify-content-between">
          <span>
            <i className="bi bi-hand-thumbs-up-fill text-primary" />{" "}
            {post.likes}
          </span>
          <span>
            {post.comments.length} commenti · {post.shares} condivisioni
          </span>
        </div>

        <hr className="my-1" />

        <PostActions
          liked={post.likedByMe}
          onLike={() => onLike(post.id, post.likedByMe)}
          onComment={() => setShowComments((v) => !v)}
          onShare={() => onShare(post.id)}
        />
      </div>

      {showComments && (
        <Comments
          comments={post.comments}
          user={user}
          onAdd={(text) => onComment(post.id, text)}
        />
      )}
    </Card>
  );
}

export default Post;
