import axios from 'axios';

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export interface QuizResponse {
  items: Question[];
}

export const getQuizMeta = async (quizId: number): Promise<QuizResponse> => {
	const { data } = await axios.get(`/api/quiz/${quizId}`);
	return data;
};