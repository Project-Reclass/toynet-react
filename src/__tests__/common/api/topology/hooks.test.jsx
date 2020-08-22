import { renderHook, act, cleanup } from '@testing-library/react-hooks'

jest.mock('src/common/api/topology/requests');
import { createToynetSession, getToynetSession } from 'src/common/api/topology/requests';
import { useToynetSession } from 'src/common/api/topology';

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\"?><topology><root>r0</root><routerList><router name=\"r0\" ip=\"172.16.0.1/24\"><intf>10.0.0.1/30</intf><intf>172.16.0.1/24</intf><intf>172.16.1.1/24</intf></router></routerList><switchList><switch name=\"s1\" /><switch name=\"s2\" /></switchList><hostList><host name=\"h1\" ip=\"172.16.0.2/24\"><defaultRouter><name>r0</name><intf>1</intf></defaultRouter></host><host name=\"h2\" ip=\"172.16.1.2/24\"><defaultRouter><name>r0</name><intf>2</intf></defaultRouter></host></hostList><linkList><link><dvc name=\"r0\"><intf>1</intf></dvc><dvc name=\"s1\"><intf>0</intf></dvc></link><link><dvc name=\"r0\"><intf>2</intf></dvc><dvc name=\"s2\"><intf>0</intf></dvc></link><link><dvc name=\"s1\"><intf>1</intf></dvc><dvc name=\"h1\" /></link><link><dvc name=\"s2\"><intf>1</intf></dvc><dvc name=\"h2\" /></link></linkList></topology>
`
const toynetSessionKey = 'toynet-session-1'

afterEach(cleanup);

describe('the useToynetSession custom hook', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    createToynetSession.mockClear();
    getToynetSession.mockClear();

    getToynetSession.mockResolvedValue({ topology: xml });
  });

  it('should create a new session if no session exists', async () => {
    createToynetSession.mockResolvedValue({
      message: '',
      session_id: 2,
      topology: '',
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
    window.sessionStorage.setItem(toynetSessionKey, 42);
    const { waitForNextUpdate } = renderHook(() => useToynetSession(1));

    await waitForNextUpdate();

    expect(getToynetSession).toHaveBeenCalled();
    expect(getToynetSession).toHaveBeenCalledWith(42);
    expect(createToynetSession).not.toHaveBeenCalled();
  });

  it('should return a session id and a topology string', async () => {
    window.sessionStorage.setItem(toynetSessionKey, 42);
    const { result, waitForNextUpdate } = renderHook(() => useToynetSession(1));

    await waitForNextUpdate();

    expect(result.current.data.sessionId).toEqual(42);
    expect(result.current.data.topology).toEqual(xml);
  });
});