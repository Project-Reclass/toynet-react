import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Progress } from '@chakra-ui/core';

import { ModuleInterface } from '../types';

import { ModuleName } from './styled';
import StatusIcon from './StatusIcon';

const SubModule: FC<ModuleInterface & {index:number, count:number}> = ({ title, progress, id, moduleId, type, index, count }) => (
  <Flex>
    <StatusIcon status={progress === 100 ? 'done' : 'unlocked'} />
    <Stack spacing={2} width='100%' marginLeft='1.5rem'>
      <Flex justifyContent='space-between'>
        <ModuleName fontSize='lg' color='white'>
          <Link href={`/module/${moduleId}/${type.toString()}/${id}`}>
            {title}
          </Link>
        </ModuleName>
        <Flex width='80%' marginY='auto' as='div' justifyContent='space-between'>
          <Text color='white'>{progress === 100 ? 'Completed' : 'Module progress'}</Text>
          <Progress value={progress} borderRadius={3} width='80%' marginY='auto' />
        </Flex>
      </Flex>
      {index !== count -1 && <Divider />}
    </Stack>
  </Flex>
);

export default SubModule;