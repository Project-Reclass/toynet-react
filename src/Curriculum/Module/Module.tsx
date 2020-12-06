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