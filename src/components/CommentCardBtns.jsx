import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteCommentById } from "../utils/api";
import ErrorSection from "./ErrorSection";

export default function CommentCardBtns({
  votes,
  author,
  comment_id,
  setDeleteResponse,
}) {
  const { user } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);

  function deleteComment(id) {
    setError(null);
    setIsDisabled(true);
    setDeleteResponse("Deleting comment...");
    deleteCommentById(id)
      .then(() => {
        setDeleteResponse("This comment has been deleted");
      })
      .catch((error) => {
        setDeleteResponse("");
        setError("Failed to delete comment, please try again later.");
        setIsDisabled(false);
      });
  }

  return (
    <div>
      <div className="horizontal-align comment-btns">
        <button aria-label="vote comment" className="vote_comment">
          Vote:{votes}
        </button>
        {author === user && (
          <button
            aria-label="delete comment"
            className="delete_comment"
            disabled={isDisabled}
            onClick={() => deleteComment(comment_id)}
          >
            Delete
          </button>
        )}
      </div>
      {error && <ErrorSection error={error} />}
    </div>
  );
}
