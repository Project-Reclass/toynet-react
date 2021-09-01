import React, { FC } from 'react';
import { Collapse, Flex, Text, useDisclosure } from '@chakra-ui/core';

import { RotatableIcon } from './styled';
import SubModuleList from './SubModuleList';
import { ModuleInterface } from './types';
import { useMemo } from 'react';

interface Props {
  description: string;
  subModules: ModuleInterface[];
}

const getCompletedSubModules = (subModules: ModuleInterface[]) =>
  subModules.reduce<number>((prev, curr) => prev + (curr.completed ? 1 : 0), 0);

const getInProgressSubModules = (subModules: ModuleInterface[]) =>
  subModules.reduce<number>((prev, curr) => prev + (curr.completed ? 1 : 0), 0);

const Module: FC<Props & ModuleInterface> = ({ description, title, subModules }) => {
  const { isOpen, onToggle } = useDisclosure(false);

  const numberCompleted = useMemo(() => getCompletedSubModules(subModules), [subModules]);
  const numberInProgress = useMemo(() => getInProgressSubModules(subModules), [subModules]);

  return (
    <div>
      <Flex onClick={onToggle} cursor='pointer'>
       <RotatableIcon
          name={'triangle-up'}
          rotated={isOpen}
          size='1.5rem'
          marginY='auto'
          marginX='1rem'
        />
        <Flex justifyContent='space-between' width='100%'>
          <Text fontSize='2xl' color='white' userSelect='none'>
            {title}
          </Text>
          <Text fontSize='1xl' color='white' userSelect='none' m='auto 0'>
            {`${numberCompleted} / ${subModules.length} completed, ${numberInProgress} in progress`}
          </Text>
        </Flex>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Text fontSize='1xl' color='white' userSelect='none' m='1rem'>
          {description}
        </Text>
        <SubModuleList subModules={subModules} />
      </Collapse>
    </div>
  );
};

export default Module;