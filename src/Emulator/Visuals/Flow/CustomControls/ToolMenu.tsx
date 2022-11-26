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

import { FC } from 'react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  Icon,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuItemProps,
} from '@chakra-ui/react';
import { FaTools } from 'react-icons/fa';
import { RiLayout4Line } from 'react-icons/ri';
import { TopologyInfo } from './TopologyDrawer';

const ToolMenuItem: FC<MenuItemProps> = ({ children, ...props }) => (
  <MenuItem
    {...props}
    _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
  >
    {children}
  </MenuItem>
);

export interface ToolMenuProps {
  onAutoFormat: () => any;
  onRestartSession: () => any;
}

export default function ToolMenu({
  onAutoFormat,
  onRestartSession,
}: ToolMenuProps) {

  return (
    <Menu autoSelect={false} colorScheme='blackAlpha'>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Icon as={FaTools} />}
        variant="outline"
        _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        _expanded={{ bg: 'rgba(255, 255, 255, 0.5)' }}
      />
      <MenuList backgroundColor='#212529'>
        <ToolMenuItem>
          <TopologyInfo />
        </ToolMenuItem>
        <MenuDivider />
        <ToolMenuItem
          icon={<Icon as={RiLayout4Line} />}
          onClick={onAutoFormat}
        >
          Auto Format Topology
        </ToolMenuItem>
        <MenuDivider />
        <ToolMenuItem
          color='red'
          onClick={onRestartSession}
          icon={<RepeatClockIcon />}
        >
          Restart Session
        </ToolMenuItem>
      </MenuList>
    </Menu>
  );
}