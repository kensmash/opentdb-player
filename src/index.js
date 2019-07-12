import React, { useContext, useReducer, useState, useEffect } from "react";
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
  //set up local state
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {isLoading ? <div>loading...</div> : <Routes />}
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
