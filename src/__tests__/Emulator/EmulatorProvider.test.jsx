import React from 'react';
import { render, waitForElement, cleanup, act } from '@testing-library/react';

jest.mock('src/common/api/topology/requests')
import { withEmulatorProvider, useEmulator } from 'src/Emulator/EmulatorProvider';
import { createToynetSession, getToynetSession } from 'src/common/api/topology/requests';

const toynetSessionKey = 'toynet-session-1'

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`

const TestingComponent = withEmulatorProvider(() => {
  const { switches, routers, hosts, sessionId } = useEmulator();
  return (
    <div>
      {sessionId > 0 && <h1>SessionId: {sessionId}</h1>}
      {switches.map(s => <div key={s.name}>{s.name}</div>)}
      {routers.map(s => <div key={s.name}>{s.name}</div>)}
      {hosts.map(s => <div key={s.name}>{s.name}</div>)}
    </div>
  )
});

afterEach(cleanup);

describe('The EmulatorProvider', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    createToynetSession.mockClear();
    getToynetSession.mockClear();

    getToynetSession.mockResolvedValue({ topology: xml });
  });

  it('should provide switches, router, and hosts if a session key exits', async () => {
    window.sessionStorage.setItem(toynetSessionKey, 42);
    const { getByText, findAllByText } = render(<TestingComponent />);

    await waitForElement(() => findAllByText(/SessionId: 42/i));

    expect(getByText(/r0/i)).toBeInTheDocument();
    expect(getByText(/s1/i)).toBeInTheDocument();
    expect(getByText(/h1/i)).toBeInTheDocument();
  });

  it('should provide switches, router, and hosts if a session key does not exits', async () => {
    createToynetSession.mockResolvedValue({
      message: '',
      session_id: 2,
      topology: '',
    });

    const { getByText, findAllByText } = render(<TestingComponent />);

    await waitForElement(() => findAllByText(/SessionId: 2/i));

    expect(getByText(/r0/i)).toBeInTheDocument();
    expect(getByText(/s1/i)).toBeInTheDocument();
    expect(getByText(/h1/i)).toBeInTheDocument();
  });
});