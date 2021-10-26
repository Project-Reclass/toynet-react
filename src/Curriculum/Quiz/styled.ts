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
import { Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const QuizScore = styled(Text)`
  color: ${({ percent, minScore }:{percent: number, minScore: number}) => (
    percent >= minScore ? '#39a139' : '#ff5151'
  )};
  margin: 1.5rem auto;
`;

export const SubmitQuiz = styled(Button)`
  margin: 0 auto;
`;

export const CheckIcon = styled('p')`
  margin-right: 1rem;
  &:after {
    content: '✔';
    color: #90EE90;
  }
`;

export const IncorrectIcon = styled('p')`
  margin-right: 1rem;
  &:after {
    content: '✘';
    color: red;
  }
`;

export const QuestionLabel = styled(Text)`
  color: ${({ isIncorrect }:{isIncorrect: boolean}) => (
    isIncorrect ? '#C5A3B4' : '#FFFFFF'
  )};
`;

export const QuizContainer = styled('div')`
  margin: 0 auto;
  width: 80vw;
  padding: 50px;
`;

export const AnswerContainer = styled('div')`
  margin: 0 auto;
  width: 50vw;
`;
