import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';

import Tabs from './Tabs/Tabs';
import Visuals from './Visuals';
import Instructions, { PanelData } from './Instructions';

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

interface Props {
  panelData: PanelData;
}

const Emulator: FC<Props> = ({ panelData }) => {
  return (
    <Flex margin='auto' maxWidth='1920px'>
      <Instructions panelData={panelData} />
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
