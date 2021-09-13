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
<http://www.gnu.org/licenses/>.

*/
import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Progress, Grid } from '@chakra-ui/core';

import { ModuleInterface, ModuleTypes } from '../types';

import { ModuleName } from './styled';
import StatusIcon from './StatusIcon';

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

const SubModule: FC<Props> = ({ title, progress, id, moduleId, type, index, count }) => (
  <Flex>
    <StatusIcon status={progress === 100 ? 'done' : 'unlocked'} />
    <Stack spacing={2} width='100%' marginLeft='1.5rem'>
      <Flex justifyContent='space-between'>
        <ModuleName fontSize='lg' color='white'>
          <Link
            href={createLink({ type, id, moduleId })}
            width={250}
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