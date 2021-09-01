import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Icon } from '@chakra-ui/core';

import { ModuleInterface, ModuleTypes } from '../types';

import { ModuleName } from './styled';

interface Props extends ModuleInterface {
  index: number;
  count: number;
}

const createLink = ({ type, id, moduleId }: Pick<ModuleInterface, 'type' | 'id' | 'moduleId'>) => {
  if (type === ModuleTypes.VALUE) {
    return `/value/${id}`;
  }
  return `/module/${moduleId}/${type.toString()}/${id}`;
};

const capitalize = (s: string): string =>
  `${s[0].toUpperCase()}${s.slice(1)}`;

const SubModule: FC<Props> = ({ title, completed, id, moduleId, type, index, count }) => (
  <Flex>
    <Icon
      name='star'
      size='1.5rem'
      color={completed ? 'green.500' : ''}
    />
    <Stack spacing={2} width='100%' marginLeft='1.5rem'>
      <ModuleName href={createLink({ type, id, moduleId })}>
        <Text>
          {`${capitalize(type.toString())}: ${title}`}
        </Text>
        <Link>
          {'Go to Submodule >'}
        </Link>
      </ModuleName>
      {index !== count -1 && <Divider />}
    </Stack>
  </Flex>
);

export default SubModule;