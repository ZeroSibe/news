import React from "react";
import { formatDate } from "../utils/utils";

export default function ArticleCard({ article }) {
  const {
    article_id,
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  return (
    <section className="article-card">
      <div className="horizontal-align">
        <p>topic/{topic}</p>-<p>posted on {formatDate(created_at)}</p>
      </div>
      <img src={article_img_url} alt={`An article showing ${title}`} />
      <h3>{title}</h3>
      <div className="horizontal-align">
        <p>Votes: {votes}</p>|<p>Comments: {comment_count}</p>
      </div>
    </section>
  );
}
