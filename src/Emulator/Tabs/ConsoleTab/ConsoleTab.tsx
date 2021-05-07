import React from 'react';
import { Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';

const Container = styled.div`
  background-color: #454950;
  color: white;
  border-radius: 10px;
  padding-left: 2vh;
  overflow: auto;
`;

const ConsoleTab = () => (
  <Container>
    <Heading size='lg' color='white' padding='20px'>
      Coming soon...
    </Heading>
  </Container>
);

export default ConsoleTab;
