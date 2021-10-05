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

import { Heading } from '@chakra-ui/core';
import React, { memo } from 'react';
import { DeviceInterface } from 'src/common/types';

import HostRow from './HostRow';

interface Props {
  activeName?: string;
  hosts: DeviceInterface[];
  routers: DeviceInterface[];
}

const HostRows = memo(({ hosts, routers, activeName }: Props) => {
  return (
    <>
      <tr>
        <td>
          <Heading size='sm'>Name</Heading>
        </td>
        <td>
          <Heading size='sm'>IP Address</Heading>
        </td>
        <td>
          <Heading size='sm'>Default Gateway</Heading>
        </td>
      </tr>
      {hosts.map(host => (
        <HostRow key={host.name} host={host} routers={routers} activeName={activeName} />
      ))}
    </>
  );
});

export default HostRows;