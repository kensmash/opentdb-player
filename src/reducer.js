export default function reducer(state, action) {
  switch (action.type) {
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
    case "GET_QUESTIONS": {
      return {
        ...state,
        questions: action.payload
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
