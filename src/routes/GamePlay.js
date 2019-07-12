import React, { useState } from "react";
import Answers from "..components/Answers";
import Feedback from "..components/Feedback";

export default function GamePlay(props) {
  const [questionindex, setQuestionindex] = useState(0);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameover, setGameover] = useState(false);

  const nextRoundHandler = () => {
    if (questionindex === 0) {
      return;
    }
    if (questionindex === props.questions.length) {
      return setGameover(true);
    } else {
      setRound(round + 1);
      setFeedback("");
    }
  };

  const submitAnswerHandler = answer => {
    setQuestionindex(questionindex + 1);
    if (answer.correct) {
      setScore(score + 1);
      setFeedback("Heck yeah son!");
    } else {
      setFeedback(
        `Turrible. The correct answer is ${
          props.questions[questionindex].answers.find(answer => answer.correct)
            .answer
        }.`
      );
    }
  };

  const { questions } = props;
  const currentQuestionIndex = round - 1;
  let advanceText = "Next Round";
  if (questionindex === props.questions.length) {
    advanceText = "Finish Game";
  }
  return (
    <div>
      <p>Round {round}</p>
      <div>
        <h2>{questions[currentQuestionIndex].question}</h2>
        <Answers
          answers={questions[currentQuestionIndex].answers}
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
