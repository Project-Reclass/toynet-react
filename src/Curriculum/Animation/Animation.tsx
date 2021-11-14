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

import { Box, Center, Container, Divider, Heading, SimpleGrid, Stack } from '@chakra-ui/layout';
import { Text, Image, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import LoadingContainer from 'src/common/components/LoadingContainer';
import { useAnimation, useAnimationSlides } from 'src/common/api/curriculum/animation';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';


interface Params {
  moduleId: string;
  lessonId: string;
}

const Lesson = () => {
  const { moduleId, lessonId } = useParams<Params>();
  const { data, isLoading } = useAnimation(Number(moduleId), Number(lessonId));
  const {
    currSrc,
    nextSlide,
    prevSlide,
    isNextSlide,
    isPrevSlide,
  } = useAnimationSlides(Number(lessonId), data || undefined);

  return (
    <Box id="#">
      <LoadingContainer isLoading={isLoading}>
        <Container maxW='container.xl' my='3'>
          <SimpleGrid columns={1} spacing={5}>
            <Stack spacing={2}>
              <Heading size="lg">{`Animation: ${data?.name}`}</Heading>
              <Text size='sm' color='whiteAlpha.800'>{data?.description}</Text>
              <Divider />
            </Stack>
            <Center>
              <Stack spacing={3}>
                <Image src={currSrc} />
                <Stack
                  spacing={3}
                  direction='row'
                  justifyContent='space-between'
                >
                  <Button
                    size='md'
                    onClick={prevSlide}
                    isDisabled={!isPrevSlide}
                  >
                    Previous Slide
                  </Button>
                  <Button
                    size='md'
                    onClick={nextSlide}
                    isDisabled={!isNextSlide}
                  >
                    Next Slide
                  </Button>
                </Stack>
              </Stack>
            </Center>
          </SimpleGrid>
          <NavigationWithDivider
            moduleId={Number(moduleId)}
            submoduleId={Number(lessonId)}
            submoduleType='ANIMATION'
          />
        </Container>
      </LoadingContainer>
    </Box>
  );
};

export default Lesson;