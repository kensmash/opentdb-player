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
      <h3>{feedback}</h3>
      <button onClick={() => nextRoundHandler()}>{advanceText}</button>
    </animated.div>
  );
}
