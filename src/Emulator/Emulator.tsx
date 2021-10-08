/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import React from 'react';
import { Grid } from '@chakra-ui/core';

import Visuals from './Visuals';
import Instructions from './Instructions';
import DialogueBox from './DialogueBox';
import Console from './Console';
import styled from '@emotion/styled-base';
import DrawerProvider from '../common/providers/DrawerProvider';

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

const EmulatorGrid = styled(Grid)`
  margin: auto;
  max-width: 1920px;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0.789rem;
  grid-template-columns: auto 1fr;
  @media (max-width: 2050px) {
    margin-left: 5rem;
  }
`;

const Emulator = () => {
  return (
    <DrawerProvider>
      <EmulatorGrid gap={2}>
        <Instructions panelData={data} />
        <Grid
          gridTemplateRows={'1fr 1fr'}
          width='100%'
          overflow='hidden'
          gap={2}
        >
          <Visuals />
          <Grid
            height='100%'
            maxH='100%'
            overflow='hidden'
            gap={2}
            gridTemplateColumns={'2fr 1fr'}
          >
            <Console />
            <DialogueBox />
          </Grid>
        </Grid>
      </EmulatorGrid>
    </DrawerProvider>
  );
};

export default Emulator;
