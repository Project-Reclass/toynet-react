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
import { Box, Stack, Heading, Flex, Text } from '@chakra-ui/react';
import { useCurriculum } from 'src/common/api/curriculum/dashboard';
import LoadingContainer from 'src/common/components/LoadingContainer';

import { DashboardBox } from './styled';
import { useParams } from 'react-router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ModuleList from './Module/ModuleList';

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
          <Flex
            width='80%'
            minW='25rem'
            maxW='75rem'
            margin='auto'
            flexDirection='column'
          >
            <Stack spacing={3} maxW={'60%'}>
              <Heading fontSize='3xl' color='blackAlpha.800'>
                {username ?
                  `Hi, ${username}!` :
                  'Hi there!'
                }
              </Heading>
              <Text fontSize='lg' color="blackAlpha.800">
                {`${data?.introduction} You can click on each module’s chevron to see its submodules. You must go through
                the modules and their submodules in order. To start or revisit a submodule, click`} {' '}
                <Text color='black.500' as='span' textDecoration='underline' fontWeight='bold'>
                  Go to submodule <ChevronRightIcon />
                </Text>
              </Text>
            </Stack>
          </Flex>
        </DashboardBox>
        <ModuleList modules={data?.modules || []} />
      </LoadingContainer>
    </Box>
  );
};