import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function CommentCardBtns({ votes, author }) {
  const { user } = useContext(UserContext);
  return (
    <div className="horizontal-align comment-btns">
      <button aria-label="vote comment" className="vote_comment">
        Vote:{votes}
      </button>
      {author === user && (
        <button aria-label="delete comment" className="delete_comment">
          Delete
        </button>
      )}
    </div>
  );
}
