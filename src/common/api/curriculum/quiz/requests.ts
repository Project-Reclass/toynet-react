import axios from 'axios';

export const getQuizMeta = async (quizId: string) => {
	const { data } = await axios.get(`/data/quiz/${quizId}/meta.json`);
	return data;
};