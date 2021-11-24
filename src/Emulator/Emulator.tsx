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
import { useEffect } from 'react';
import { Grid } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';
import { terminateToyNetSession } from 'src/common/api/topology/requests';
import { useEmulator } from 'src/common/providers/EmulatorProvider';
import useLab from 'src/common/api/curriculum/lab/useLab';
import LoadingSpinner from 'src/common/components/LoadingSpinner';

import Console from './Console';
import Visuals from './Visuals';
import DialogueBox from './DialogueBox';
import Instructions from './Instructions';

import DrawerProvider from '../common/providers/DrawerProvider';

const EmulatorGrid = styled(Grid)`
  margin: auto;
  max-width: 1920px;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0.789rem;
  grid-template-columns: auto 1fr;
`;

interface Params {
  emulatorId: string;
  moduleId: string;
}

const Emulator = () => {
  const { emulatorId, moduleId } = useParams<Params>();
  const { sessionId } = useEmulator();
  const { data, isLoading } = useLab(Number(emulatorId));

  // We should be terminating the session on unmount of the emulator
  // as well as on unload of the browser. These represent two different
  // paths that the user can take when leaving the emulator, going to the
  // next submodule and refreshing/closing the tab. Not doing this for
  // both situations can lead to us leaking mininet instances.s
  useEffect(() => {
    return () => {
      if (sessionId !== -1)
        terminateToyNetSession(sessionId);
    };
  }, [sessionId]);

  useEffect(() => {
    const terminateSession = () =>
      terminateToyNetSession(sessionId);

    window.addEventListener('unload', terminateSession);
    return () => window.removeEventListener('unload', terminateSession);
  }, [sessionId]);

  return (
    <DrawerProvider>
      {(isLoading || !data) ?

        <LoadingSpinner /> :

        <EmulatorGrid gap={2}>
          <Instructions
            panelData={data}
            moduleId={Number(moduleId)}
            emulatorId={Number(emulatorId)}
          />
          <Grid
            gridTemplateRows={'1fr 1fr'}
            width='100%'
            overflow='hidden'
            gap={2}
          >
            <Visuals emulatorId={data.topology} />
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
      }
    </DrawerProvider>
  );
};

export default Emulator;
