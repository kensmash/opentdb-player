import React from "react";
import { useTrail, animated } from "react-spring";

export default function ChooseDifficulty(props) {
  const trail = useTrail(props.difficulties.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <div>
      <h2>Choose Difficulty</h2>
      <ul>
        {trail.map((animation, index) => (
          <animated.li
            style={animation}
            key={props.difficulties[index]}
            onClick={() =>
              props.setDifficultyHandler(props.difficulties[index])
            }
          >
            {props.difficulties[index]}
          </animated.li>
        ))}
      </ul>
    </div>
  );
}
