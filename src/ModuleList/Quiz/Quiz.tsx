import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  moduleId: string;
  quizId: string;
}

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Quiz: {quizId}
      </h2>
    </div>
  );
};

export default Quiz;