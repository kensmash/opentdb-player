import React, { useContext } from "react";

//context
import GameContext from "../context";

export default function Summary(props) {
  const { state, dispatch } = useContext(GameContext);

  const resetHandler = async () => {
    dispatch({ type: "RESET_GAME" });
    props.history.push("/");
  };

  let playerfeedback = "";
  const playerresult = (state.score / state.rounds) * 100;
  if (playerresult <= 40) {
    playerfeedback = "Ouch.";
  } else if (playerresult >= 41 && playerresult <= 59) {
    playerfeedback = "Hmm.";
  } else if (playerresult >= 60 && playerresult <= 79) {
    playerfeedback = "Cool.";
  } else if (playerresult >= 80) {
    playerfeedback = "Great!";
  }

  return (
    <div className="content-container summary-container">
      <h1>
        {playerfeedback} You got {state.score} out of {state.rounds} correct.
      </h1>

      <button
        className="button button--confirmbutton"
        onClick={() => resetHandler()}
      >
        New Game
      </button>
    </div>
  );
}
