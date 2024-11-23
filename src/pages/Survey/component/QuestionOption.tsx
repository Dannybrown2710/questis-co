import React from "react";
import { IQuestion } from "./Question";

interface IQuestionOption {
  handleOptionSelect: (id: number, option: string) => void;
  question: IQuestion;
  option: string;
  index: number;
}
function QuestionOption(props: IQuestionOption) {
  const { handleOptionSelect, question, option, index } = props;
  return (
    <button
      key={`${option}-${index}`}
      onClick={() => handleOptionSelect(question.id, option)}
      className={`w-full text-sm py-2 px-4 border rounded-3xl duration-500 transition-colors ${
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
  );
}

export default QuestionOption;
