import axios from 'axios';

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuestionResponse {
  items: Question[]
}

export const getQuizMeta = async (quizId: number): Promise<QuestionResponse> => {
	const { data } = await axios.get(`/data/quiz/${quizId}/meta.json`);
	return data;
};