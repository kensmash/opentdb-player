import React, { useContext } from "react";
//context
import GameContext from "../context";

export default function ChooseDifficulty(props) {
  const { state, dispatch } = useContext(GameContext);

  const setDifficultyHandler = async difficulty => {
    dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
    //then push to new route
    props.history.push("/confirmgame");
  };

  return (
    <div className="content-container setup-container">
      <h1>Choose Difficulty</h1>
      <ul className="difficulties-grid difficulties-list">
        {state.difficulties.map(diff => (
          <li key={diff} onClick={() => setDifficultyHandler(diff)}>
            {diff}
          </li>
        ))}
      </ul>
    </div>
  );
}
