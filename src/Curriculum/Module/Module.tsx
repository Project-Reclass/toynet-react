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
<http://www.gnu.org/licenses/>.  */
import React, { FC } from 'react';
import { Collapse, Flex, Text, useDisclosure } from '@chakra-ui/core';

import { CurriculumBox } from '../styled';

import { RotatableIcon } from './styled';
import SubModuleList from './SubModuleList';
import { ModuleInterface } from './types';

interface Props {
  subModules: ModuleInterface[];
}

const Module: FC<Props & ModuleInterface> = ({ title, subModules }) => {
  const { isOpen, onToggle } = useDisclosure(false);

  return (
    <div>
      <CurriculumBox>
        <Flex onClick={onToggle} cursor='pointer'>
          <RotatableIcon
            name={'triangle-up'}
            rotated={isOpen}
            size='1.5rem'
            marginY='auto'
            marginX='1rem'
          />
          <Text fontSize='2xl' color='white' userSelect='none'>
            {title}
          </Text>
        </Flex>
      </CurriculumBox>
      <Collapse isOpen={isOpen}>
        <SubModuleList subModules={subModules} />
      </Collapse>
    </div>
  );
};

export default Module;