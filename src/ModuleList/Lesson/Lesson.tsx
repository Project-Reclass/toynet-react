import React from 'react';
import { useParams } from 'react-router-dom';

import { useLesson } from './useLesson';

interface Params {
  moduleId: string;
  lessonId: string;
}

const Lesson = () => {
  const { moduleId, lessonId } = useParams<Params>();
  const lessonState = useLesson();

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Lesson: {lessonId}
      </h2>
      <p>Num Slides: {lessonState.state.numSlides} </p>
    </div>
  );
};

export default Lesson;