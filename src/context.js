import React from "react";

const GameContext = React.createContext({
  isLoading: true,
  loadingError: false,
  apiToken: "",
  rounds: 7,
  categories: [],
  selectedCategory: "",
  difficulties: ["easy", "medium", "hard", "any"],
  selectedDifficulty: "",
  questions: [],
  gameStarted: false,
  gameEnded: false,
  round: 1,
  score: 0
});

export default GameContext;
