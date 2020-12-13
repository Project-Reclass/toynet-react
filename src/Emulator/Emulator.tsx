import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';

import Tabs from './Tabs/Tabs';
import Visuals from './Visuals';
import Instructions from './Instructions';
import DialogueBox from './DialogueBox';

const ContainerLeft = styled.div`
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 96vh;
  max-width: 22vw;
  overflow: hidden;
`;

const ContainerRight = styled.div`
  margin-top: 2vh;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 96vh;
  max-width: 78vw;
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
      <ContainerLeft>
        <div>
          <Instructions panelData={data} />
        </div>
        <DialogueBox />
      </ContainerLeft>

      <ContainerRight>
        <div>
          <Tabs />
        </div>
        <Visuals />
      </ContainerRight>
    </Flex>
  );
};

export default Emulator;
