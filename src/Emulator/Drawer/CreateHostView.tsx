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

import React, { useState } from 'react';
import { Stack, FormControl, FormLabel } from '@chakra-ui/core';
import { ToyNetInput } from 'src/Login/styled';
import ViewButtons from './ViewButtons';
import { useDrawer } from './DrawerProvider';
import { useCreateHost } from 'src/common/api/topology';
import { useEmulator } from '../EmulatorProvider';

interface Props {
  nameHint: string;
}

export default function CreateHostView({ nameHint }: Props) {
  const [ip, setIp] = useState('');
  const [name, setName] = useState(nameHint);
  const [defaultGateway, setDefaultGateway] = useState('');

  const { onClose } = useDrawer();
  const { sessionId } = useEmulator();
  const [createHost] = useCreateHost(sessionId);

  const handleSubmit = async () => {
    await createHost({
      name,
      ip,
      def_gateway: defaultGateway,
    });

    onClose();
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <ToyNetInput
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>IP Address</FormLabel>
        <ToyNetInput
          name={ip}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIp(e.currentTarget.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Default Gateway</FormLabel>
        <ToyNetInput
          name={defaultGateway}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDefaultGateway(e.currentTarget.value)}
        />
      </FormControl>
      <ViewButtons
        onCancel={onClose}
        onCreate={handleSubmit}
      >
        Create Host
      </ViewButtons>
    </Stack>
  );
}
