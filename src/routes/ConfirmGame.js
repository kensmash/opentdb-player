import React, { useState, useContext } from "react";
import axios from "axios";
import he from "he";
//context
import GameContext from "../context";

export default function ConfirmGame(props) {
  const { state, dispatch } = useContext(GameContext);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const startGameHandler = async () => {
    setQuestionsLoading(true);
    let token, difficulty;
    if (state.apiToken) {
      token = `&token=${state.apiToken}`;
    }

    let request = `https://opentdb.com/api.php?amount=7&category=${
      state.selectedCategory.id
    }${token}`;

    if (state.selectedDifficulty !== "any") {
      difficulty = `&difficulty=${state.selectedDifficulty}`;
      request = `https://opentdb.com/api.php?amount=7&category=${
        state.selectedCategory.id
      }${difficulty}${token}`;
    }

    try {
      axios.get(request).then(response => {
        console.log("response code", response.data.response_code);
        //on success
        if (response.data.response_code === 0) {
          parseQuestionsHandler(response.data.results);
        } else if (response.data.response_code === 1) {
          // api does not have enough questions for query
        } else if (response.data.response_code === 3) {
          //session token expired
          newTokenHandler();
        } else if (response.data.response_code === 4) {
          //session token returned all questions for query, need to reset it
          resetTokenHandler();
        }
      });
    } catch (error) {
      //something wrong error happen
      console.log(error);
    }
  };

  const parseQuestionsHandler = questions => {
    const unParsedQuestions = questions.slice();
    const shuffledQuestions = unParsedQuestions.sort(() => Math.random() - 0.5);
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
        sortedAnswers = answersArray.sort((a, b) => {
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
    dispatch({ type: "START_GAME", payload: true });
    dispatch({ type: "SET_ROUND", payload: 1 });
    //then push to new route
    props.history.push("/question/1");
  };

  const resetTokenHandler = async () => {
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
  };

  const newTokenHandler = async () => {
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
  };

  return (
    <div className="content-container setup-container confirm-container">
      <h1>Game Settings</h1>
      <p className="confirm-text">
        Category:{" "}
        <span style={{ fontWeight: "bold" }}>
          {state.selectedCategory.name}
        </span>
      </p>
      <p className="confirm-text">
        Difficulty:{" "}
        <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
          {state.selectedDifficulty}
        </span>
      </p>
      {questionsLoading ? (
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      ) : (
        <button
          style={{ marginTop: 40 }}
          className="button button--confirmbutton"
          onClick={() => startGameHandler()}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
