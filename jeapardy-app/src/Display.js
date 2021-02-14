import React, { useState, useEffect } from "react";

const Display = ({ question, answer }) => {
  // useState Hook
  const [showAnswerState, setAnswerStateHandler] = useState(false);

  // handleClick-event
  const handleClick = () => {
    // sets State to opposite boolean value using bang-operator
    setAnswerStateHandler(!showAnswerState);
  };

  return (
    <div className="display-container">
      <div className="displayed-question"> {question} </div>
      <button className="show-answer-btn" onClick={handleClick}>
        Reveal Answer
      </button>
      {/* double conditional && */}
      <div className="shown-answer"> {showAnswerState && answer} </div>
    </div>
  );
};

export default Display;
