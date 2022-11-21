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
} from '@chakra-ui/react';
import { useDrawer } from 'src/common/providers/DrawerProvider';

import ViewButtons from './ViewButtons';
import IpList from './RouterView/IpList';
import { genUniqueId } from 'src/common/utils';
import { useCreateRouter } from 'src/common/api/topology';
import { useEmulatorWithDialogue } from 'src/common/providers/EmulatorProvider';
import { ToyNetCreateRouterRequest } from 'src/common/api/topology/types';
import useBoolean from 'src/common/hooks/useBoolean';
import { ToyNetFormHelperText } from 'src/common/components/ToyNetFormHelperText';
import SpaceSanitizedInput from 'src/common/components/SpaceSanitizedInput';

const MAX_ROUTERS = 10;

export interface Ip {
  id: string;
  ipAddr: string;
}

const isValidRouterRequest = (
  request: ToyNetCreateRouterRequest,
) => {
  const { ip, name, intfs } = request;

  return [
    ip.length > 1,
    name.length > 1,
    !intfs.some(intf => intf.length < 1),
  ].every(val => val);
};

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
  const {
    bool: shouldShowError,
    setTrue: showError,
    setFalse: hideError,
  } = useBoolean(false);

  const toast = useToast();
  const { onClose } = useDrawer();
  const { sessionId, appendDialogue, switches } = useEmulatorWithDialogue();
  const { mutateAsync: createRouter, isLoading, isError, error, isSuccess } =
    useCreateRouter(sessionId);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      appendDialogue(`Created router ${name}`);
    }
  }, [appendDialogue, isSuccess, onClose, name]);

  useEffect(() => {
    if (isError)
      toast({
        status: 'error',
        position: 'top-right',
        isClosable: true,
        title: 'Unable to creat router',
        description: (error as any).message,
      });
  }, [error, isError, toast]);

  const handleCreate = () => {
    const intfs = interfaces.map(({ ipAddr }) => ipAddr);
    const routerRequest = { ip, name, intfs };

    if (!isValidRouterRequest(routerRequest)) {
      showError();
      return;
    }

    if (switches.length === MAX_ROUTERS) {
      toast({
        status: 'error',
        position: 'top-right',
        isClosable: true,
        title: 'Unable to create router',
        description: `You can only create ${MAX_ROUTERS} routers.`,
      });
      return;
    }

    hideError();
    createRouter(routerRequest);
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <SpaceSanitizedInput
          value={name}
          isDisabled={isLoading}
          isInvalid={shouldShowError && name.length < 1}
          data-testid='drawer-router-name-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)}
        />
        {shouldShowError && name.length < 1 &&
          <ToyNetFormHelperText>
            Name is required.
          </ToyNetFormHelperText>
        }
      </FormControl>
      <FormControl>
        <FormLabel>IP Address</FormLabel>
        <SpaceSanitizedInput
          fontFamily='monotype'
          value={ip}
          placeholder='172.16.1.10/24'
          isDisabled={isLoading}
          isInvalid={shouldShowError && ip.length < 1}
          data-testid='drawer-router-ip-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIp(e.currentTarget.value)}
        />
        {shouldShowError && ip.length < 1 &&
          <ToyNetFormHelperText>
            IP Address is required.
          </ToyNetFormHelperText>
        }
      </FormControl>
      <IpList
        ips={interfaces}
        setIps={setInterfaces}
        isDisabled={isLoading}
        shouldShowError={shouldShowError}
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