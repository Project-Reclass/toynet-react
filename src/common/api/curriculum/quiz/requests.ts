import axios from 'axios';

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuizMeta {
  data: Question[];
}

export const getQuizMeta = async (quizId: number): Promise<QuizMeta> => {
	const { data } = await axios.get(`/data/quiz/${quizId}/meta.json`);
	return data;
};