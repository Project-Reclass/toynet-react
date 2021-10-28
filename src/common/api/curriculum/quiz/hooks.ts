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
import { DashboardIntf } from 'src/common/types/curriculum';
import { useCurriculum } from '../dashboard';

import { getQuizMeta, QuizResponse } from './requests';

export interface QuizInfo {
  name: string;
  description: string;
}

export type QuizWithInfo = QuizInfo & QuizResponse;

const getQuizInfo = (
  moduleId: number,
  quizId: number,
  curriculum?: DashboardIntf,
): QuizInfo | null => {
  const quizInfo = curriculum?.modules
    .find(({ id }) => id === moduleId)?.submodules
    .find(({ id, type }) => id === quizId && type === 'QUIZ');

  if (!quizInfo) {
    return null;
  }

  return {
    name: quizInfo.name,
    description: quizInfo.introduction,
  };
};

export function useQuizMeta(quizId: number) {
  return useQuery(['quiz-meta', { quizId }], () => getQuizMeta(quizId));
}

export function useQuiz(moduleId: number, quizId: number): {
  isLoading: boolean,
  data: QuizWithInfo | null,
} {
  const { data: quizData, isLoading: isQuizLoading } = useQuizMeta(quizId);
  const { data: currData, isLoading: isCurrLoading } = useCurriculum(1);

  const isLoading = isQuizLoading || isCurrLoading;
  const quizInfo = getQuizInfo(moduleId, quizId, currData);
  const data: QuizWithInfo | null = isLoading ? null :
    (quizData && quizInfo) ? { ...quizData, ...quizInfo} : null;

  return {
    data,
    isLoading,
  };
}