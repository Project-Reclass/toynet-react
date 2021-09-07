import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { SubModuleIntf } from 'src/common/types/curriculum';

import SubModule from './SubModule/SubModule';

interface Props {
  moduleId: number;
  submodules: SubModuleIntf[];
}

const SubModuleList: FC<Props> = ({ moduleId, submodules }) => (
  <Flex flexDirection='column' width='80%' marginLeft='auto' marginBottom='2rem'>
    {submodules.map((module, idx) => (
      <SubModule
        {...module}
        index={idx}
        moduleId={moduleId}
        count={submodules.length}
        key={`${module.id}-${module.name}`}
      />
    ))}
  </Flex>
);

export default SubModuleList;