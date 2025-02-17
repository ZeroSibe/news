import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils/api";
import ErrorSection from "./ErrorSection";

export default function CommentAdder({ article_id, setComments }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [commentResponse, setCommentResponse] = useState("");
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsDisabled(true);
    setCommentResponse("posting comment...");
    if (newComment.length === 0) {
      setCommentResponse("your post was empty...");
      setIsDisabled(false);
      return;
    }
    if (!user) {
      setCommentResponse("please login to post your comment");
      setIsDisabled(false);
      return;
    }
    postComment(article_id, user, newComment)
      .then((comment) => {
        setComments((currComments) => [comment, ...currComments]);
        setCommentResponse("comment successfully posted!");
        setNewComment("");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError(`${error.response.data.msg}. Please check your login`);
        } else if (error.response.status === 400) {
          setError(
            `${setError(`Please check your input. ${error.response.data.msg}`)}`
          );
        } else {
          setError("Could not post comment, please try again later");
        }
        setCommentResponse("...failed to post comment");
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment">Add a Comment</label>
      <textarea
        id="comment"
        name="comment"
        rows="4"
        type="text"
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
      />
      <div className="button-container">
        <button type="submit" disabled={isDisabled}>
          Post Comment
        </button>
      </div>
      {error && <ErrorSection error={error} />}
      {commentResponse && <p>{commentResponse}</p>}
    </form>
  );
}
