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

import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { FormControl, FormLabel, useToast, Box } from '@chakra-ui/core';
import { Flex } from 'src/common/components';
import { genUniqueId } from 'src/common/utils';
import { ToyNetInput } from 'src/Login/styled';
import CreateIpBtns from './CreateIpBtns';

const MAX_INTERFACES = 10;

export interface Ip {
  id: string;
  ipAddr: string;
}

interface Props {
  ips: Ip[];
  setIps: Dispatch<SetStateAction<Ip[]>>;
}

export default function IpList({
  ips,
  setIps,
}: Props) {
  const toast = useToast();

  // const [ips, setIps] = useState([initialIp]);

  const ipLengthRef = useRef(ips.length);

  useEffect(() => {
    ipLengthRef.current = ips.length;
  }, [ips.length]);

  const createNewIp = useCallback(() => {
    if (ipLengthRef.current === MAX_INTERFACES) {
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

    setIps(prevIps => [
      ...prevIps,
      {
        id: genUniqueId(),
        ipAddr: '',
      },
    ]);
  }, [setIps, toast]);

  const deleteIp = useCallback((idx: number) => {
    setIps(prevIps => {
      const copy = prevIps.slice();
      console.log({ copy });
      copy.splice(idx, 1);
      return [...copy];
    });
  }, [setIps]);

  const handleInput = (idx: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget: { value }} = e;

      ips[idx].ipAddr = value;
      setIps([...ips]);
  };

  return (
  <Box>
    {ips.map((ip, i) => (
      <Flex key={ip.id}>
        <FormControl width='100%' flex='1 1 auto'>
          <FormLabel>{`Interface ${i + 1} IP`}</FormLabel>
          <ToyNetInput
            value={ip.ipAddr}
            onChange={handleInput(i)}
          />
        </FormControl>
        <CreateIpBtns
          index={i}
          isLast={i === ips.length - 1}
          deleteIp={deleteIp}
          createNewIp={createNewIp}
        />
      </Flex>
    ))}
  </Box>
  );
}