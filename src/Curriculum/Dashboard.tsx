import React from 'react';
import { Box, Flex, Stack, Text, Heading } from '@chakra-ui/core';

import { DashboardBox } from './styled';
import Module, { ModuleInterface } from './Module';

interface Data extends ModuleInterface {
  description: string;
  subModules: ModuleInterface[];
}

interface Props {
  username?: string;
  description: JSX.Element | string;
  moduleData: Data[];
}

export default function Dashboard({ moduleData, description, username }: Props) {
  return (
    <Box width='100%' minW='540' marginX='auto'>
      <DashboardBox>
        <Flex justifyContent='flex-start'>
          <Stack spacing={3} maxW={'60%'}>
            <Heading fontSize='4xl' color='grey.500'>
              {username ?
                `Welcome, ${username}!` :
                'Welcome!'
              }
            </Heading>
            <Text fontSize='lg' color="black.500">
              {description}
            </Text>
          </Stack>
        </Flex>
      </DashboardBox>
      <Box
        width='80%'
        minW='25rem'
        maxW='70rem'
        margin='1rem auto'
      >
        {
          moduleData.map(module => (
            <Module {...module} />
          ))
        }
      </Box>
    </Box>
  );
};