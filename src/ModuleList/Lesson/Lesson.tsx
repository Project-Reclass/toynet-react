import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  moduleId: string;
  lessonId: string;
}

const Lesson = () => {
  const { moduleId, lessonId } = useParams<Params>();

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Lesson: {lessonId}
      </h2>
    </div>
  );
};

export default Lesson;