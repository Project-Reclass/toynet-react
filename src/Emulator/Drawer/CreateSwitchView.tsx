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
import { Stack, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import SpaceSanitizedInput from 'src/common/components/SpaceSanitizedInput';
import { useCreateSwitch } from 'src/common/api/topology';
import { useEmulator, useDialogue } from 'src/common/providers/EmulatorProvider';
import { useDrawer } from 'src/common/providers/DrawerProvider';

import ViewButtons from './ViewButtons';
import { ToyNetFormHelperText } from 'src/common/components/ToyNetFormHelperText';

interface Props {
  nameHint: string;
}

const maxSwitch = 10;

export default function CreateSwitchView({ nameHint }: Props) {
  const toast = useToast();
  const { onClose } = useDrawer();
  const { appendDialogue } = useDialogue();
  const { switches, sessionId } = useEmulator();

  const [createSwitch, { isLoading, isError, isSuccess, error }] =
    useCreateSwitch(sessionId);
  const [name, setName] = useState(nameHint);
  const [showError, setShowError] = useState(false);
  const [switchCount, setSwitchCount] = useState(switches.length);

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
        title: 'Unable to create switch.',
        description: (error as any).message,
      });
  }, [error, isError, toast]);

  const handleCreate = () => {
    if (name.length === 0) {
      setShowError(true);
      return;
    }

    if (switchCount < maxSwitch){
      createSwitch({
        name,
      });
      setSwitchCount(switchCount + 1);
    } else {
      toast({
        status: 'error',
        position: 'top-right',
        isClosable: true,
        title: 'Unable to create switch.',
        description: 'You can only create up to 10 switches.',
      });
    }
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <SpaceSanitizedInput
          value={name}
          isDisabled={isLoading}
          isInvalid={showError && name.length === 0}
          data-testid='drawer-switch-name-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
        />
        {showError && name.length === 0 &&
          <ToyNetFormHelperText>
            Name is required.
          </ToyNetFormHelperText>
        }
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