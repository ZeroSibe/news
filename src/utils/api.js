import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-apvv.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsById = (articleId) => {
  return api.get(`/articles/${articleId}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const updateArticleVotes = (articleId, voteNum) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: voteNum })
    .then((res) => {
      return res.data.article.votes;
    });
};

export const postComment = (articleId, username, body) => {
  return api
    .post(`/articles/${articleId}/comments`, { username, body })
    .then((res) => {
      return res.data.comment;
    });
};
