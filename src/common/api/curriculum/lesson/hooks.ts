import { useQuery } from 'react-query';

import { getLessonMeta, getLessonSlide } from './requests';

export function useLessonSlide(submoduleId: number, quizId: number) {
  return useQuery(['lesson-slide', { submoduleId, quizId }], (_, { submoduleId, quizId }) => getLessonSlide(submoduleId, quizId));
}

export function useLessonMeta
(submoduleId: number) {
  return useQuery(['lesson-meta', { submoduleId }], (_, { submoduleId }) => getLessonMeta(submoduleId));
}
