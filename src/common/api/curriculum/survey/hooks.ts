import { useQuery } from 'react-query';

import { getSurveyMeta } from './requests';

export function useSurveyMeta(surveyId: number) {
  return useQuery(['survey-meta', { surveyId }], (_, { surveyId }) => getSurveyMeta(surveyId));
}
