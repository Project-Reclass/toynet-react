import axios from 'axios';

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export const getQuizMeta = async (quizId: number): Promise<Question[]> => {
	const { data } = await axios.get(`/data/quiz/${quizId}/meta.json`);
	return data;
};