import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ErrorSection from "./ErrorSection";
import ErrorPage from "./ErrorPage";
import { isValidTopic } from "../utils/utils";
import { Link } from "react-router-dom";

export default function ArticleList({ searchParams }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const orderValue = searchParams.get("order") || "desc";
    const sortByValue = searchParams.get("sort_by") || "created_at";
    const topicValue = searchParams.get("topic");
    if (!["asc", "desc"].includes(orderValue)) {
      setError("An error occured - Invalid order query");
      setIsLoading(false);
      return;
    }
    if (!["created_at", "comment_count", "votes"].includes(sortByValue)) {
      setError("An error occured- Invalid sort query");
      setIsLoading(false);
      return;
    }

    if (topicValue && !isValidTopic(topicValue)) {
      setError(`No articles with topic ${topicValue}`);
      setIsLoading(false);
      return;
    }

    getArticles(searchParams)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          setError(err.response.data.msg);
        } else if (err.status === 400) {
          setError(`An error occured - ${err.response.data.msg}`);
        } else {
          setError("An error occured, please try again later");
        }
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="container">
      {isLoading && <Loading />}
      {error && <ErrorSection error={error} />}
      {!isLoading && (
        <ul className="article-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.article_id}>
                <ArticleCard article={article} />
              </li>
            ))
          ) : (
            <p className="content-section">
              No articles found, but don't worry, you can find plenty of other
              things by our <Link to={"/topics"}>topics!</Link>
            </p>
          )}
        </ul>
      )}
    </div>
  );
}
