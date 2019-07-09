import React, { useState, Fragment } from "react";

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
    <Fragment>
      {gameover ? (
        <div>
          <h2>You got {score} out of 7 right.</h2>
          <button onClick={() => props.newGameHandler()}>New Game</button>
        </div>
      ) : (
        <div>
          <p>Round {round}</p>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => submitAnswerHandler(answer)}>
                  {answer.answer}
                </button>
              </li>
            ))}
          </ul>
          {feedback !== "" && (
            <div>
              <h3>{feedback}</h3>
              <button onClick={() => nextRoundHandler()}>{advanceText}</button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}
