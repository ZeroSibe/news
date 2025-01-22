import React, { useContext, useState } from "react";
import { updateArticleVotes } from "../utils/api";
import VoteCounter from "./VoteCounter";
import { UserContext } from "../contexts/UserContext";

export default function ArticleBtns({ votes, comment_count, articleId }) {
  const [voteResponse, setVoteResponse] = useState(null);
  const { user } = useContext(UserContext);

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

        <button aria-label="go to comments" className="article-btns">
          Comment: {comment_count}
        </button>
      </div>
      {voteResponse && <p>{voteResponse}</p>}
    </div>
  );
}
