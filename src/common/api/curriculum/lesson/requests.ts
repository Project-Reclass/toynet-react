import axios from 'axios';

import meta from './meta.json';

type LessonSlideURI = string;
interface Meta {
  id: number;
  numSlides: number;
}

export const getLessonSlide = async (submoduleId: number, quizId: number): Promise<LessonSlideURI> => {
  const { data } = await axios.get(`/engine/lesson/data/${submoduleId}/${quizId}.png`);
  return data;
};

export const getLessonMeta = async (submoduleId: number): Promise<Meta | undefined> => {
  return Promise.resolve(meta.find(submodule => submodule.id === submoduleId));
};
