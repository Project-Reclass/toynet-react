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
import { useMemo, useState, useCallback, useEffect } from 'react';
import { DashboardIntf } from 'src/common/types/curriculum';
import { useCurriculum } from '../dashboard';

import { getLessonMeta, getLessonSlide, Meta } from './requests';

export interface LessonInfo {
  name: string;
  description: string;
}

export type LessonWithInfo = LessonInfo & Meta;


const getLessonInfo = (
  moduleId: number,
  lessonId: number,
  curriculum?: DashboardIntf,
): LessonInfo | null => {
  const lessonInfo = curriculum?.modules
    .find(({ id }) => id === moduleId)?.submodules
    .find(({ id, type }) => id === lessonId && type === 'LESSON');

  if (!lessonInfo) {
    return null;
  }

  return {
    name: lessonInfo.name,
    description: lessonInfo.introduction,
  };
};

export function useLessonSlide(submoduleId: number, slideNumber: number) {
  return useQuery(['lesson-slide', { submoduleId, slideNumber }], () => getLessonSlide(submoduleId, slideNumber));
}

export function useLessonMeta(submoduleId: number) {
  return useQuery(['lesson-meta', { submoduleId }], () => getLessonMeta(submoduleId));
}

export function useLessonSlidesSrc(moduleId: number, meta?: Meta): string[] {
  return useMemo(() => new Array(meta?.numSlides)
    .fill('').map((_, i) => `/data/lesson/${moduleId}/${i}.png`)
  , [meta?.numSlides, moduleId]);
}

export function useLessonSlides(moduleId: number, meta?: Meta): {
  srcs: string[];
  currSrc: string;
  isNextSlide: boolean;
  isPrevSlide: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
} {
  const [currPage, setCurrPage] = useState(0);
  const srcs = useLessonSlidesSrc(moduleId, meta);

  const nextSlide = useCallback(() =>
    setCurrPage(prev => Math.min(prev + 1, (meta?.numSlides ?? 0) - 1)),
      [meta?.numSlides]);

  const prevSlide = useCallback(() =>
    setCurrPage(prev => Math.max(prev - 1, 0)), []);

  useEffect(() => {
    console.log({
      srcs,
      currSrc: srcs[currPage],
      isNextSlide: currPage < (meta?.numSlides ?? 0) - 1,
      isPrevSlide: currPage > 0,
      nextSlide,
      prevSlide,
    });
  }, [currPage, meta?.numSlides, nextSlide, prevSlide, srcs]);

  return {
    srcs,
    currSrc: srcs[currPage],
    isNextSlide: currPage < (meta?.numSlides ?? 0) - 1,
    isPrevSlide: currPage > 0,
    nextSlide,
    prevSlide,
  };
}

export function useLesson(moduleId: number, lessonId: number): {
  isLoading: boolean,
  data: LessonWithInfo | null,
} {
  const { data: lessonMeta, isLoading: isLessonLoading } = useLessonMeta(lessonId);
  const { data: currData, isLoading: isCurrLoading } = useCurriculum(1);

  const isLoading = isCurrLoading || isLessonLoading;
  const lessonInfo = getLessonInfo(moduleId, lessonId, currData);
  const data: LessonWithInfo | null = isLoading ? null :
    (lessonInfo && lessonMeta) ? { ...lessonInfo, ...lessonMeta } : null;

  return {
    isLoading,
    data,
  };
}