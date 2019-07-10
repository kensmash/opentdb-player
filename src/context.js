import React from "react";

const GameContext = React.createContext({
  apiToken: "",
  rounds: 7,
  categories: [],
  selectedCategory: "",
  difficulties: ["easy", "medium", "hard", "any"],
  selectedDifficulty: "",
  questions: []
});

export default GameContext;
