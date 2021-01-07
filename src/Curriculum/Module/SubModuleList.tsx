import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';

import { ModuleInterface } from './types';
import SubModule from './SubModule/SubModule';

interface Props {
  subModules: ModuleInterface[];
}

const SubModuleList: FC<Props> = ({ subModules }) => (
  <Flex flexDirection='column' width='80%' marginLeft='auto'>
    {subModules.map((module, idx) => (
      <SubModule
        {...module}
        index={idx}
        count={subModules.length}
        key={`${module.id}-${module.title}-${module.moduleId}`}
      />
    ))}
  </Flex>
);

export default SubModuleList;