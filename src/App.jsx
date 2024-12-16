import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
