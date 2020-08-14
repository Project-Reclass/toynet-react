import React from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { moduleId, quizId } = useParams();

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