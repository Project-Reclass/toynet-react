import { Box, Input, Button } from '@chakra-ui/core';
import styled from '@emotion/styled';

export const Center = styled(Box)`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`;

export const ToyNetInput = styled(Input)`
border: none;
background-color: #212529;
`;

export const ToyNetButton = styled(Button)`
background-color: rgba(0,0,0,0);
border: 1pt solid white;

:hover {
  color: #212529;
}
`;
