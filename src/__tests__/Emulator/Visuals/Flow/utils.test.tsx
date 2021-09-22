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
import { createElements } from 'src/Emulator/Visuals/Flow/utils';


const hostType = 'host' as DeviceType;
const switchType = 'switch' as DeviceType;
const routerType = 'router' as DeviceType;

const defaultDevices = [
  {
    name: 'h1',
    type: hostType,
    connections: ['s1'],
  },
  {
    name: 'h2',
    type: switchType,
    connections: ['s1'],
  },
  {
    name: 's1',
    type: switchType,
    connections: ['r1', 'h2', 'h1'],
  },
  {
    name: 'r1',
    type: routerType,
    connections: ['s1'],
  },
];

const expectedConns = [
  {
    source: 's1',
    target: 'r1',
  },
  {
    source: 'h1',
    target: 's1',
  },
  {
    source: 'h2',
    target: 's1',
  },
];

describe('createElements', () => {
  it('should create the same amount of flow elements plus links', () => {
    const flowElements = createElements(defaultDevices);
    expect(flowElements.length).toBeGreaterThanOrEqual(flowElements.length);
  });
  it('should create flow nodes for switch, router, and host', () => {
    const flowElements = createElements(defaultDevices);
    const flowIds = flowElements.map(el => el.id);
    const deviceIds = defaultDevices.map(el => el.name);

    for (let id of deviceIds) {
      expect(flowIds).toContain(id);
    }
  });
  it('should create links between flow elements', () => {
    const flowElements: any[] = createElements(defaultDevices);
    for (let conn of expectedConns) {
      const link = flowElements.find(el => el.source === conn.source);
      expect(link).toBeDefined();
      expect(link.target).toEqual(conn.target);
    }
  });
  it('should not create duplicate links', () => {
    // if this test and the above test pass then we know that there are
    // no duplicate links created
    const flowElements = createElements(defaultDevices);
    expect(flowElements.length).toEqual(defaultDevices.length + expectedConns.length);
  });
});