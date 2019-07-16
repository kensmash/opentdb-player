import React, { useContext } from "react";

import GameContext from "../context";

export default function ChooseCategory(props) {
  const { state, dispatch } = useContext(GameContext);

  const setCategoryHandler = category => {
    dispatch({ type: "SET_CATEGORY", payload: category });
    //then push to new route
    props.history.push("/difficulty");
  };

  return (
    <div className="content-container setup-container">
      <h1>Choose a Category</h1>
      <ul className="category-grid category-list">
        {state.categories.map(cat => (
          <li key={cat.id} onClick={() => setCategoryHandler(cat)}>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
