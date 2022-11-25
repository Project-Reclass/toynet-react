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
import { Container, Flex } from '@chakra-ui/react';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';

import MarkdownRenderer from 'src/common/components/markdown/MarkdownRenderer/MarkdownRenderer';
import { useParams } from 'react-router';
import useLecture from 'src/common/api/curriculum/lecture/useLecture';
import LoadingContainer from 'src/common/components/LoadingContainer';
import { LectureContainer } from './LectureStyled';

interface Params {
  moduleId: string;
  lectureId: string;
}

export default function Lecture() {
  const { moduleId, lectureId } = useParams<Params>();
  const { data, isLoading } = useLecture(Number(lectureId));

  return (
    <LectureContainer id="#">
      <Container maxW='700px'>
        <LoadingContainer isLoading={isLoading || !data}>
          <Flex justifyContent='center' alignItems='center' flexDirection='column'>
            <MarkdownRenderer>
              {data}
            </MarkdownRenderer>
          </Flex>
          <NavigationWithDivider
            moduleId={Number(moduleId)}
            submoduleId={Number(lectureId)}
            submoduleType='LECTURE'
          />
        </LoadingContainer>
      </Container>
    </LectureContainer>
  );
}
