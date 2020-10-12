import { useQuery } from 'react-query';
import { getAllQuizzes, getQuizById } from './requests';

export function useAllQuizzes() {
  return useQuery('quizzes', getAllQuizzes);
}

export function useQuiz(id: number) {
  return useQuery(['quiz', { id }], (_, { id }) => getQuizById(id));
}