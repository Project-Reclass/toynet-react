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


import { renderHook, act } from '@testing-library/react-hooks';
import { DeviceType } from 'src/common/types';
import { TopologyActions, useTopology } from 'src/Emulator/useTopology';

jest.mock('src/common/api/topology/requests');

const base = { connections: [], parent: null };


//the hostType etc. variables are needed to stop TS from complaining

const hostType = 'host' as DeviceType;
const defaultHost = {
  ...base,
  name: 'h1',
  type: hostType,
};

const switchType = 'switch' as DeviceType;
const defaultSwitch = {
  ...base,
  name: 's1',
  type: switchType,
};

const routerType = 'router' as DeviceType;
const defaultRouter = {
  ...base,
  name: 'r0',
  type: routerType,
};

describe('The useTopology custom hook', () => {
  it('should be able to add new hosts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.hosts).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_HOST, payload: defaultHost });
    });

    expect(result.current.hosts).toHaveLength(1);
    expect(result.current.hosts[0]).toEqual(defaultHost);
  });

  it('should be able to add switches', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.switches).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_SWITCH, payload: defaultSwitch });
    });

    expect(result.current.switches).toHaveLength(1);
    expect(result.current.switches[0]).toEqual(defaultSwitch);
  });

  it('should be able to add routers', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.routers).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_ROUTER, payload: defaultRouter });
    });

    expect(result.current.routers).toHaveLength(1);
    expect(result.current.routers[0]).toEqual(defaultRouter);
  });
});