import React from "react";

export default function Intro(props) {
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
