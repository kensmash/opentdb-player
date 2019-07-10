import React from "react";

export default function Feedback({ feedback, advanceText, nextRoundHandler }) {
  return (
    <div>
      <h3>{feedback}</h3>
      <button onClick={() => nextRoundHandler()}>{advanceText}</button>
    </div>
  );
}
