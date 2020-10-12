import { simulateNetwork } from 'src/common/utils';
import curriculums from 'src/__data__/curriculum/curriculums.json';

export const getAllCurriculums = () => {
  return simulateNetwork(() => curriculums);
};

export const getCurriculumById = (id: number) => {
  return simulateNetwork(() => (
    curriculums.find(value => value.id === id)
  ));
};