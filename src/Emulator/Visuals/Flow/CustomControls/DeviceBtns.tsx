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
import { AddIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useDrawer } from 'src/common/providers/DrawerProvider';
import { deviceColorClasses } from 'src/Emulator/Device/deviceColors';

export interface DeviceBtnsProps {
  isDisabled: boolean
};

export default function DeviceBtns({
  isDisabled,
}: DeviceBtnsProps) {
  const { openView } = useDrawer();

  return (
    <ButtonGroup>
      <Button
        size='sm'
        leftIcon={<AddIcon />}
        colorScheme="pink"
        variant="outline"
        data-testid="emulator-add-host"
        isDisabled={isDisabled}
        borderColor={deviceColorClasses.get('host')}
        onClick={() => openView('CREATE_HOST')}
      >
        Host
      </Button>
      <Button
        size='sm'
        leftIcon={<AddIcon />}
        colorScheme="blue"
        borderColor={deviceColorClasses.get('switch')}
        variant="outline"
        isDisabled={isDisabled}
        data-testid="emulator-add-switch"
        onClick={() => openView('CREATE_SWITCH')}
      >
        Switch
      </Button>
      <Button
        size='sm'
        leftIcon={<AddIcon />}
        colorScheme="yellow"
        data-testid="emulator-add-router"
        isDisabled={isDisabled}
        borderColor={deviceColorClasses.get('router')}
        variant="outline"
        onClick={() => openView('CREATE_ROUTER')}
      >
        Router
      </Button>
    </ButtonGroup>
  );
}