import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getArticleById } from "../utils/api";
import Loading from "./Loading";
import ErrorSection from "./ErrorSection";
import ArticleBody from "./ArticleBody";
import ArticleComments from "./ArticleComments";
import ErrorPage from "./ErrorPage";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [articleNotFound, setArticleNotFound] = useState(null);
  const navigate = useNavigate();
  const commentsRef = useRef(null);
  const location = useLocation();

  const commentsHash = location.hash === "#comments";
  console.log(location, commentsRef, commentsHash);

  useEffect(() => {
    setArticleNotFound(null);
    setArticleError(null);
    setLoadingArticle(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setLoadingArticle(false);
        if (!commentsHash) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          setArticleNotFound(err.response.data.msg);
        } else if (err.status === 400) {
          setArticleNotFound(err.response.data.msg);
        } else {
          setArticleError(
            "Could not load this article, please try agian later"
          );
        }
        setLoadingArticle(false);
      });
  }, [article_id, commentsHash]);

  useEffect(() => {
    if (!loadingArticle && commentsHash && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commentsHash, loadingArticle]);

  return (
    <div>
      {loadingArticle ? (
        <Loading />
      ) : articleNotFound ? (
        <ErrorPage error={articleNotFound} />
      ) : (
        <div>
          <button
            onClick={() => navigate("/articles")}
            aria-label="back to previous page"
            className="nav-btn"
          >
            Go Back
          </button>

          {articleError ? (
            <ErrorSection error={articleError} />
          ) : (
            <ArticleBody article={article} />
          )}
          <div ref={commentsRef}>
            <ArticleComments article_id={article_id} />
          </div>
        </div>
      )}
    </div>
  );
}
