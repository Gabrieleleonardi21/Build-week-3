import { useState } from "react";
import ProfileImage from "@/ui/ProfileImage";
import Comment from "@/features/feed/Comment";

// Sezione commenti di un post: input per scriverne uno nuovo + elenco commenti.
function Comments({ comments, user, onAdd }) {
  const [text, setText] = useState("");

  // Invia il commento (non vuoto) e pulisce l'input
  function submit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText("");
  }

  return (
    <div className="comments px-3 pb-3">
      <form className="d-flex gap-2 my-2" onSubmit={submit}>
        <ProfileImage src={user.avatar} alt={user.name} size={32} />
        <input
          className="comment-input"
          placeholder="Aggiungi un commento…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-comment" disabled={!text.trim()}>
          Invia
        </button>
      </form>

      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}

export default Comments;
