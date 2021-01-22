import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('src/common/api/topology/requests');
import { TopologyActions, useTopology } from 'src/Emulator/useTopology';

const base = { connections: [], parent: null }

const defaultHost = {
  ...base,
  name: 'h1',
  type: 'host',
}

const defaultSwitch = {
  ...base,
  name: 's1',
  type: 'switch',
}

const defaultRouter = {
  ...base,
  name: 'r0',
  type: 'router',
}

describe('The useTopology custom hook', () => {
  it('should be able to add new hosts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.hosts).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_HOST, payload: defaultHost })
    });

    expect(result.current.hosts).toHaveLength(1);
    expect(result.current.hosts[0]).toEqual(defaultHost);
  });

  it('should be able to add switches', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.switches).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_SWITCH, payload: defaultSwitch })
    });

    expect(result.current.switches).toHaveLength(1);
    expect(result.current.switches[0]).toEqual(defaultSwitch);
  });

  it('should be able to add routers', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTopology(1));

    await waitForNextUpdate();

    expect(result.current.routers).toHaveLength(0);

    act(() => {
      result.current.dispatch({ type: TopologyActions.ADD_ROUTER, payload: defaultRouter })
    });

    expect(result.current.routers).toHaveLength(1);
    expect(result.current.routers[0]).toEqual(defaultRouter);
  });
});