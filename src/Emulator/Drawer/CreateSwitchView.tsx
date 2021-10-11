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

import React, { useEffect, useState } from 'react';
import { Stack, FormControl, FormLabel, useToast } from '@chakra-ui/core';
import { ToyNetInput } from 'src/Login/styled';

import ViewButtons from './ViewButtons';
import { useDrawer } from '../../common/providers/DrawerProvider';
import { useCreateSwitch } from 'src/common/api/topology';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';

interface Props {
  nameHint: string;
}

export default function CreateSwitchView({ nameHint }: Props) {
  const toast = useToast();
  const { onClose } = useDrawer();
  const { sessionId, appendDialogue } = useEmulatorWithDialogue();

  const [createSwitch, { isLoading, isError, isSuccess, error }] =
    useCreateSwitch(sessionId);
  const [name, setName] = useState(nameHint);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      appendDialogue(`Created switch ${name}`);
    }
  }, [appendDialogue, isSuccess, name, onClose]);

  useEffect(() => {
    if (isError)
      toast({
        status: 'error',
        position: 'top-right',
        isClosable: true,
        title: 'Unable to creat host.',
        description: (error as any).message,
      });
  }, [error, isError, toast]);

  const handleCreate = () => createSwitch({
    name,
  });

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <ToyNetInput
          value={name}
          isDisabled={isLoading}
          data-testid='drawer-switch-name-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
        />
      </FormControl>
      <ViewButtons
        onCancel={onClose}
        onCreate={handleCreate}
        isDisabled={isLoading}
      >
        {isLoading ?
          'Creating Switch...' :
          'Create Switch'
        }
      </ViewButtons>
    </Stack>
  );
}