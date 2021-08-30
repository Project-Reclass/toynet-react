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
<http://www.gnu.org/licenses/>.  */
import React from 'react';
import { Box, Flex, Stack, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/core';

import { CurriculumBox } from './styled';
import Module, { ModuleInterface } from './Module';

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

interface Props {
  username?: string;
  description: string;
  moduleData: Data[];
}

export default function Curriculum({ moduleData, description, username }: Props) {
  return (
    <Box width='90%' maxW='1280px' minW='540' marginX='auto'>
      <CurriculumBox>
        <Flex justifyContent='center'>
          <Stack spacing={3} maxW={'60%'}>
            <Text fontSize='5xl' color='white'>
              {username ?
                `Welcome, ${username}!` :
                'Welcome!'
              }
            </Text>
            <Text fontSize='lg' color="gray.100">
              {description}
            </Text>
          </Stack>
          <Stack spacing={3}>
            <Text fontSize='2xl' color='white' marginTop='0.5rem'>Course Completion</Text>
            <CircularProgress value={25} color="yellow" marginX='auto' size='10rem' margin='auto'>
              <CircularProgressLabel>25%</CircularProgressLabel>
            </CircularProgress>
          </Stack>
        </Flex>
      </CurriculumBox>
      <Box width='90%' marginX='auto'>
        {moduleData.map(data => (
          <Module key={`${data.title}-${data.id}-${data.moduleId}`} {...data} />
        ))}
      </Box>
    </Box>
  );
};