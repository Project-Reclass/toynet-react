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
import { DeviceInterface } from 'src/common/types';
import isValidLink from 'src/Emulator/Visuals/Flow/isValidLink';

const defaultHost: DeviceInterface = {
  name: 'H1',
  type: 'host',
  connections: [],
};

const defaultRouter: DeviceInterface = {
  name: 'R1',
  type: 'router',
  connections: [],
};

const defaultSwitch: DeviceInterface = {
  name: 'S1',
  type: 'switch',
  connections: [],
};

describe('the valid link function', () => {
  it('should not allow a host to connect with a router', () => {
    expect(isValidLink(defaultHost, defaultSwitch)).toBeTruthy();
    expect(isValidLink(defaultSwitch, defaultHost)).toBeTruthy();
  });
});