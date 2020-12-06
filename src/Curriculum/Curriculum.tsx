import React from 'react';
import { Box, Flex, Stack, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/core';

import { CurriculumBox } from './styled';
import Module, { ModuleInterface } from './Module';

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

interface Props {
  username: string;
  description: string;
  moduleData: Data[];
}

export default function Curriculum({ moduleData, description, username }: Props) {
  return (
    <Box width='90%' maxW='1080' minW='540' marginX='auto'>
      <CurriculumBox>
        <Flex justifyContent='center'>
          <Stack spacing={3} maxW={'60%'}>
            <Text fontSize='5xl' color='white' >
              Welcome, {username}!
            </Text>
            <Text fontSize='lg' color="gray.100">
              {description}
            </Text>
          </Stack>
          <Stack spacing={3}>
            <Text fontSize='2xl' color='white'>Course Completions</Text>
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