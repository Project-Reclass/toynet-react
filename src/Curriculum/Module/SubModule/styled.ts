import styled from '@emotion/styled';
import { Box, Text } from '@chakra-ui/core';

export const ModuleName = styled(Text)`
  color: grey;
  transition: color 0.2s ease;
  a {
    -webkit-user-select: none;
    user-select: none;
  }
  :hover {
    color: white;
  }
`;

interface SIBoxProps {
  type: 'lock' | 'check';
}

export const StatusIconBox = styled(Box)`
  background-color: ${({type}: SIBoxProps) => type !== 'check' ? 'white' : 'rgb(79, 149, 26)'};
  border-radius: 3px;
  width: 1.5rem;
  height: 1.5rem;
`;