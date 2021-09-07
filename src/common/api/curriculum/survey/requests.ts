import axios from 'axios';

export interface SurveyQuestion {
  item_type: string;
  question: string;
  options?: string[];
  unit?: string;
}

interface SurveyResponse {
  items: SurveyQuestion[]
}

export const getSurveyMeta = async (surveyId: number): Promise<SurveyResponse> => {
	const { data } = await axios.get(`/api/survey/${surveyId}`);
	return data;
};


