export default function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING": {
      return {
        ...state,
        isLoading: true
      };
    }
    case "LOADING_ERROR": {
      return {
        ...state,
        isLoading: false,
        loadingError: true
      };
    }
    case "LOADING_SUCCESS": {
      return {
        ...state,
        isLoading: false
      };
    }
    case "GET_TOKEN": {
      localStorage.setItem("apiToken", action.payload);
      return {
        ...state,
        apiToken: action.payload
      };
    }
    case "GET_CATEGORIES": {
      localStorage.setItem("categories", JSON.stringify(action.payload));
      return {
        ...state,
        categories: action.payload
      };
    }
    case "SET_CATEGORY": {
      localStorage.setItem("selectedCategory", JSON.stringify(action.payload));
      return {
        ...state,
        selectedCategory: action.payload
      };
    }
    case "SET_DIFFICULTY": {
      localStorage.setItem("selectedDifficulty", action.payload);
      return {
        ...state,
        selectedDifficulty: action.payload
      };
    }
    case "GET_QUESTIONS": {
      localStorage.setItem("questions", JSON.stringify(action.payload));
      return {
        ...state,
        questions: action.payload
      };
    }
    case "START_GAME": {
      localStorage.setItem("gameStarted", action.payload);
      return {
        ...state,
        gameStarted: action.payload
      };
    }
    case "PLAYER_ANSWERED": {
      localStorage.setItem("answered", true);
      localStorage.setItem("playerAnswer", action.payload.answer);
      localStorage.setItem("correct", action.payload.correct ? true : false);
      return {
        ...state,
        answered: true,
        playerAnswer: action.payload.answer,
        correct: action.payload.correct ? true : false
      };
    }
    case "RESET_ROUND": {
      localStorage.setItem("answered", false);
      localStorage.setItem("playerAnswer", "");
      localStorage.setItem("correct", false);
      return {
        ...state,
        answered: false,
        playerAnswer: "",
        correct: false
      };
    }
    case "SET_FEEDBACK": {
      localStorage.setItem("feedback", action.payload);
      return {
        ...state,
        feedback: action.payload
      };
    }
    case "END_GAME": {
      localStorage.setItem("gameEnded", action.payload);
      return {
        ...state,
        gameEnded: action.payload
      };
    }
    case "SET_ROUND": {
      localStorage.setItem("round", action.payload);
      return {
        ...state,
        round: action.payload
      };
    }
    case "SET_SCORE": {
      localStorage.setItem("score", action.payload);
      return {
        ...state,
        score: action.payload
      };
    }
    case "RESET_GAME": {
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("selectedDifficulty");
      localStorage.removeItem("questions");
      localStorage.removeItem("gameStarted");
      localStorage.removeItem("gameEnded");
      localStorage.removeItem("round");
      localStorage.removeItem("score");
      return {
        ...state,
        selectedCategory: {},
        selectedDifficulty: "",
        questions: [],
        gameStarted: false,
        gameEnded: false,
        round: 0,
        score: 0
      };
    }
    default:
      return state;
  }
}
