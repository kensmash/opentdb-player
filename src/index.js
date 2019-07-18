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
        let token;
        const localToken = localStorage.getItem("apiToken");
        if (!localToken) {
          token = await axios.get(
            "https://opentdb.com/api_token.php?command=request"
          );
        }
        dispatch({
          type: "GET_TOKEN",
          payload: localToken ? localToken : token.data.token
        });
        let categories;
        const localCats = JSON.parse(localStorage.getItem("categories"));

        if (!localCats) {
          categories = await axios.get("https://opentdb.com/api_category.php");
        }
        dispatch({
          type: "GET_CATEGORIES",
          payload: localCats ? localCats : categories.data.trivia_categories
        });
        dispatch({
          type: "LOADING_SUCCESS"
        });
        //check other stuff in local storage
        //category
        const localCategory = JSON.parse(
          localStorage.getItem("selectedCategory")
        );
        if (localCategory) {
          dispatch({ type: "SET_CATEGORY", payload: localCategory });
        }
        //difficulty
        const localDifficulty = localStorage.getItem("selectedDifficulty");
        if (localDifficulty) {
          dispatch({ type: "SET_DIFFICULTY", payload: localDifficulty });
        }
        //questions
        const localQuestions = JSON.parse(localStorage.getItem("questions"));
        if (localQuestions) {
          dispatch({ type: "GET_QUESTIONS", payload: localQuestions });
        }
        //game started
        const localGameStarted = localStorage.getItem("gameStarted");
        if (localGameStarted) {
          dispatch({ type: "START_GAME", payload: localGameStarted });
        }
        //game ended
        const localGameEnded = localStorage.getItem("gameEnded");
        if (localGameEnded) {
          dispatch({ type: "END_GAME", payload: localGameEnded });
        }
        //round
        const localRound = localStorage.getItem("round");
        if (localRound) {
          dispatch({ type: "SET_ROUND", payload: Number(localRound) });
        }
        //score
        const localScore = localStorage.getItem("score");
        if (localScore) {
          dispatch({ type: "SET_SCORE", payload: Number(localScore) });
        }
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
      {state.isLoading === true ? <div>loading...</div> : <Routes />}
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
