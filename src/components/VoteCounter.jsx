import React, { useContext, useState } from "react";

export default function VoteCounter({
  votes,
  counterId,
  voteUpdater,
  setVoteResponse,
}) {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [disableBtns, setdisableBtns] = useState(false);

  function handleVote(voteNum) {
    setdisableBtns(true);
    setCurrentVotes((currVotes) => currVotes + voteNum);
    setVoteResponse("Vote successful!");

    voteUpdater(counterId, voteNum)
      .then((apiVotes) => {
        setCurrentVotes(() => apiVotes);
      })
      .catch((error) => {
        setVoteResponse("Failed to vote...try again later");
        setCurrentVotes((currVotes) => currVotes - voteNum);
      })
      .finally(() => {
        setdisableBtns(false);
        setVoteResponse(null);
      });
  }

  return (
    <div className="vote-btns">
      <button
        onClick={() => handleVote(1)}
        disabled={disableBtns}
        aria-label="up vote"
      >
        ⬆︎
      </button>
      Vote: {currentVotes}
      <button
        onClick={() => handleVote(-1)}
        disabled={disableBtns}
        aria-label="down vote"
      >
        ⬇︎
      </button>
    </div>
  );
}
