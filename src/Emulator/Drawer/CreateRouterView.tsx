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
import {
  Stack,
  FormControl,
  FormLabel,
  IconButton,
  Flex,
  useToast,
} from '@chakra-ui/core';

import { useDrawer } from './DrawerProvider';
import { ToyNetInput } from 'src/Login/styled';
import ViewButtons from './ViewButtons';

const MAX_INTERFACES = 10;

interface Ip {
  id: string;
  ipAddr: string;
}

const genId = (): string =>
  `${new Date().toISOString()}${Math.random()}`;

const initialIp: Ip ={
  id: genId(),
  ipAddr: '',
};

interface Props {
  nameHint: string;
}

export default function CreateRouterView({ nameHint }: Props) {
  const toast = useToast();
  const [name, setName] = useState(nameHint);
  const [ips, setIps] = useState([initialIp]);
  const { onClose } = useDrawer();

  const createNewIp = () => {
    if (ips.length === MAX_INTERFACES) {
      toast({
        status: 'warning',
        title: 'Unable to add new interface.',
        position: 'top-right',
        isClosable: true,
        description: `You can only have a max number of
                      devices ${MAX_INTERFACES}.`,
      });
      return;
    }

    setIps([
      ...ips,
      {
        id: genId(),
        ipAddr: '',
      },
    ]);
  };

  const deleteIp = (idx: number) => {
    ips.splice(idx, 1);
    setIps([...ips]);
  };

  const handleInput = (idx: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget: { value }} = e;

      ips[idx].ipAddr = value;
      setIps([...ips]);
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
      {ips.map((ip, i) => (
        <Flex key={ip.id}>
          <FormControl width='100%' flex='1 1 auto'>
            <FormLabel>{`Interface ${i + 1} IP`}</FormLabel>
            <ToyNetInput
              value={ip.ipAddr}
              onChange={handleInput(i)}
            />
          </FormControl>
          <Stack direction='row' spacing={3} margin='auto 0 0.4rem 1rem'>
            {
              i === ips.length - 1 ?
                <Stack direction='row' spacing={2}>
                  {i !== 0 &&
                    <IconButton
                      width='fit-content'
                      variantColor='red'
                      aria-label='Call Segun'
                      size='sm'
                      icon='minus'
                      onClick={() => deleteIp(i)}
                    />
                  }
                  <IconButton
                    width='fit-content'
                    variantColor='green'
                    aria-label='Call Segun'
                    size='sm'
                    icon='add'
                    onClick={createNewIp}
                  />
                </Stack> :
                <IconButton
                  width='fit-content'
                  variantColor='red'
                  aria-label='Call Segun'
                  size='sm'
                  icon='minus'
                  onClick={() => deleteIp(i)}
                />
            }
          </Stack>
        </Flex>
      ))}
      <ViewButtons onCancel={onClose}>
        Create Router
      </ViewButtons>
    </Stack>
  );
};