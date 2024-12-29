import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../utils/api";
import Loading from "./Loading";
import ErrorSection from "./ErrorSection";
import ArticleBody from "./ArticleBody";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingArticle(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setLoadingArticle(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setArticleError(err);
        setLoadingArticle(false);
      });
  }, [article_id]);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        aria-label="back to previous page"
        className="nav-btn"
      >
        Go Back
      </button>

      {loadingArticle ? (
        <Loading />
      ) : articleError ? (
        <ErrorSection error={articleError} />
      ) : (
        <ArticleBody article={article} />
      )}
    </div>
  );
}
