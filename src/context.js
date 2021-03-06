import React from "react";

const GameContext = React.createContext({
  isLoading: true,
  loadingError: false,
  apiToken: "",
  rounds: 7,
  categories: [],
  selectedCategory: {},
  selectedDifficulty: "",
  difficulties: ["easy", "medium", "hard", "any"],
  questions: [],
  gameStarted: false,
  answered: false,
  playerAnswer: "",
  correct: false,
  gameEnded: false,
  round: 0,
  score: 0
});

export default GameContext;
