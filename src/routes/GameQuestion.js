import React, { useState, useContext } from "react";
import Answers from "../components/Answers";
import Feedback from "../components/Feedback";
import GameContext from "../context";

export default function GamePlay(props) {
  const { state, dispatch } = useContext(GameContext);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const questionindex = props.match.params._id - 1;

  const nextRoundHandler = () => {
    if (questionindex === state.questions.length) {
      setGameOver(true);
      props.history.push("summary");
    } else {
      dispatch({ type: "SET_ROUND", payload: state.round + 1 });
      props.history.push(`/question/${state.round}`);
    }
  };

  const submitAnswerHandler = answer => {
    if (answer.correct) {
      dispatch({ type: "SET_SCORE", payload: state.score + 1 });
      setFeedback("Heck yeah son!");
    } else {
      setFeedback(
        `Turrible. The correct answer is ${
          state.questions[questionindex].answers.find(answer => answer.correct)
            .answer
        }.`
      );
    }
  };

  let advanceText = "Next Round";
  if (gameOver) {
    advanceText = "Finish Game";
  }
  return (
    <div>
      <p>Round {state.round}</p>
      <div>
        <h2>{state.questions[questionindex].question}</h2>
        <Answers
          answers={state.questions[questionindex].answers}
          submitAnswerHandler={answer => submitAnswerHandler(answer)}
        />
        {feedback !== "" && (
          <Feedback
            feedback={feedback}
            advanceText={advanceText}
            nextRoundHandler={nextRoundHandler}
          />
        )}
      </div>
    </div>
  );
}
