import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Progress, Grid } from '@chakra-ui/core';

import { ModuleInterface, ModuleTypes } from '../types';

import { ModuleName } from './styled';
import StatusIcon from './StatusIcon';

interface Props extends ModuleInterface {
  index: number;
  count: number;
}

const createLink = ({ type, id }: Pick<ModuleInterface, 'type' | 'id'>) => {
  if (type === ModuleTypes.VALUE) {
    return `/value/${id}`;
  }
  return `/module/${0}/${type.toString()}/${id}`;
};

const SubModule: FC<Props> = ({ title, progress, id, moduleId, type, index, count }) => (
  <Flex>
    <StatusIcon status={progress === 100 ? 'done' : 'unlocked'} />
    <Stack spacing={2} width='100%' marginLeft='1.5rem'>
      <Flex justifyContent='space-between'>
        <ModuleName fontSize='lg' color='white'>
          <Link
            href={createLink({ type, id })}
            maxW={250}
            display='block'
            isTruncated
          >
            {title}
          </Link>
        </ModuleName>
        <Grid
          gap={4}
          as='div'
          width='80%'
          marginY='auto'
          justifyItems='end'
          templateColumns='1fr 1fr'
        >
          <Text
            color='white'
            userSelect='none'
            cursor='default'
          >
            {progress === 100 ? 'Completed' : 'Module progress'}
          </Text>
          <Progress
            width='100%'
            marginY='auto'
            color={progress === 100 ? 'green' : 'yellow'}
            value={progress}
            borderRadius={3}
          />
        </Grid>
      </Flex>
      {index !== count -1 && <Divider />}
    </Stack>
  </Flex>
);

export default SubModule;