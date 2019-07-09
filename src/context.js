import React from "react";

const GameContext = React.createContext({
  apiToken: "",
  rounds: 7,
  categories: [],
  difficulties: ["easy", "medium", "hard", "any"],
  questions: []
});

export default GameContext;
