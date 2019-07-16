import React from "react";
import { animated } from "react-spring";

export default function Feedback({
  animation,
  feedback,
  advanceText,
  nextRoundHandler
}) {
  return (
    <animated.div style={animation}>
      <div className="feedback-container">
        <h3 className="feedback-text">{feedback}</h3>
        <button className="button" onClick={() => nextRoundHandler()}>
          {advanceText}
        </button>
      </div>
    </animated.div>
  );
}
