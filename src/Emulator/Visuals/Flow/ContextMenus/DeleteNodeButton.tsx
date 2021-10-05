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
import React, { SyntheticEvent } from 'react';
import { Button } from '@chakra-ui/core';
import { useModifyTopology } from 'src/common/api/topology';
import { DeviceInterface } from 'src/common/types';
import { devError } from 'src/common/utils';
import { useEmulatorWithDialogue } from 'src/Emulator/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';

interface Props {
  device: DeviceInterface;
}

export default function DeleteNodeBtn({ device }: Props) {
  const { sessionId, dispatch, appendDialogue } = useEmulatorWithDialogue();
  const { deleteDevice } = useModifyTopology(sessionId);

  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let deviceTypeAction = device.type === 'router' ? TopologyActions.DELETE_ROUTER :
      device.type === 'switch' ? TopologyActions.DELETE_SWITCH :
        device.type === 'host' ? TopologyActions.DELETE_HOST :
          TopologyActions.FLUSH_QUEUE;
    try {
      await deleteDevice(device.type, device.name);
      dispatch({ type: deviceTypeAction, payload: device });
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: { to: device.name, from: device.name },
      });
    } catch (error) {
      devError(error);
      appendDialogue(`Unable to delete ${device.type} ${device.name}`, 'tomato');
    }
  };

  return (
    <Button onClick={handleClick}
      isDisabled={device.connections.length !== 0}
      variant='ghost'
      variantColor='teal'
      alignContent='center'
      textAlign='left'
    >
      Delete Node
    </Button>
  );
};