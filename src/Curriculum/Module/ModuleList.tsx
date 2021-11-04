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
import { Flex } from '@chakra-ui/layout';
import { useState, useCallback, useMemo } from 'react';
import useQuerySearch from 'src/common/hooks/useQuerySearch';
import { ModuleIntf } from 'src/common/types/curriculum';
import { setQueryStringWithoutPageReload } from 'src/common/utils';

import Module from './Module';

function useIsModuleOpen(): [
  string[],
  (moduleIdx: string | number) => any,
] {
  const query = useQuerySearch();
  const [modulesOpen, setModulesOpen] = useState(() =>
    query.get('module')?.split(',') || []);

  const toggleModuleOpen = useCallback((moduleIdx: string | number) => {
    const module = typeof moduleIdx === 'number' ? moduleIdx.toString() : moduleIdx;

    setModulesOpen(currModules => {
      const removeModule = (idx: string) => idx !== module;
      const updatedModules = currModules.includes(module) ?
        currModules.filter(removeModule) :
        [...currModules, module];

      query.set('module', updatedModules.join(','));
      setQueryStringWithoutPageReload(`?${query.toString()}`);

      return updatedModules;
    });
  }, [query]);

  return [modulesOpen, toggleModuleOpen];
}

interface Props {
  modules: ModuleIntf[];
}

export default function ModuleList({
  modules,
}: Props) {
  const [modulesOpen, toggleModuleOpen] = useIsModuleOpen();

  const modulesOpenSet = useMemo(() => new Set(modulesOpen), [modulesOpen]);

  return (
    <Flex
      width='80%'
      minW='25rem'
      maxW='70rem'
      margin='auto'
      flexDirection='column'
    >
      {
        modules.map((module, index) => (
          <Module
            {...module}
            key={module.id}
            isLast={index === modules.length - 1}
            index={index}
            locked={false}
            onClick={toggleModuleOpen}
            isOpen={modulesOpenSet.has(index.toString())}
            paddingTop={index === 0 ? '2rem' : ''}
          />
        ))
      }
    </Flex>
  );
}