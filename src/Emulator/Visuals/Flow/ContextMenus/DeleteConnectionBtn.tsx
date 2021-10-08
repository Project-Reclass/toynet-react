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
import { useModifyTopology } from 'src/common/api/topology';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';

interface Props {
  to: string;
  from: string;
}

export default function DeleteConnectionBtn({ to, from }: Props) {
  const { sessionId, dispatch, appendDialogue } = useEmulatorWithDialogue();
  const { deleteLink } = useModifyTopology(sessionId);
  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteLink(to, from);
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: { to, from },
      });
    } catch (error) {
      devError(error);
      appendDialogue(`Unable to delete link ${to} - ${from}`, 'tomato');
    }
  };

  return (
    <Button
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