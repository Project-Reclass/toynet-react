import React from 'react';
import { Box, Stack, Heading, Flex, Text } from '@chakra-ui/core';
import { useCurriculum } from 'src/common/api/curriculum/dashboard';
import LoadingContainer from 'src/common/components/LoadingContainer';

import Module from './Module';
import { DashboardBox } from './styled';
import { useParams } from 'react-router';

interface Props {
  username?: string;
}

interface Params {
  curriculumId: string;
}

export default function Dashboard({ username }: Props) {
  const { curriculumId } = useParams<Params>();
  const { data, isLoading } = useCurriculum(Number(curriculumId));

  return (
    <Box width='100%' minW='540' marginX='auto'>
      <LoadingContainer isLoading={isLoading}>
        <DashboardBox>
          <Flex justifyContent='flex-start'>
            <Stack spacing={3} maxW={'60%'}>
              <Heading fontSize='4xl' color='grey.500'>
                {username ?
                  `Hi, ${username}!` :
                  'Hi there!'
                }
              </Heading>
              <Text fontSize='lg' color="black.500">
                {`${data?.introduction} You can click on each module’s chevron to see its submodules. You must go through
                the modules and their submodules in order. To start or revisit a submodule, click`} {' '}
                <Text as='span' textDecoration='underline' fontWeight='bold'>{'Go to submodule >.'}</Text>
              </Text>
            </Stack>
          </Flex>
        </DashboardBox>
        <Flex
          width='80%'
          minW='25rem'
          maxW='70rem'
          margin='auto'
          flexDirection='column'
        >
          {
            data?.modules.map((module, index) => (
              <Module
                {...module}
                index={index}
                locked={false}
                paddingTop={index === 0 ? '2rem' : ''}
              />
            ))
          }
        </Flex>
      </LoadingContainer>
    </Box>
  );
};