import React, { useContext, useEffect, useState } from "react";
import { getTopics, postArticle } from "../utils/api";
import ErrorSection from "./ErrorSection";
import { isImgUrl } from "../utils/utils";
import { UserContext } from "../contexts/UserContext";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

export default function ArticleAdder() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [newArticle, setNewArticle] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userInputs, setUserInputs] = useState({
    topic: "",
    title: "",
    body: "",
    img_url: "",
  });

  const [topics, setTopics] = useState(null);
  const navigate = useNavigate();

  console.log(userInputs);

  useEffect(() => {
    setError(null);
    getTopics()
      .then((topics) => {
        setTopics(topics);
        if (topics && topics.length > 0 && !userInputs.topic) {
          setUserInputs((currInputs) => ({
            ...currInputs,
            topic: topics[0].slug,
          }));
        }
        setIsDisabled(false);
      })
      .catch((err) => {
        setError("An error occured, please try again later.");
        setIsDisabled(true);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

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
    setUserInputs((currInputs) => ({
      ...currInputs,
      [name]: value,
    }));
  }

  function handleBlur(e) {
    const element = e.target;
    if (element.value.length === 0) {
      element.classList.add("invalid");
    } else {
      element.classList.remove("invalid");
    }
  }

  function validateInputs() {
    if (!userInputs.title) return "Please provide a Title";
    if (!userInputs.body) return "Body Text is not filled in";
    if (userInputs.img_url && !isImgUrl(userInputs.img_url))
      return "Please provide a valid image url";
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsDisabled(true);

    const validationErr = validateInputs();
    if (validationErr) {
      setError(validationErr);
      setIsDisabled(false);
      return;
    }

    postArticle({
      ...userInputs,
      author: user,
    })
      .then((article) => {
        setError(null);
        setNewArticle(article);
        setUserInputs({ topic: "", title: "", body: "", img_url: "" });
        setIsDisabled(false);
      })
      .catch((err) => {
        setError("Oops...Something went wrong, please try again later");
        setIsDisabled(false);
      });
  }

  return (
    <section className="container center-columns">
      <form
        className="content-section post-article-form"
        onSubmit={handleSubmit}
      >
        <h2 className="container-header">Create An Article</h2>
        {error && <ErrorSection error={error} />}

        <label htmlFor="topic" className="align-row">
          Select a topic<div className="red-ast">*</div>
        </label>
        <select
          name="topic"
          id="topic"
          onChange={handleInput}
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

        <label htmlFor="title" className="align-row">
          Title<div className="red-ast">*</div>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={userInputs.title}
          onChange={handleInput}
          onBlur={handleBlur}
        />

        <label htmlFor="body" className="align-row">
          body text <div className="red-ast">*</div>
        </label>
        <textarea
          id="body"
          name="body"
          type="text"
          rows="4"
          value={userInputs.body}
          onChange={handleInput}
          onBlur={handleBlur}
        />

        <label htmlFor="img_url">Article image URL (optional)</label>
        <input
          name="img_url"
          type="text"
          onChange={handleInput}
          placeholder="http://www.example.com"
          value={userInputs.img_url}
        />
        <div className="center-columns">
          <button
            className="post-article-btn"
            type="submit"
            disabled={isDisabled}
          >
            + Post Article
          </button>
        </div>
      </form>

      {newArticle && (
        <div className="post-section">
          <h3 className="sub-section-header grey-btm-border">
            New Article Posted!
          </h3>

          <div className="article-list post-article">
            <ArticleCard article={newArticle} />
          </div>
        </div>
      )}
    </section>
  );
}
