import React, { useState, useRef } from "react";
import questionsData from "../mock/questions.json";

const Survey = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionRefs = useRef([]);

  const handleOptionSelect = (id, option) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, answered: true, answer: option } : q
    );
    setQuestions(updatedQuestions);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeout(() => {
        const nextRef = questionRefs.current[currentQuestion + 1];
        if (nextRef) {
          const container = nextRef.parentElement;
          const offset = -300;
          container.scrollTo({
            top: nextRef.offsetTop - offset,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-[30%] h-full bg-white shadow-2xl overflow-y-scroll relative">
        <div className="w-[30%] flex justify-center p-3 backdrop-blur-sm fixed bg-white bg-opacity-80 z-10">
          <img src="finley-s.png" width="180px" alt="Logo" />
        </div>

        {questions.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => (questionRefs.current[index] = el)}
            className={`p-4  ${index === 0 ? "mt-20" : "mt-5"} ${
              index > currentQuestion ? "hidden" : ""
            }`}
          >
            <h3 className="text-xl mb-4">{question.text}</h3>
            <div className="space-y-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(question.id, option)}
                  className={`w-full py-2 px-4 border rounded-3xl transition-colors ${
                    question.answered
                      ? question.answer === option
                        ? "bg-black text-white"
                        : "bg-gray-500 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                  disabled={question.answered}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        {currentQuestion === questions.length && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <p className="text-sm text-gray-700">
              Scroll up and down to review your answers.
            </p>
          </div>
        )}

        <div className="h-[50vh]"></div>
      </div>
    </div>
  );
};

export default Survey;
