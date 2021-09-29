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
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useDisclosure } from '@chakra-ui/core';
import Drawer from '.';

export type DrawerView = 'CREATE_HOST' | 'CREATE_ROUTER' |
                         'CREATE_SWITCH' | 'INFO';

interface DrawerState {
  isOpen: boolean;
  view: DrawerView;
  setView: React.Dispatch<React.SetStateAction<DrawerView>>,
  onOpen: () => any,
  onClose: () => any,
  onToggle: () => any,
  openView: (view: DrawerView) => any,
}

const DrawerContext = createContext<DrawerState>({
  isOpen: false,
  view: 'INFO',
  openView: (_: DrawerView) => {},
  setView: () => {},
  onOpen: () => {},
  onClose: () => {},
  onToggle: () => {},
});

export const DrawerProvider: FC = ({ children }) => {
  const [view, setView] = useState<DrawerView>('INFO');
  const value = useDisclosure();

  const openView = useCallback((view: DrawerView) => {
    setView(view);
    value.onOpen();
  }, [value]);

  return (
    <DrawerContext.Provider value={{ ...value, view, setView, openView }}>
      <Drawer />
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
export default DrawerProvider;