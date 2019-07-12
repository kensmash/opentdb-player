import React, { useContext } from "react";
import { useTrail, animated } from "react-spring";

import GameContext from "../context";

export default function ChooseDifficulty(props) {
  const { state, dispatch } = useContext(GameContext);

  const setDifficultyHandler = difficulty => {
    //dispatch here
  };

  const trail = useTrail(props.difficulties.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <div>
      <h1>Choose Difficulty</h1>
      <ul className="difficulties-grid difficulties-list">
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
