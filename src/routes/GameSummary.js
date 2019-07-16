import React, { useContext } from "react";

//context
import GameContext from "../context";

export default function Summary(props) {
  const { state, dispatch } = useContext(GameContext);

  const resetHandler = async () => {
    dispatch({ type: "RESET_GAME" });
    props.history.push("/");
  };

  return (
    <div className="content-container">
      <h1>
        You got {state.score} out of {state.rounds} correct.
      </h1>

      <button className="button" onClick={() => resetHandler()}>
        New Game
      </button>
    </div>
  );
}
