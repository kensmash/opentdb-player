import React from "react";

export default function RoundProgress({ gameStarted, progressWidth }) {
  return (
    <div className="roundprogress--container">
      <div
        className="roundprogress"
        style={{ width: gameStarted === true ? "100%" : "0%" }}
      >
        <div className="playerroundprogress" style={{ width: progressWidth }} />
      </div>
    </div>
  );
}
