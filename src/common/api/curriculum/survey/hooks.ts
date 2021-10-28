/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import { useQuery } from 'react-query';
import { SurveyResponse } from 'src/common/types';
import { DashboardIntf } from 'src/common/types/curriculum';
import { useCurriculum } from '../dashboard';

import { getSurveyMeta } from './requests';

export interface SurveyInfo {
  name: string;
  description: string;
}

export type SurveyWithInfo = SurveyInfo & SurveyResponse;

const getSurveyInfo = (
  moduleId: number,
  surveyId: number,
  curriculum?: DashboardIntf,
): SurveyInfo | null => {
  const surveyInfo = curriculum?.modules
    .find(({ id }) => id === moduleId)?.submodules
    .find(({ id, type }) => id === surveyId && type === 'SURVEY');

  if (!surveyInfo) {
    return null;
  }

  return {
    name: surveyInfo.name,
    description: surveyInfo.introduction,
  };
};

export function useSurveyMeta(surveyId: number) {
  return useQuery(['survey-meta', { surveyId }], () => getSurveyMeta(surveyId));
}

export function useSurvey(moduleId: number, surveyId: number): {
  isLoading: boolean,
  data: SurveyWithInfo | null,
} {
  const { data: surveyMeta, isLoading: isLoadingMeta } = useSurveyMeta(surveyId);
  const { data: curriculum, isLoading: isLoadingCurr } = useCurriculum(1);

  const isLoading = isLoadingCurr || isLoadingMeta;
  const surveyInfo = getSurveyInfo(moduleId, surveyId, curriculum);
  const data: SurveyWithInfo | null = isLoading ? null :
    (surveyInfo && surveyMeta) ? { ...surveyMeta, ...surveyInfo } : null;

  return {
    data,
    isLoading,
  };
}
