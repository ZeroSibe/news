import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import TopicList from "./components/TopicList";
import ArticlesPage from "./components/ArticlesPage";

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
