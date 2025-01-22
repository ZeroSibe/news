import React from "react";
import { formatCardDate } from "../utils/utils";
import ArticleBtns from "./ArticleBtns";
import CommentCardBtns from "./CommentCardBtns";

export default function CommentCard({ comment }) {
  const { author, body, comment_id, created_at, votes } = comment;
  return (
    <div className="comment-card light-grey-btm-border">
      <h3 className="mini-header">
        {author} - {formatCardDate(created_at)}
      </h3>
      <p>{body}</p>
      <CommentCardBtns votes={votes} author={author} />
    </div>
  );
}
