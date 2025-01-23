import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentAdder from "./CommentAdder";
import ErrorSection from "./ErrorSection";
import Loading from "./Loading";
import { getCommentsById } from "../utils/api";

export default function ArticleComments({ article_id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getCommentsById(article_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [article_id]);

  return (
    <section className="content-section">
      <h2 className="sub-section-header grey-btm-border">Comments</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorSection error={error} />
      ) : (
        <div>
          <CommentAdder article_id={article_id} setComments={setComments} />
          <CommentList comments={comments} />
        </div>
      )}
    </section>
  );
}
