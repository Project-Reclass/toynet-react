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
import { render, waitFor, cleanup } from '@testing-library/react';
import { withEmulatorAndDialogueProvider, useEmulator } from 'src/common/providers/EmulatorProvider';
import { createToynetSession, getToynetSession } from 'src/common/api/topology/requests';
import RenderWithRouter from 'src/common/test-utils/renderWithRouter';

jest.mock('src/common/api/topology/requests.ts');
const createToynetMock = createToynetSession as jest.MockedFunction<typeof createToynetSession>;
const getToynetMock = getToynetSession as jest.MockedFunction<typeof getToynetSession>;

const toynetSessionKey = 'toynet-session-1';

const xml = `
<topology><root>r0</root><routerList><router name="r0" ip="172.16.0.1/24"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router><router name="r1" ip="0.0.0.0/0"><intf>0</intf></router></routerList><switchList><switch name="s1" /><switch name="s2" /></switchList><hostList><host name="h1" ip="172.16.0.2/24"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name="h2" ip="172.16.1.2/24"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name="r0"><intf>1</intf></dvc><dvc name="s1"><intf>0</intf></dvc></link><link><dvc name="r0"><intf>2</intf></dvc><dvc name="s2"><intf>0</intf></dvc></link><link><dvc name="s1"><intf>1</intf></dvc><dvc name="h1" /></link><link><dvc name="s2"><intf>1</intf></dvc><dvc name="h2" /></link><link><dvc name="r1"><intf>0</intf></dvc><dvc name="s1"><intf>0</intf></dvc></link></linkList></topology>
`;

const TestingComponent = withEmulatorAndDialogueProvider(() => {
  const { switches, routers, hosts, sessionId } = useEmulator();
  return (
      <div>
        {sessionId > 0 && <h1>SessionId: {sessionId}</h1>}
        {switches.map(s => <div key={s.name}>{s.name}</div>)}
        {routers.map(s => <div key={s.name}>{s.name}</div>)}
        {hosts.map(s => <div key={s.name}>{s.name}</div>)}
      </div>
  );
});

afterEach(cleanup);

describe('The EmulatorProvider', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    createToynetMock.mockClear();
    getToynetMock.mockClear();

    getToynetMock.mockResolvedValue({ topology: xml, topo_id: 1, user_id: '1' });
  });

  it('should provide switches, router, and hosts if a session key exits', async () => {
    window.sessionStorage.setItem(toynetSessionKey, '42');
    const { getByText } = render(
      <RenderWithRouter
        path='/module/:moduleId/emulator/:emulatorId'
        initialEntries={['/module/1/emulator/1']}
      >
        <TestingComponent />
      </RenderWithRouter>,
    );

    await waitFor(() => getByText(/SessionId: 42/i));

    expect(getByText(/r0/i)).toBeInTheDocument();
    expect(getByText(/s1/i)).toBeInTheDocument();
    expect(getByText(/h1/i)).toBeInTheDocument();
  });

  it('should provide switches, router, and hosts if a session key does not exits', async () => {
    createToynetMock.mockResolvedValue({
      toynet_session_id: 2,
    });

    const { getByText } = render(
      <RenderWithRouter
        path='/module/1/emulator/1'
        initialEntries={['/module/1/emulator/1']}
      >
        <TestingComponent />
      </RenderWithRouter>,
    );

    await waitFor(() => getByText(/SessionId: 2/i));

    expect(getByText(/r0/i)).toBeInTheDocument();
    expect(getByText(/s1/i)).toBeInTheDocument();
    expect(getByText(/h1/i)).toBeInTheDocument();
  });
});