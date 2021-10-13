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
import { useDeleteDevice } from 'src/common/api/topology';
import { DeviceInterface } from 'src/common/types';
import { devError } from 'src/common/utils';
import { useDialogue, useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';

interface Props {
  device: DeviceInterface;
}

export default function DeleteNodeBtn({ device: {
  name,
  connections,
  type: deviceType,
}}: Props) {
  const { appendDialogue, updateDialogueMessage } = useDialogue();
  const { sessionId } = useEmulatorWithDialogue();
  const [deleteDevice] = useDeleteDevice(sessionId, deviceType);

  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const messageId = appendDialogue(
      `Attempting to delete ${deviceType} ${name}...`, 'grey');
    try {
      await deleteDevice({ name });
      updateDialogueMessage(messageId, {
        message: `Deleted ${deviceType} ${name}`,
        color: 'White',
      });
    } catch (error) {
      devError(error);
      updateDialogueMessage(messageId, {
        message: `Unable to delete ${deviceType} ${name}`,
        color: 'tomato',
      });
    }
  };

  return (
    <Button
      data-testid='delete_node-btn'
      onClick={handleClick}
      isDisabled={connections.length !== 0}
      variant='ghost'
      variantColor='teal'
      alignContent='center'
      textAlign='left'
    >
      Delete Node
    </Button>
  );
};