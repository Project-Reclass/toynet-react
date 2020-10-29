import axios from 'axios';

type LessonSlideURI = string;
export interface Meta {
  numSlides: number;
}

export const getLessonSlide = async (submoduleId: number, slideId: number): Promise<LessonSlideURI> => {
  const { data } = await axios.get(`/lesson/${submoduleId}/${slideId}.png`);
  return data;
};

export const getLessonMeta = async (submoduleId: number): Promise<Meta | undefined> => {
  const { data } = await axios.get(`/lesson/${submoduleId}/meta.json`);
  return data;
};
