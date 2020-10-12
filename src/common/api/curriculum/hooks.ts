import { useQuery } from 'react-query';
import { getAllCurriculums, getCurriculumById } from './requests';

export function useAllCurriculums() {
  return useQuery('curriculums', getAllCurriculums);
}

export function useCurriculumById(id: number) {
  return useQuery(['curriculum', { id }], (_, { id }) => {
    return getCurriculumById(id);
  });
}