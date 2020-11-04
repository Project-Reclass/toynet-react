import React from 'react';
import { useParams } from 'react-router-dom';

import { useLessonMeta } from '../../common/api/curriculum/lesson';

interface Params {
  moduleId: string;
  lessonId: string;
}

const Lesson = () => {
  const { moduleId, lessonId } = useParams<Params>();
  const { data } = useLessonMeta(Number(lessonId));

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Lesson: {lessonId}
      </h2>
      <p>Num Slides: {data?.numSlides || 0} </p>
    </div>
  );
};

export default Lesson;