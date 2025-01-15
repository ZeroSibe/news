import React from "react";
import CommentCard from "./CommentCard";

export default function CommentList({ comments }) {
  return (
    <section className="content-section">
      <h2 className="sub-section-header grey-btm-border">Comments</h2>
      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard comment={comment} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="comment-div">
          <p>Be the first to comment!</p>
        </div>
      )}
    </section>
  );
}
