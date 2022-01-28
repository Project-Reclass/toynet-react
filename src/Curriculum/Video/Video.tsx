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

import { Box, Container, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import useVideo from 'src/common/api/curriculum/video/useVideo';
import LoadingSpinner from 'src/common/components/LoadingSpinner';
import NavigationButtons from 'src/common/components/NavigationButtons';
import NotFound from 'src/common/NotFound';

import LoadableVideo from './LoadableVideo';

interface Params {
  moduleId: string;
  videoId: string;
}

const Video = () => {
  const { moduleId, videoId } = useParams<Params>();
  const { data, isLoading, isSuccess, isFetched } = useVideo(Number(moduleId), Number(videoId));

  if (!isSuccess && isFetched) {
    return <NotFound />;
  }

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <Box position='relative' width='100%' height='100%'>
      <Container
        position='absolute'
        centerContent
        maxW='container.lg'
        left='50%'
        top='50%'
        transform='translate(-50%, -50%)'
      >
        <Stack width='100%'>
          <LoadableVideo {...data} />
          <Stack spacing={3} px='5'>
            <Heading size='lg'>{data.title}</Heading>
            <Divider />
            <Text>{data.description}</Text>
          </Stack>
        </Stack>
        <Box mt='3' width='100%'>
          <NavigationButtons
            my='0'
            variant='ghost'
            moduleId={Number(moduleId)}
            submoduleId={Number(videoId)}
            submoduleType='VIDEO'
          />
        </Box>
      </Container>
    </Box>
  );
};


export default Video;