import { useQuery } from 'react-query';

import { getQuizMeta } from './requests';

export function useQuizMeta(quizId: number) {
  return useQuery(['quiz-meta', { quizId }], (_, { quizId }) => getQuizMeta(quizId));
}
