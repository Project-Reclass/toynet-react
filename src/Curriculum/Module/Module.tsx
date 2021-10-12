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
import React, { FC } from 'react';
import { Box, Collapse, Flex, Text, Tooltip } from '@chakra-ui/core';
import { ModuleIntf } from 'src/common/types/curriculum';

import { RotatableIcon } from './styled';
import SubModuleList from './SubModuleList';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

interface Props {
  index: number;
  locked: boolean;
  paddingTop?: string;
}

const withToolTip = (Component: React.ReactNode) => (
  <Tooltip
    hasArrow
    label='🔒 This module is currently locked.'
    {...{'aria-label': 'This module is currently locked.'}}
  >
    {Component}
  </Tooltip>
);

/**
 * Wraps a components with a tooltip that is only shown if `isLocked` is true
 */
const TooltipIslocked: React.FC<{isLocked: boolean}> = ({children, isLocked}) => {
  if (isLocked)
    return withToolTip(children);

  return <>{children}</>;
};

const Module: FC<ModuleIntf & Props> = (
  {
    id,
    index,
    locked,
    introduction,
    name,
    submodules,
    paddingTop,
  },
) => {
  const [isOpen, setOpen] =
    useSessionStorage<boolean>(`module-${id}-${index}`, false,
      value => JSON.parse(value));

  return (
    <Box
    paddingTop={paddingTop}
    borderLeft={'2pt solid white'}
    >
      <Flex onClick={() => setOpen(open => !open)} cursor='pointer'>
        <RotatableIcon
          name={'triangle-up'}
          rotated={isOpen}
          size='1.5rem'
          marginY='auto'
          marginX='1rem'
        />
        <Flex justifyContent='space-between' width='100%'>
          <TooltipIslocked isLocked={locked}>
            <Text fontSize='2xl' userSelect='none'>
              {`Module ${index + 1}: ${name}`}
            </Text>
          </TooltipIslocked>
          <Text fontSize='1xl' userSelect='none' m='auto 0'>
            {`${submodules.length} / ${submodules.length} completed, ${submodules.length} in progress`}
          </Text>
        </Flex>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Text fontSize='1xl' userSelect='none' m='1rem'>
          {introduction}
        </Text>
        <SubModuleList moduleId={id} submodules={submodules} />
      </Collapse>
    </Box>
  );
};

export default Module;