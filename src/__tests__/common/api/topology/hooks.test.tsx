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
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { createToynetSession, getToynetSession } from 'src/common/api/topology/requests';
import { useToynetSession } from 'src/common/api/topology';

jest.mock('src/common/api/topology/requests.ts');
const createToynetMock = createToynetSession as jest.MockedFunction<typeof createToynetSession>;
const getToynetMock = getToynetSession as jest.MockedFunction<typeof getToynetSession>;

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`;
const toynetSessionKey = 'toynet-session-1';
const SESSIONID = 42;

afterEach(cleanup);

describe('the useToynetSession custom hook', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    createToynetMock.mockClear();
    createToynetMock.mockClear();

    getToynetMock.mockResolvedValue({ topology: xml, topo_id: 1, user_id: '1' });
  });

  it('should create a new session if no session exists', async () => {
    createToynetMock.mockResolvedValue({
      toynet_session_id: 2,
    });

    const { waitForNextUpdate } = renderHook(() => useToynetSession(1));

    await waitForNextUpdate();

    expect(createToynetSession).toHaveBeenCalled();
    expect(getToynetSession).toHaveBeenCalled();
    expect(getToynetSession).toHaveBeenCalledWith(2);
    act(() => {
      expect(window.sessionStorage.getItem(toynetSessionKey)).toEqual('2');
    });
  });

  it('should not create a session if one already exists', async () => {
    window.sessionStorage.setItem(toynetSessionKey, '42');
    const { waitForNextUpdate } = renderHook(() => useToynetSession(1));

    await waitForNextUpdate();

    expect(getToynetSession).toHaveBeenCalled();
    expect(getToynetSession).toHaveBeenCalledWith(SESSIONID);
    expect(createToynetSession).not.toHaveBeenCalled();
  });

  it('should return a session id and a topology string', async () => {
    window.sessionStorage.setItem(toynetSessionKey, '42');
    const { result, waitForNextUpdate } = renderHook(() => useToynetSession(1));

    await waitForNextUpdate();

    expect(result.current.data?.sessionId).toEqual(SESSIONID);
    expect(result.current.data?.topology).toEqual(xml);
  });
});