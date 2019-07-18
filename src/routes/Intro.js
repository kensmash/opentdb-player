import React, { useContext, useEffect } from "react";
//context
import GameContext from "../context";

export default function Intro(props) {
  const { dispatch } = useContext(GameContext);

  //clear data if we hit this page again
  useEffect(() => {
    const clearData = async () => {
      dispatch({ type: "START_GAME", payload: false });
      dispatch({ type: "RESET_ROUND" });
      dispatch({ type: "SET_FEEDBACK", payload: "" });
      dispatch({ type: "END_GAME", payload: false });
      dispatch({ type: "SET_ROUND", payload: 0 });
      dispatch({ type: "SET_SCORE", payload: 0 });
    };
    clearData();
  });

  const startHandler = async () => {
    props.history.push("/category");
  };

  return (
    <div className="content-container">
      <div className="introanimation" onClick={() => startHandler()}>
        <div>
          <h1>Shall We Play A Game?</h1>
        </div>
      </div>
      <div className="intro-content-container">
        <button
          className="button button--confirmbutton"
          onClick={() => startHandler()}
        >
          Start
        </button>
        <h4>
          Trivia Questions from the{" "}
          <a
            href="https://opentdb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Trivia Database
          </a>
        </h4>
      </div>
    </div>
  );
}
