import React from "react";

export default function CommentCardBtns({ votes }) {
  return (
    <div className="horizontal-align comment-btns">
      <button aria-label="vote comment" className="vote_comment">Vote:{votes}</button>
      <button aria-label="delete comment" className="delete_comment">Delete</button>
    </div>
  );
}
