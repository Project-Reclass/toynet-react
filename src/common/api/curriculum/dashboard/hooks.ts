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
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { SubModuleIntf, SubModuleType } from 'src/common/types/curriculum';
import { createLink } from 'src/common/utils';
import { getCurriculum } from './requests';

export function useCurriculum(curriculumId: number) {
  return useQuery(['curriculum-data', curriculumId], () =>
    getCurriculum(curriculumId));
}

const getLinkForNextSubmodule = (
  currIdx: number,
  submodules: SubModuleIntf[],
  curriculumId: number,
  moduleId: number,
): string => {
  if (currIdx === submodules.length - 1) {
    return `/dashboard/${curriculumId}`;
  }

  const { id, type } = submodules[currIdx + 1];
  return createLink({ type, id, moduleId });
};

const getLinkForPrevSubmodule = (
  currIdx: number,
  submodules: SubModuleIntf[],
  curriculumId: number,
  moduleId: number,
): string => {
  if (currIdx === 0) {
    return `/dashboard/${curriculumId}`;
  }

  const { id, type } = submodules[currIdx - 1];
  return createLink({ type, id, moduleId });
};

export function useCurriculumNavigator(
  curriculumId: number,
  moduleId: number,
  submoduleId: number,
  submoduleType: SubModuleType,
) {
  const history = useHistory();
  const { data, isLoading } = useCurriculum(curriculumId);
  const module = data?.modules.find(({ id }) => id === moduleId);

  const { submodules } = module || { submodules: [] as SubModuleIntf[] };
  const submoduleLength = submodules.length ?? 0;
  const currSubmoduleIndex = submodules.findIndex(({ id, type }) =>
    id === submoduleId && type === submoduleType);

  const isNext = currSubmoduleIndex !== -1 && currSubmoduleIndex < submoduleLength - 1;
  const isPrev = currSubmoduleIndex !== -1 && currSubmoduleIndex > 0;

  const next = useCallback(() => {
    history.push(getLinkForNextSubmodule(currSubmoduleIndex, submodules, curriculumId, moduleId));
  }, [currSubmoduleIndex, curriculumId, history, moduleId, submodules]);

  const prev = useCallback(() => {
    history.push(getLinkForPrevSubmodule(currSubmoduleIndex, submodules, curriculumId, moduleId));
  }, [currSubmoduleIndex, curriculumId, history, moduleId, submodules]);

  return {
    isLoading,
    isNext,
    isPrev,
    next,
    prev,
  };
}