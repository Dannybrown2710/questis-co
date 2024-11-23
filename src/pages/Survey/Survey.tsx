import React, { useState, useRef } from "react";
import questionsData from "../../mock/questions.json";
import Question from "./component/Question.tsx";
import "./Survey.css";
const Survey = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOptionSelect = (id, option) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, answered: true, answer: option } : q
    );

    setQuestions(updatedQuestions);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);

      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          const nextRef = questionRefs.current[currentQuestion + 1];
          if (nextRef) {
            const container = nextRef?.parentElement || document.body;
            const offset = 120;
            container.scrollTo({
              top: nextRef.offsetTop - offset,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }, 500);
  };

  return (
    <div className="survey-container">
      <div className={`survey-card`}>
        <div className="survey-header">
          <img
            src="finley-s.png"
            width="100px"
            alt="Logo"
            className="h-[25px]"
          />
        </div>

        {questions.map((question, index) => (
          <Question
            currentQuestion={currentQuestion}
            handleOptionSelect={handleOptionSelect}
            index={index}
            question={question}
            questionRefs={questionRefs}
            key={`question-${index}`}
          />
        ))}

        <div className="h-[50vh]"></div>
      </div>
    </div>
  );
};

export default Survey;
