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
      <Flex
        width='80%'
        minW='25rem'
        maxW='70rem'
        margin='auto'
        paddingTop='2rem'
        flexDirection='column'
      >
        {
          moduleData.map((module, i) => (
            <Module
              {...module}
              paddingTop={i === 0 ? '2rem' : ''}
              locked={i > 0 ? !moduleData[i-1].completed : false}
            />
          ))
        }
      </Flex>
    </Box>
  );
};