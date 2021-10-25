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

import { useDrawer } from 'src/common/providers/DrawerProvider';
import { useCreateHost } from 'src/common/api/topology';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';

import ViewButtons from './ViewButtons';
import SpaceSanitizedInput from 'src/common/components/SpaceSanitizedInput';

const MAX_HOSTS = 10;

interface Props {
  nameHint: string;
}

export default function CreateHostView({ nameHint }: Props) {
  const toast = useToast();
  const [ip, setIp] = useState('');
  const [name, setName] = useState(nameHint);
  const [defaultGateway, setDefaultGateway] = useState('');

  const { onClose } = useDrawer();
  const { sessionId, hosts, appendDialogue } = useEmulatorWithDialogue();
  const [createHost, { isLoading, isSuccess, isError, error }] = useCreateHost(sessionId);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      appendDialogue(`Created host ${name.toUpperCase()}`);
    }
  }, [isSuccess, onClose, appendDialogue, name]);

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

  const handleSubmit = () => {
    if (hosts.length === MAX_HOSTS) {
      toast({
        status: 'error',
        position: 'top-right',
        isClosable: true,
        title: 'Unable to create host',
        description: `You can only create ${MAX_HOSTS}`,
      });
      return;
    }

    createHost({
      name,
      ip,
      def_gateway: defaultGateway,
    });
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <SpaceSanitizedInput
          value={name}
          isDisabled={isLoading}
          data-testid='drawer-host-name-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Default Gateway</FormLabel>
        <SpaceSanitizedInput
          name={defaultGateway}
          isDisabled={isLoading}
          placeholder='192.168.1.1'
          data-testid='drawer-host-default_gateway-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDefaultGateway(e.currentTarget.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>IP Address</FormLabel>
        <SpaceSanitizedInput
          name={ip}
          placeholder='192.168.1.2/24'
          isDisabled={isLoading}
          data-testid='drawer-host-ip-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIp(e.currentTarget.value)}
        />
      </FormControl>

      <ViewButtons
        isDisabled={isLoading}
        onCancel={onClose}
        onCreate={handleSubmit}
      >
        {isLoading ?
          'Creating host...' :
          'Create Host'
        }
      </ViewButtons>
    </Stack>
  );
}
