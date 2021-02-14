// Imported React Hooks!
import { useState, useEffect } from "react";
import React from "react";
import Display from "./Display";
import axios from "axios";
// import "./styles.css";
import "./App.css"

function App() {
  // default empty array
  const [triviaQuestions, setQuestions] = useState([]);
  const updateQuestions = async () => {
    try {
      // **** Note: Use custom query-param 'count' to limit search "/random?count=10"
      const questions = await axios("https://jservice.io/api/random?count=10");
      setQuestions(questions.data);
    } catch (error) {
      // console.log(error);
      console.log(`Oops! There was an error: ${error}`);
    }
  };

  // Score functions +/-/reset
  const [score, setScore] = useState(0);
  const increaseScore = () => {
    setScore(score + 1);
  };
  const decreaseScore = () => {
    setScore(score - 1);
  };
  const resetScore = () => {
    setScore(0);
  };

  // Important Index-State check
  const [index, setIndex] = useState(0);
  const updateIndex = () => setIndex(index + 1);

  // useEffect react-lifecycle-method
  useEffect(() => {
    updateQuestions();
  }, []);

  return (
    <div className="App">
      <h1>Welcome To Jeopardy</h1>
      <button className="next" onClick={updateIndex}>
        Next Question
      </button>
      <div className="jeopardy-score-button-container">
        <div className="jeopardy-score-details">
          {/* block-level displays underneath */}
          <div className="jeopardy-score">
            <span>Score:</span> {score}
          </div>
          {/* block-level displays underneath */}
          <div>
            <span>Category:</span>
            {/* category is being displayed to inline to the right of <span> */}
            {triviaQuestions.map((currQuestion, i) => {
              if (i === index) return currQuestion.category.title;
            })}
          </div>
          {/* block-level displays underneath */}
          <div>
            <span>Points:</span>
            {/* value is displayed to the right of the <span> */}
            {triviaQuestions.map((currQuestion, i) => {
              if (i === index) return currQuestion.value;
            })}
          </div>
          {/* block-level displays underneath but styled to display on right-side of screen */}
          <div className="jeopardy-score-buttons flex-container">
            <button onClick={increaseScore} className="jeopardy-btn-increase">
              Increase
            </button>
            <button onClick={decreaseScore} className="jeopardy-btn-decrease">
              Decrease
            </button>
            <button onClick={resetScore} className="jeopardy-btn-reset">
              Reset
            </button>
          </div>
        </div>

        {triviaQuestions.map((currQuestion, i) => {
          // very useful check that conditionally-displays single question by matching index
          if (i === index)
            return (
              <Display
                question={currQuestion.question}
                answer={currQuestion.answer}
              />
            );
        })}
      </div>
    </div>
  );
}

export default App;
