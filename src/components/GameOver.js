import React from "react";

export default function GameOver({ score, newGameHandler }) {
  return (
    <div>
      <h2>You got {score} out of 7 right.</h2>
      <button onClick={() => newGameHandler()}>New Game</button>
    </div>
  );
}
