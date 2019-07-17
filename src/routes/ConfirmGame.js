import React, { useState, useContext } from "react";
import axios from "axios";
import he from "he";
//context
import GameContext from "../context";

export default function ConfirmGame(props) {
  const { state, dispatch } = useContext(GameContext);
  const [tokenRetry, setTokenRetry] = useState(0);

  const clearTokenHandler = async () => {
    setTokenRetry(tokenRetry + 1);
    console.log("token retry called", tokenRetry);
    //first attempt to reset token
    if (tokenRetry === 1) {
      try {
        const resetToken = await axios.get(
          `https://opentdb.com/api_token.php?command=reset&token=${
            state.apiToken
          }`
        );
        dispatch({
          type: "GET_TOKEN",
          payload: resetToken.data.token
        });
        startGameHandler();
      } catch (error) {
        dispatch({
          type: "LOADING_ERROR"
        });
      }
    } else {
      try {
        //else try get new token
        const newToken = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        dispatch({
          type: "GET_TOKEN",
          payload: newToken.data.token
        });
        startGameHandler();
      } catch (error) {
        dispatch({
          type: "LOADING_ERROR"
        });
      }
    }
  };

  const startGameHandler = async () => {
    let token, difficulty;
    if (state.apiToken && tokenRetry <= 1) {
      token = `&token=${state.apiToken}`;
    }
    if (state.selectedDifficulty !== "any") {
      difficulty = `&difficulty=${state.selectedDifficulty}`;
    }
    //fetch questions
    dispatch({ type: "IS_LOADING" });
    const request = `https://opentdb.com/api.php?amount=7&category=${
      state.selectedCategory.id
    }${difficulty}${token}`;

    try {
      axios.get(request).then(response => {
        //on success
        if (response.data.response_code === 0) {
          const unParsedQuestions = response.data.results.slice();
          const shuffledQuestions = unParsedQuestions.sort(
            () => Math.random() - 0.5
          );
          let parsedQuestions = [];
          shuffledQuestions.forEach(function(question) {
            const incorrectAnswers = question.incorrect_answers;
            const answersArray = incorrectAnswers.map(answer => ({
              answer: he.decode(answer),
              correct: false
            }));
            const correctAnswerObject = {
              answer: he.decode(question.correct_answer),
              correct: true
            };
            answersArray.push(correctAnswerObject);
            let sortedAnswers = [];
            if (answersArray.length > 2) {
              sortedAnswers = answersArray.sort(() => Math.random() - 0.5);
            } else {
              sortedAnswers = answersArray.sort(function(a, b) {
                if (a.answer < b.answer) {
                  return 1;
                } else {
                  return -1;
                }
              });
            }
            const questionInformation = {
              question: he.decode(question.question),
              answers: sortedAnswers
            };
            parsedQuestions.push(questionInformation);
          });
          dispatch({ type: "GET_QUESTIONS", payload: parsedQuestions });
          dispatch({ type: "LOADING_SUCCESS" });
          dispatch({ type: "START_GAME", payload: true });
          dispatch({ type: "SET_ROUND", payload: 1 });
          //then push to new route
          props.history.push("/question/1");
        } else {
          //we had an error from the api
          console.log("oops", response.data.response_code);
          dispatch({ type: "LOADING_SUCCESS" });
          //TODO: deal with error somehow
          if (
            response.data.response_code === 3 ||
            response.data.response_code === 4
          ) {
            clearTokenHandler();
          }
        }
      });
    } catch (error) {
      dispatch({
        type: "LOADING_ERROR"
      });
    }
  };

  return (
    <div className="content-container setup-container confirm-container">
      <h1>{state.selectedCategory.name}</h1>
      <h1>
        Difficulty:{" "}
        <span style={{ textTransform: "capitalize" }}>
          {state.selectedDifficulty}
        </span>
      </h1>
      <button
        className="button button--confirmbutton"
        onClick={() => startGameHandler()}
      >
        Start Game
      </button>
    </div>
  );
}
