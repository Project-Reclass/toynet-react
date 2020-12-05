import styled from '@emotion/styled';

export const SubmitQuiz = styled('a')`
  margin: 0 auto;
  padding: 5px 17px;
  border-radius: 3.5px;
  background-color: #4195A5;
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    opacity: 0.2;
  }
`;

export const CheckIcon = styled('p')`
  &:after {
    content: '✔';
    color: #90EE90;
  }
`;

export const IncorrectIcon = styled('p')`
  &:after {
    content: '✘';
    color: red;
  }
`;

export const QuestionLabel = styled.label`
  color: ${(props:{isIncorrect: boolean}) => props.isIncorrect ? '#C5A3B4' : '#FFFFFF'};
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
