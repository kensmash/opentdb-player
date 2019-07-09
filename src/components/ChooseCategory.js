import React from "react";
import { useTrail, animated } from "react-spring";

export default function ChooseCategory(props) {
  const trail = useTrail(props.categories.length, {
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return (
    <div>
      <h2>Choose a Category</h2>
      <ul>
        {trail.map((animation, index) => (
          <animated.li
            style={animation}
            key={props.categories[index].id}
            onClick={() => props.setCategoryHandler(props.categories[index])}
          >
            {props.categories[index].name}
          </animated.li>
        ))}
      </ul>
    </div>
  );
}
