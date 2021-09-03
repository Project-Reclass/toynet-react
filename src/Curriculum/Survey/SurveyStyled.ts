import { Button, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const SubmitSurvey = styled(Button)`
    margin: 0 auto;
`;

export const SurveyContainer = styled('div')`
  margin: 0 auto;
  width: 80vw;
  padding: 50px;
`;

export const QuestionLabel = styled(Text)`
  color: ${({ isIncorrect }:{isIncorrect: boolean}) => (
    isIncorrect ? '#C5A3B4' : '#FFFFFF'
  )};
`;