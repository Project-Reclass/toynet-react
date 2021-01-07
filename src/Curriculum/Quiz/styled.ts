import { Button, Text } from '@chakra-ui/core';
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
