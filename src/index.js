import React, { useContext, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
//context stuff
import GameContext from "./context";
import GameReducer from "./reducer";
//routes
import Routes from "./routes";
//styles
import "./normalize.css";
import "./index.css";

const App = () => {
  //set up global context
  const initialState = useContext(GameContext);
  const [state, dispatch] = useReducer(GameReducer, initialState);

  //on component load, fetch data and update our context token and categories state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        dispatch({ type: "GET_TOKEN", payload: token.data.token });
        const categories = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        dispatch({
          type: "GET_CATEGORIES",
          payload: categories.data.trivia_categories
        });
        dispatch({
          type: "LOADING_SUCCESS"
        });
      } catch (error) {
        dispatch({
          type: "LOADING_ERROR"
        });
      }
    };

    fetchData();
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {state.isLoading ? (
        <div>loading...</div>
      ) : state.loadingError ? (
        <div>something went wrong</div>
      ) : (
        <Routes />
      )}
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
