import { simulateNetwork } from 'src/common/utils';
import quizzes from 'src/__data__/curriculum/quizzes.json';

export const getAllQuizzes = async () => {
  return simulateNetwork(() => quizzes);
};

export const getQuizById = (id: number) => {
  return simulateNetwork(() => (
    quizzes.find(quiz => quiz.id === id)
  ));
};
