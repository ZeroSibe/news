import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-apvv.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((res) => {
    return res.data.articles;
  });
};
