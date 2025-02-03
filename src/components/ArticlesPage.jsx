import React from "react";
import { useSearchParams } from "react-router-dom";
import ArticleList from "./ArticleList";
import SortArticles from "./SortArticles";

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="container">
      <h2 className="container-header">Articles</h2>

      <SortArticles setSearchParams={setSearchParams} searchParams={searchParams}/>
      <ArticleList searchParams={searchParams} />
    </div>
  );
}
