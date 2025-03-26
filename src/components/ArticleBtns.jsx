import React, { useContext, useState } from "react";
import { updateArticleVotes } from "../utils/api";
import VoteCounter from "./VoteCounter";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function ArticleBtns({ votes, comment_count, articleId }) {
  const [voteResponse, setVoteResponse] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleComment = () => {
    if (window.location.hash === "#comments") {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
    navigate(`/articles/${articleId}#comments`);
  };

  return (
    <div>
      <div className="horizontal-align">
        {user ? (
          <VoteCounter
            votes={votes}
            counterId={articleId}
            voteUpdater={updateArticleVotes}
            setVoteResponse={setVoteResponse}
          />
        ) : (
          <button
            aria-label="vote article"
            className="article-btns"
            onClick={() => setVoteResponse("Login to vote")}
          >
            Votes: {votes}
          </button>
        )}

        <button
          aria-label="go to comments"
          className="article-btns"
          onClick={handleComment}
        >
          Comment: {comment_count}
        </button>
      </div>
      {voteResponse && <p>{voteResponse}</p>}
    </div>
  );
}
