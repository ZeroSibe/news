import React from "react";

export default function ArticleBtns({ votes, comment_count }) {
  return (
    <div className="horizontal-align article-btns">
      <button aria-label="vote article">Vote: {votes}</button>
      <button aria-label="go to comments">Comment: {comment_count}</button>
    </div>
  );
}
