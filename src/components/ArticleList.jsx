import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ErrorSection from "./ErrorSection";

export default function ArticleList({ searchParams }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticles(searchParams)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An error occured, please try again later");
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="container">
      {error && <ErrorSection error={error} />}
      {isLoading && <Loading />}
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
