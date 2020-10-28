import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';

import Tabs from './Tabs/Tabs';
import Visuals from './Visuals';
import Instructions from './Instructions';

const Container = styled.div`
  margin-left: 1.5vw;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  margin-right: 3.5rem;
  width: 100%;
  max-height: 96vh;
  overflow: hidden;
`;

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Modifying Topology',
  'objective': 'Add and remove devices and their connections.',
  'tasks': [
    'Add a Host (h3)',
    'Attach h3 to s2',
    'Detach h3 from s2',
    'Remove h2',
  ],
};

const Emulator = () => {
  return (
    <Flex margin='auto' maxWidth='1920px'>
      <Instructions panelData={data} />
      <Container>
        <div>
          <Tabs />
        </div>
        <Visuals />
      </Container>
    </Flex>
  );
};

export default Emulator;
