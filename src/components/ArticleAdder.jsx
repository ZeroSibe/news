import React, { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import ErrorPage from "./ErrorPage";
import ErrorSection from "./ErrorSection";
import { isImgUrl } from "../utils/utils";

export default function ArticleAdder({ username }) {
  const [error, setError] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInputs, setUserInputs] = useState({
    topic: "",
    title: "",
    body: "",
    img_url: "",
  });
  const [topics, setTopics] = useState(null);

  console.log(userInputs);

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

  function renderTopicOptions() {
    return topics.map((topic) => {
      return (
        <option key={topic.slug} value={topic.slug}>
          {topic.slug}
        </option>
      );
    });
  }

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    if (name === "img_url") {
      if (!isImgUrl(value)) {
        setError("Please provide a valid image url");
        return;
      }
    }

    setUserInputs((currInputs) => {
      const articleInputs = { ...currInputs };
      articleInputs[name] = value;
      return articleInputs;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="container center-columns">
      {error && <ErrorSection error={error} />}
      <form
        className="content-section post-article-form"
        onSubmit={handleSubmit}
      >
        <h2 className="container-header">Create An Article</h2>

        <label htmlFor="topic">Select a topic</label>
        <select
          name="topic"
          id="topic"
          onBlur={handleInput}
          value={userInputs.topic}
        >
          {topics ? (
            renderTopicOptions()
          ) : (
            <option hidden disabled value="">
              Topics Unavailable
            </option>
          )}
        </select>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={userInputs.title}
          onBlur={handleInput}
        />

        <label htmlFor="body">body text</label>
        <textarea
          id="body"
          name="body"
          type="text"
          rows="4"
          value={userInputs.body}
          onBlur={handleInput}
        />

        <label htmlFor="img_url">Article image URL</label>
        <input
          name="img_url"
          type="text"
          onBlur={handleInput}
          value={userInputs.img_url}
        />
        {imgErr && <p>{imgErr}</p>}

        <div className="center-columns">
          <button className="post-article-btn" type="submit">
            + Post Article
          </button>
        </div>
      </form>
    </section>
  );
}
