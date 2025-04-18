import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-apvv.onrender.com/api",
});

export const getArticles = (filterTerm) => {
  return api.get("/articles", { params: filterTerm }).then((res) => {
    return res.data.articles;
  });
};

export const postArticle = (articleBody) => {
  const { author, title, body, topic, img_url } = articleBody;
  return api
    .post("/articles", {
      author,
      title,
      body,
      topic,
      article_img_url: img_url || undefined,
    })
    .then((res) => {
      return res.data.article;
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

export const deleteCommentById = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

export const getTopics = () => {
  return api.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getUserByUsername = (username) => {
  return api.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};
