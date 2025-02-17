import React from "react";
import ArticleList from "./ArticleList";
import { useSearchParams } from "react-router-dom";

export default function UserArticles({ username }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <section className="content-section">
      <h2 className="sub-section-header grey-btm-border">{`${username} Latest Posts`}</h2>
      <ArticleList searchParams={searchParams} username={username} />
    </section>
  );
}
