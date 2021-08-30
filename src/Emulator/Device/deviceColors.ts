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
import { DeviceType } from 'src/common/types';

export type LinkFunc = (from: string, to: string) => any;

export enum DeviceColor {
  EMPTY = '#707070',
  ROUTER = '#BDA913',
  SWITCH = '#008A9E',
  HOST = '#9E1059',
}

export const deviceColorClasses = new Map<DeviceType | 'empty', DeviceColor>();
deviceColorClasses.set('router', DeviceColor.ROUTER);
deviceColorClasses.set('switch', DeviceColor.SWITCH);
deviceColorClasses.set('host', DeviceColor.HOST);
deviceColorClasses.set('empty', DeviceColor.EMPTY);