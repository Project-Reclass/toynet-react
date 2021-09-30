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

import React, { useMemo } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/core';
import { useEmulator } from 'src/common/providers/EmulatorProvider';
import { DrawerView as IDrawerView, useDrawer } from 'src/common/providers/DrawerProvider';

import DrawerView from './DrawerViews';
import InfoTable from './InfoTable';

/**
 * Determines the number of the newly added device
 */
 export const getNextNumber = (s: string) => Number(s.slice(1)) + 1;

/**
 * Determines the name of the newly added device
 */
 export const getNextDeviceName = (
   device: Array<{name: string}>,
   deviceLetter: string,
) => {
  if (device.length < 1) {
    return `${deviceLetter}1`;
  } else {
    const lastDeviceName = device[device.length - 1].name;
    return `${deviceLetter}${getNextNumber(lastDeviceName)}`;
  }
};

const drawerNames: Map<IDrawerView, string> = new Map([
  ['INFO', 'Topology Info'],
  ['CREATE_HOST', 'Create Host'],
  ['CREATE_ROUTER', 'Create Router'],
  ['CREATE_SWITCH', 'Create Switch'],
]);

export const getNameForView = (view: IDrawerView): string =>
  drawerNames.get(view) || 'Drawer';

export default function CreationDrawer() {
  const { switches, hosts, routers } = useEmulator();
  const { activeName, isOpen, view, onClose } = useDrawer();

  const viewName = useMemo(() => getNameForView(view), [view]);

  const nameHint = useMemo(() => {
    const deviceLetter = view === 'CREATE_HOST' ? 'H' :
      view === 'CREATE_ROUTER' ? 'R' :
      view === 'CREATE_SWITCH' ? 'S' : 'i';
    const devices = view === 'CREATE_HOST' ? hosts :
      view === 'CREATE_ROUTER' ? routers :
      view === 'CREATE_SWITCH' ? switches : [];

    return getNextDeviceName(devices, deviceLetter);
  }, [hosts, routers, switches, view]);

  return (
    <Drawer
      size='lg'
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor='#454950'>
        <DrawerCloseButton />
        <DrawerHeader>{viewName}</DrawerHeader>

        <DrawerBody overflowY='auto'>
          {view !== 'INFO' &&
            <DrawerView
              view={view}
              nameHint={nameHint}
            />
          }
          <InfoTable activeName={activeName} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}