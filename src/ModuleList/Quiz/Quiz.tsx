import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getQuizMeta } from 'src/common/api/curriculum/quiz/requests'

interface Params {
  moduleId: string;
  quizId: string;
}

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const getQuizData = async () => {
      const questions = await getQuizMeta(quizId);
      setQuestions(questions);
    };
    getQuizData();
  }, []);

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Quiz: {quizId}
      </h2>

      {questions.map((q: Question, qIndex) => (
        <div>
          <p>{ q.question }</p>
          <div>
            {q.options.map(option => (
              <div>
                <input type="radio" id={option} name={qIndex.toString()} value={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <input type="submit" value="Submit Quiz" />
    </div>
  );
};

export default Quiz;