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

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useToynetCommand } from 'src/common/api/topology';
import {
  EmulatorSection,
  EmulatorTitle,
} from 'src/common/components/Emulator';
import { useEmulator } from 'src/common/providers/EmulatorProvider';

import DeviceSelector from './DeviceSelector';
import ConsoleTerminal from './ConsoleTerminal';

const LOADING_DELAY = 500;

const ConsoleHeading = memo(() => (
  <Heading size='lg'>
    Console
  </Heading>
));

const Console = () => {
  const { sessionId, routers, switches, hosts } = useEmulator();

  const [selectedDevice, setSelectedDevice] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const [runCommand, { isLoading }] = useToynetCommand(sessionId);

  const loadingRef = useRef<NodeJS.Timeout | null>(null);

  const deviceNames = useMemo(() =>
    [...hosts, ...switches, ...routers].map(({ name }) => name),
  [routers, switches, hosts]);

  useEffect(() => {
    // We should display a loading indicator if the request is taking longer
    // than our loading delay. If the request finishes before this then
    // we should not show th loading indicator.
    if (isLoading) {
      loadingRef.current = setTimeout(() => setShowLoading(isLoading), LOADING_DELAY);
      return;
    }
    clearTimeout(loadingRef.current!);
    setShowLoading(false);
  }, [isLoading]);

  return (
    <EmulatorSection overflow='hidden'>
      <EmulatorTitle justifyContent='space-between'>
        <ConsoleHeading />
        <DeviceSelector
          options={deviceNames}
          onChange={e => setSelectedDevice(e.currentTarget.value)}
        />
      </EmulatorTitle>
      <Box height='100%' position='relative' overflow='hidden'>
        {showLoading &&
          <Spinner
            top='2'
            right='2'
            zIndex={2}
            position='absolute'
          />
        }
        <ConsoleTerminal
          sessionId={sessionId}
          isLoading={isLoading}
          selectedDevice={selectedDevice}
          runCommand={runCommand}
        />
      </Box>
    </EmulatorSection>
  );
};

export default Console;
