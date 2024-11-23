import React from "react";
import QuestionOption from "./QuestionOption.tsx";

export interface IQuestion {
  id: number;
  text: string;
  options: string[];
  answered: boolean;
  answer: string | null;
}
interface QuestionProp {
  question: IQuestion;
  questionRefs: any;
  currentQuestion: number;
  index: number;
  handleOptionSelect: (id: number, option: string) => void;
}
function Question(props: QuestionProp) {
  const { question, index, questionRefs, currentQuestion, handleOptionSelect } =
    props;
  return (
    <div
      key={question.id}
      ref={(el) => (questionRefs.current[index] = el)}
      className={`p-4 ${
        index === 0 ? "mt-28" : "mt-12"
      } transition-opacity duration-1000 ${
        index > currentQuestion ? "opacity-0" : "opacity-100"
      }`}
    >
      <h3 className="text-sm mb-4">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <QuestionOption
            question={question}
            handleOptionSelect={handleOptionSelect}
            index={index}
            key={index}
            option={option}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
