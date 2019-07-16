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
        <li key={index}>
          <button
            className={`${
              answered
                ? playerAnswer === answer.answer
                  ? correct
                    ? "button button--correctanswer"
                    : "button button--incorrectanswer"
                  : "button button--disabledbutton"
                : "button button--answerbutton"
            }`}
            disabled={answered}
            onClick={() => submitAnswerHandler(answer)}
          >
            {answer.answer}
          </button>
        </li>
      ))}
    </ul>
  );
}
