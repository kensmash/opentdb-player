import React, { useContext } from "react";
import { useTrail, animated } from "react-spring";

import GameContext from "../context";

export default function ChooseCategory(props) {
  const { state, dispatch } = useContext(GameContext);

  const setCategoryHandler = category => {
    dispatch({ type: "SET_CATEGORY", payload: category });
    //then push to new route
    props.history.push("/difficulty");
  };

  const trail = useTrail(state.categories.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <animated.div className="content-container">
      <h1>Choose a Category</h1>
      <ul className="category-grid category-list">
        {trail.map((animation, index) => (
          <animated.li
            style={animation}
            key={state.categories[index].id}
            onClick={() => setCategoryHandler(state.categories[index])}
          >
            {state.categories[index].name}
          </animated.li>
        ))}
      </ul>
    </animated.div>
  );
}
