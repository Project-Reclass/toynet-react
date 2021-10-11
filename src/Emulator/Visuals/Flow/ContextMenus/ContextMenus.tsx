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
import React from 'react';
import { Stack } from '@chakra-ui/core';
import { Menu } from 'react-contexify';
import { DeviceInterface } from 'src/common/types';

import DeleteConnectionBtn from './DeleteConnectionBtn';
import DeleteNodeBtn from './DeleteNodeButton';
import InfoBtn from './InfoBtn';

interface Props {
  devices: DeviceInterface[];
}

export const ContextMenus = ({ devices }: Props) => (
  <>
    {devices.map(device => (
      <Menu id={`${device.name.toLocaleUpperCase()}-menu`} theme='dark' key={`${device.name}-menu`}>
        <Stack>
          <DeleteNodeBtn device={device} />
          {device.connections.map((to: string) => (
            <DeleteConnectionBtn to={to} from={device.name} key={`${to}-delete`} />
          ))}
          <InfoBtn device={device} />
        </Stack>
      </Menu>
    ))}
  </>
);

export default ContextMenus;