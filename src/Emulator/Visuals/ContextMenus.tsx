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
import React, { useCallback } from 'react';
import { Menu } from 'react-contexify';
import { Button, Stack } from '@chakra-ui/core';

import { DeviceInterface } from 'src/common/types';

import { TopologyActions } from '../useTopology';
import { useEmulator } from '../EmulatorProvider';

interface Props {
  devices: DeviceInterface[];
}

export const ContextMenus = ({ devices }: Props) => {
  const { dispatch } = useEmulator();

  const handleDeleteConnections = useCallback((from: string, to: string) => {
    return () => {
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: {
          to,
          from,
        },
      });
    };
  }, [dispatch]);

  const handleDelete = useCallback((device: DeviceInterface) => {
    let deviceTypeAction = device.type === 'router' ? TopologyActions.DELETE_ROUTER :
      device.type === 'switch' ? TopologyActions.DELETE_SWITCH :
        device.type === 'host' ? TopologyActions.DELETE_HOST :
          TopologyActions.FLUSH_QUEUE;

    if (deviceTypeAction === TopologyActions.FLUSH_QUEUE)
      throw new Error(`Invalid device name ${device.name}. Device names must start with (r|s|h).`);

    return () => {
      dispatch({ type: deviceTypeAction, payload: device });
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: { to: device.name, from: device.name },
      });
    };
  }, [dispatch]);

  return (
    <>
      {devices.map(device => (
        <Menu id={`${device.name.toLocaleUpperCase()}-menu`} theme='dark' key={`${device.name}-menu`}>
          <Stack>
            <Button
              onClick={handleDelete(device)}
              isDisabled={device.connections.length !== 0}
              variant='ghost'
              variantColor='teal'
              alignContent='center'
              textAlign='left'
            >
              Delete Node
            </Button>
            {device.connections.map((to: string) => (
              <Button
                variant='ghost'
                variantColor='teal'
                textAlign='left'
                onClick={handleDeleteConnections(device.name, to)}
              >
                Delete {to.toLocaleUpperCase()} Connection
              </Button>
            ))}
          </Stack>
        </Menu>
      ))}
    </>
  );
};

export default ContextMenus;