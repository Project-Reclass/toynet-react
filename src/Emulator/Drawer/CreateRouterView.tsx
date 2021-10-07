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
import {
  Stack,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/core';
import { useDrawer } from 'src/common/providers/DrawerProvider';
import { ToyNetInput } from 'src/Login/styled';

import ViewButtons from './ViewButtons';
import IpList from './RouterView/IpList';
import { genUniqueId } from 'src/common/utils';
import { useCreateRouter } from 'src/common/api/topology';
import { useEmulator } from 'src/common/providers/EmulatorProvider';

export interface Ip {
  id: string;
  ipAddr: string;
}

const initialIp: Ip ={
  id: genUniqueId(),
  ipAddr: '',
};

interface Props {
  nameHint: string;
}

export default function CreateRouterView({ nameHint }: Props) {
  const [ip, setIp] = useState('');
  const [name, setName] = useState(nameHint);
  const [interfaces, setInterfaces] = useState([initialIp]);

  const toast = useToast();
  const { onClose } = useDrawer();
  const { sessionId } = useEmulator();
  const [createRouter, { isLoading, isError, error, isSuccess }] =
    useCreateRouter(sessionId);

  useEffect(() => {
    if (isSuccess)
      onClose();
  }, [isSuccess, onClose]);

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

  const handleCreate = () => createRouter({
    name,
    ip,
    intfs: interfaces.map(({ ipAddr }) => ipAddr),
  });

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
          value={ip}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIp(e.currentTarget.value)}
        />
      </FormControl>
      <IpList
        ips={interfaces}
        setIps={setInterfaces}
      />
      <ViewButtons
        onCancel={onClose}
        onCreate={handleCreate}
        isDisabled={isLoading}
      >
        {isLoading ?
          'Creating Router...' :
          'Create Router'
        }
      </ViewButtons>
    </Stack>
  );
};