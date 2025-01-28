import React, { useEffect, useState } from "react";
import ErrorSection from "./ErrorSection";
import Loading from "./Loading";
import { getTopics } from "../utils/api";
import { capitaliseTitle } from "../utils/utils";
import { Link } from "react-router-dom";

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An error occured, please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="container-header">Topics</h2>
      {error && <ErrorSection error={error} />}
      {isLoading && <Loading />}
      <ul className="topic-list">
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`} className="topic-link">
                <h3>{capitaliseTitle(topic.slug)}</h3>
                <p>{topic.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
