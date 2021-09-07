import { useQuery } from 'react-query';
import { getCurriculum } from './requests';

export function useCurriculum(curriculumId: number) {
  return useQuery(['curriculum-data', curriculumId], () =>
    getCurriculum(curriculumId));
}