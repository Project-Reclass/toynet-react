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

import { Heading } from '@chakra-ui/react';
import React, { memo } from 'react';
import { DeviceInterface } from 'src/common/types';
import InterfaceList from './InterfaceList';

interface Props {
  activeName?: string;
  routers: DeviceInterface[];
}

const RouterRows = memo(({ activeName, routers }: Props) => (
  <>
    <tr>
      <td>
        <Heading size='sm'>Router</Heading>
      </td>
      <td>
        <Heading size='sm'>IP Address</Heading>
      </td>
      <td>
        <Heading size='sm'>Interface</Heading>
      </td>
    </tr>
    {routers.map(({ name, ip, interfaces }) => (
      <InterfaceList ip={ip || ''} deviceName={name} interfaces={interfaces} activeName={activeName} />
    ))}
  </>
));

export default RouterRows;