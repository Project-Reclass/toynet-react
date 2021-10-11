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
import isInValidLink from 'src/Emulator/Visuals/Flow/isInValidLink';

const defaultHost: DeviceInterface = {
  name: 'H1',
  type: 'host',
  connections: [],
  interfaces: [],
};

const defaultRouter: DeviceInterface = {
  name: 'R1',
  type: 'router',
  connections: [],
  interfaces: ['172.1.1.1/24'],
};

const defaultSwitch: DeviceInterface = {
  name: 'S1',
  type: 'switch',
  connections: [],
  interfaces: [],
};

describe('the valid link function', () => {
  describe('switch validators', () => {
    it('should not allow a switch to connect to another device it is already connected to', () => {
      expect(isInValidLink(defaultSwitch, {...defaultHost, connections: [defaultSwitch.name]})).toBeTruthy();
      expect(isInValidLink({...defaultSwitch, connections: [defaultRouter.name]}, defaultRouter)).toBeTruthy();
    });
    it('should allow a switch to connect to a host', () => {
      expect(isInValidLink(defaultSwitch, defaultHost)).toBeNull();
      expect(isInValidLink(defaultHost, defaultSwitch)).toBeNull();
    });
    it('should allow a switch to connect to another switch', () => {
      expect(isInValidLink(defaultSwitch, {...defaultSwitch, name: 'S2'})).toBeNull();
    });
    it('should allow a switch to connect to to a router', () => {
      expect(isInValidLink(defaultSwitch, defaultRouter)).toBeNull();
      expect(isInValidLink(defaultRouter, defaultSwitch)).toBeNull();
    });
  });
  describe('router validators', () => {
    it('should now allow a router to connect to another device it is already connected to', () => {
      expect(isInValidLink(defaultRouter, {...defaultSwitch, connections: [defaultRouter.name]})).toBeTruthy();
      expect(isInValidLink({...defaultRouter, connections: [defaultSwitch.name]}, defaultSwitch)).toBeTruthy();
    });
    it('should allow a router to connect to another router', () => {
      expect(isInValidLink(defaultRouter, {...defaultRouter, name: 'R2'})).toBeNull();
    });
    it('should allow a router to connect to a switch', () => {
      expect(isInValidLink(defaultRouter, defaultSwitch)).toBeNull();
      expect(isInValidLink(defaultSwitch, defaultRouter)).toBeNull();
    });
    it('should not allow a router to connect to a host', () => {
      expect(isInValidLink(defaultRouter, defaultHost)).toBeTruthy();
      expect(isInValidLink(defaultHost, defaultRouter)).toBeTruthy();
    });
  });
  describe('host validators', () => {
    it('should now allow a router to connect to another device it is already connected to', () => {
      expect(isInValidLink(defaultHost, {...defaultSwitch, connections: [defaultHost.name]})).toBeTruthy();
      expect(isInValidLink({...defaultSwitch, connections: [defaultHost.name]}, defaultHost)).toBeTruthy();
    });
    it('should not allow a host to connect to another host', () => {
      expect(isInValidLink(defaultHost, {...defaultHost, name: 'H2'})).toBeTruthy();
    });
    it('should allow a host to connect to a switch', () => {
      expect(isInValidLink(defaultHost, defaultSwitch)).toBeNull();
      expect(isInValidLink(defaultSwitch, defaultHost)).toBeNull();
    });
    it('should not allow a host to connect to another device if it already has a connection', () => {
      const connectedHost = {...defaultHost, name: 'H2', connections: ['S1']};
      expect(isInValidLink(defaultHost, connectedHost)).toBeTruthy();
      expect(isInValidLink(connectedHost, defaultHost)).toBeTruthy();
    });
  });
});