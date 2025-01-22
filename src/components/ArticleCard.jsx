import React from "react";
import { formatCardDate, formatDate } from "../utils/utils";
import { Link } from "react-router-dom";
import ArticleBtns from "./ArticleBtns";

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
        <p>
          topic/{topic} - {formatCardDate(created_at)}
        </p>
      </div>
      <Link to={`/articles/${article_id}`} className="title-link">
        <img
          src={article_img_url}
          alt={`An article showing ${title}`}
          className="article-img"
        />
        <h3>{title}</h3>
      </Link>
      <ArticleBtns
        votes={votes}
        comment_count={comment_count}
        articleId={article_id}
      />
    </section>
  );
}
