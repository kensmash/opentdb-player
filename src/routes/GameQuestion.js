import React, { useState, useContext } from "react";
import Answers from "../components/Answers";
import Feedback from "../components/Feedback";
import GameContext from "../context";

export default function GameQuestion(props) {
  const { state, dispatch } = useContext(GameContext);
  const [feedback, setFeedback] = useState("");

  const questionindex = props.match.params._id - 1;
  const nextquestion = Number(props.match.params._id) + 1;

  const nextRoundHandler = () => {
    if (questionindex === state.questions.length) {
      props.history.push("/summary");
    } else {
      props.history.push(`/question/${nextquestion}`);
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
  if (questionindex === state.questions.length) {
    advanceText = "Finish Game";
  }
  return (
    <>
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
    </>
  );
}
