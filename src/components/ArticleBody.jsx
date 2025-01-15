import React from "react";
import { formatDate } from "../utils/utils";
import ArticleBtns from "./ArticleBtns";

export default function ArticleBody({ article }) {
  const {
    article_id,
    body,
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;
  return (
    <article className="content-section">
      <p>Topic: {topic}</p>
      <h2 className="article-header">{title}</h2>
      <img
        src={article_img_url}
        alt={`current article of ${title}`}
        className="article-img"
      />
      <p>
        Posted by {author} on {formatDate(created_at)}
      </p>

      <p className="article-para">{body}</p>
      <ArticleBtns votes={votes} comment_count={comment_count} />
    </article>
  );
}
