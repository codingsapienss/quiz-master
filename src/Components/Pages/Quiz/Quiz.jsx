import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { CircularProgress } from "@mui/material";
import Question from "../../Questions.jsx/Question";

const Quiz = ({ name, questions, setQuestions, score, setScore }) => {
  const [currentQues, setCurrentQues] = useState(0);
  const [options, setOptions] = useState('');

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQues]?.correct_answer,
          ...questions[currentQues]?.incorrect_answers,
        ])
    );
  }, [questions, currentQues]);

  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  // console.log(questions);

  return (
    <div className="quizContainer">
      <span className="subTitle"> Welcome {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currentQues].category}</span>
            <span>Score : {score}</span>
          </div>

          <Question currentQues={currentQues} setCurrentQues={setCurrentQues} questions={questions}
          options={options} score={score} setScore={setScore} setQuestions={setQuestions} correct={questions[currentQues]?.correct_answer} />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Quiz;
