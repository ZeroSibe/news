import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import TopicList from "./components/TopicList";
import ArticlesPage from "./components/ArticlesPage";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ArticleAdder from "./components/ArticleAdder";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/topics" element={<TopicList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/create-post" element={<ArticleAdder />} />
          <Route path="*" element={<ErrorPage error="404 Page Not Found" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
