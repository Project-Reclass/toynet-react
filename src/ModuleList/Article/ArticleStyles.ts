import styled from '@emotion/styled';
import { Heading } from '@chakra-ui/core';

export const MarkdownWrapper = styled('h3')`
  color: white;
  width: 80%;
  line-height: 1.5rem;
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  b {
    font-size: 1.5rem;
    font-weight: 700;
  }
  hr {
    width: 100%;
    border-bottom: 2pt solid rgba(255, 255, 255, 0.5);
    margin: 1rem;
  }
`;

export const ArticleHeader = styled(Heading)`
  color: white;
  width: 80%;
  margin-bottom: 1rem;
`;
