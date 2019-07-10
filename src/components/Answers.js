import React from "react";

export default function Answers({ answers, submitAnswerHandler }) {
  return (
    <ul className="answers-list">
      {answers.map((answer, index) => (
        <li key={index}>
          <button
            className="button--answerbutton"
            onClick={() => submitAnswerHandler(answer)}
          >
            {answer.answer}
          </button>
        </li>
      ))}
    </ul>
  );
}
