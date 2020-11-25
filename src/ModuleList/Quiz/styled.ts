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
