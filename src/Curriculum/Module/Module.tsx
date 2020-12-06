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
  const { isOpen, onToggle } = useDisclosure(true);

  return (
    <div>
      <CurriculumBox>
        <Flex>
          <RotatableIcon
            name={'triangle-up'}
            onClick={onToggle}
            rotated={isOpen}
            size='1.5rem'
            marginY='auto'
            marginX='1rem'
          />
          <Text fontSize='2xl' color='white' userSelect='none' cursor='default'>
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