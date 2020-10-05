import React, { FC } from 'react';
import { Collapse, Flex, useDisclosure } from '@chakra-ui/core';

import SubModule from './SubModule';
import { DropdownContainer, RotatableIcon } from './styled';

export enum ModuleTypes {
  QUIZ = 'quiz',
  ARTICLE = 'article',
  PARENT = 'parent',
  EMULATOR = 'emulator',
}

export interface ModuleInterface {
  id: number | string;
  moduleId: number | string;
  title: string;
  progress: number;
  type: ModuleTypes;
}

interface Props {
  subModules: ModuleInterface[];
}

const SubModules: FC<Props> = ({ subModules }) => (
  <Flex flexDirection='column' alignItems='flex-end'>
    {subModules.map(module => (
      <SubModule
        {...module}
        key={`${module.id}-${module.title}-${module.moduleId}`}
      />
    ))}
  </Flex>
);

const Module: FC<Props & ModuleInterface> = ({ title, subModules }) => {
  const { isOpen, onToggle } = useDisclosure(true);

  return (
    <div>
      <DropdownContainer>
        <RotatableIcon
          name={'triangle-up'}
          onClick={onToggle}
          rotated={isOpen}
        />
        <span>
          {title}
        </span>
      </DropdownContainer>
      <Collapse isOpen={isOpen}>
        <SubModules subModules={subModules} />
      </Collapse>
    </div>
  );
};

export default Module;