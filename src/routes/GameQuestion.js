import React, { useState, useContext } from "react";
import Answers from "../components/Answers";
import Feedback from "../components/Feedback";
import { useTransition } from "react-spring";
//context
import GameContext from "../context";

export default function GameQuestion(props) {
  const { state, dispatch } = useContext(GameContext);
  const [answered, setAnswered] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");

  const transition = useTransition(feedback, null, {
    from: { opacity: 0, transform: `translate3d(0, -40px, 0)` },
    enter: { opacity: 1, transform: `translate3d(0, 0px, 0)` },
    leave: { opacity: 0, transform: `translate3d(0, -40px, 0)` }
  });

  const qid = Number(props.match.params._id);
  const questionindex = qid - 1;
  const nextquestion = qid + 1;

  const nextRoundHandler = () => {
    if (qid === state.questions.length) {
      dispatch({ type: "END_GAME" });
      props.history.push("/summary");
    } else {
      dispatch({ type: "SET_ROUND", payload: state.round + 1 });
      props.history.push(`/question/${nextquestion}`);
    }
  };

  const submitAnswerHandler = answer => {
    setAnswered(true);
    setPlayerAnswer(answer.answer);
    if (answer.correct) {
      setCorrect(true);
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
  if (qid === state.questions.length) {
    advanceText = "Finish Game";
  }
  return (
    <div className="content-container question-container">
      <h2>{state.questions[questionindex].question}</h2>
      <Answers
        answers={state.questions[questionindex].answers}
        answered={answered}
        playerAnswer={playerAnswer}
        correct={correct}
        submitAnswerHandler={answer => submitAnswerHandler(answer)}
      />
      {transition.map(
        ({ item, key, props: animation }) =>
          item && (
            <Feedback
              key={key}
              animation={animation}
              feedback={feedback}
              advanceText={advanceText}
              nextRoundHandler={nextRoundHandler}
            />
          )
      )}
    </div>
  );
}
