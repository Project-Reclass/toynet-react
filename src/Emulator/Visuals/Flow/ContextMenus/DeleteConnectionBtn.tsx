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
import { devError } from 'src/common/utils';
import { useDeleteDeviceLink } from 'src/common/api/topology';
import { useDialogue, useEmulator } from 'src/common/providers/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';

interface Props {
  to: string;
  from: string;
}

export default function DeleteConnectionBtn({ to, from }: Props) {
  const { appendDialogue, updateDialogueMessage } = useDialogue();
  const { sessionId, dispatch } = useEmulator();
  const [deleteLink] = useDeleteDeviceLink(sessionId);

  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: TopologyActions.DELETE_CONNECTION,
      payload: { to, from },
    });

    const messageId = appendDialogue(
      `Attempting to delete link between ${to} and ${from}...`, 'grey');
    try {
      await deleteLink({ dev_1: from, dev_2: to });
      updateDialogueMessage(messageId, {
        message: `Deleted link between ${to} and ${from}`,
        color: 'White',
      });
    } catch (error) {
      devError(error);
      updateDialogueMessage(messageId, {
        message: `Unable to delete link between ${to} and ${from}`,
        color: 'tomato',
      });

      // Since we eagerly remove the connection, we need to add it back
      // in when there is an error. This prevents there being any perceived
      // lag to the user.
      dispatch({
        type: TopologyActions.ADD_CONNECTION,
        payload: { to, from },
      });
    }
  };

  return (
    <Button
      data-testid='delete_conn-btn'
      variant='ghost'
      variantColor='teal'
      textAlign='left'
      key={to}
      onClick={handleClick}
    >
      Delete {to.toLocaleUpperCase()} Connection
    </Button>
  );
};