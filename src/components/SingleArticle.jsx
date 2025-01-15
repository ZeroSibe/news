import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, getCommentsById } from "../utils/api";
import Loading from "./Loading";
import ErrorSection from "./ErrorSection";
import ArticleBody from "./ArticleBody";
import CommentList from "./CommentList";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [comments, setComments] = useState(null);
  const [commentsErr, setCommentsErr] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setArticleError(null);
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

  useEffect(() => {
    setCommentsErr(null);
    setLoadingComments(true);
    getCommentsById(article_id)
      .then((comments) => {
        setComments(comments);
        setLoadingComments(false);
      })
      .catch((err) => {
        setCommentsErr(err);
        setLoadingComments(false);
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

      {loadingComments ? (
        <Loading />
      ) : commentsErr ? (
        <ErrorSection error={commentsErr} />
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
}
