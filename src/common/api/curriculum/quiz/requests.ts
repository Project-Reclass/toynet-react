import axios from 'axios';

export const getQuizMeta = async (quizId: number) => {
	const { data } = await axios.get(`/data/quiz/${quizId}/meta.json`);
	return data;
};