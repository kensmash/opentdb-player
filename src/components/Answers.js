import React from "react";

export default function Answers({
  answers,
  answered,
  playerAnswer,
  correct,
  submitAnswerHandler
}) {
  return (
    <ul className="answers-list">
      {answers.map((answer, index) => (
        <li
          key={index}
          className={`button button--answerbutton ${
            answered && playerAnswer === answer.answer
              ? correct
                ? "button--correctanswer"
                : "button--incorrectanswer"
              : null
          }`}
          onClick={() => submitAnswerHandler(answer)}
        >
          {answer.answer}
        </li>
      ))}
    </ul>
  );
}
