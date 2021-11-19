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
import { FC, memo } from 'react';
import { Box, Collapse, Flex, Text } from '@chakra-ui/react';
import { ModuleIntf } from 'src/common/types/curriculum';

import { RotatableTriangle } from './styled';
import SubModuleList from './SubModuleList';
import Corner, { Line } from 'src/common/components/Corner';
import TooltipIslocked from './TooltopIsLocked';

interface Props {
  index: number;
  locked: boolean;
  isLast: boolean;
  paddingTop?: string;
  isOpen: boolean;
  onClick: (index: number) => any;
}

const Module: FC<ModuleIntf & Props> = (
  {
    id,
    index,
    locked,
    introduction,
    name,
    submodules,
    isLast,
    isOpen,
    onClick,
  },
) => {
  return (
    <Box position='relative' pb={'2'}
    >
      <Flex onClick={() => onClick(index)} cursor='pointer'>
        {!isLast && <Line height='100%' position='absolute' />}
        <Flex justifyContent='space-between' width='100%' pt={`${index === 0 ? '1.5rem' : ''}`}>
          <Corner isLast={true} />
          <RotatableTriangle
            rotated={isOpen}
            color='white'
            size='1.5rem'
            marginY='auto'
            marginX='1rem'
            marginLeft='0.459rem'
          />
          <Flex justifyContent='space-between' width='100%'>
            <TooltipIslocked isLocked={locked}>
              <Text fontSize='2xl' userSelect='none'>
                {`Module ${index}: ${name}`}
              </Text>
            </TooltipIslocked>
            <Text fontSize='1xl' userSelect='none' m='auto 0'>
              {`${submodules.length} / ${submodules.length} completed, ${0} in progress`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box ml='calc(30px + 1rem + 0.459rem)'>
        <Collapse in={isOpen}>
          <Text fontSize='1xl' userSelect='none' m='1rem'>
            {introduction}
          </Text>
          <SubModuleList moduleId={id} submodules={submodules} />
        </Collapse>
      </Box>
    </Box>
  );
};

export default memo(Module);