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
      return {
        ...state,
        apiToken: action.payload
      };
    }
    case "GET_CATEGORIES": {
      return {
        ...state,
        categories: action.payload
      };
    }
    case "SET_CATEGORY": {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }
    case "GET_QUESTIONS": {
      return {
        ...state,
        questions: action.payload
      };
    }
    case "SET_SCORE": {
      return {
        ...state,
        score: action.payload
      };
    }
    case "SET_ROUND": {
      return {
        ...state,
        round: action.payload
      };
    }
    case "REMOVE_QUESTIONS": {
      return {
        ...state,
        questions: []
      };
    }
    default:
      return state;
  }
}
