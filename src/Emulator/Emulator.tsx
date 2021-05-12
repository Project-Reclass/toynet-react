import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Grid } from '@chakra-ui/core';

import Tabs from './Tabs/Tabs';
import Visuals from './Visuals';
import Instructions from './Instructions';
import DialogueBox from './DialogueBox';
import ConsoleTab from './Tabs/ConsoleTab';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    <Grid
      margin='auto'
      maxWidth='1920px'
      height='100vh'
      padding={'0.789rem'}
      gap={2}
      gridTemplateColumns={'auto 1fr'}
    >
      <Instructions panelData={data} />
      <Grid
        gridTemplateRows={'1fr 1fr'}
        width='100%'
        gap={2}
      >
        <Visuals />
        <Grid
          gap={2}
          gridTemplateColumns={'2fr 1fr'}
        >
          <ConsoleTab />
          <DialogueBox />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Emulator;
