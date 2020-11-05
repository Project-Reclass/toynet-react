import styled from '@emotion/styled';
import { Heading } from '@chakra-ui/core';

export const MarkdownWrapper = styled('h3')`
  color: white;
  width: 80%;
  line-height: 1.5rem;
  p {
    margin-bottom: 1rem;
  }
`;

export const ArticleHeader = styled(Heading)`
  color: white;
  width: 80%;
  margin-bottom: 1rem;
`;

export const Div = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;