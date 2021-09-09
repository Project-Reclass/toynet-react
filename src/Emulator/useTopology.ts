import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import { DeviceInterface, Action, ReducerFn } from '../common/types';
import { parseXMLTopology, ParsedXML } from '../common/topologyParser';
import { SessionId, CommandRequest } from '../common/api/topology/types';
import { useToynetSession, useModifyTopology } from '../common/api/topology';

// This set is used to ensure that there are no duplicate names sent to the server to be created when there is latency
const existingDevices = new Set<string>();

// This queue is used to queue up requests to the server for mininet commands. (currently not used)
const queue: CommandRequest[] = [];

export interface Connection {
  to: string;
  from: string;
}
type ReducerAction = Action<TopologyActions, DeviceInterface | DeviceInterface[] | ParsedXML | Connection>;

export interface TopologyState {
  hosts: DeviceInterface[];
  routers: DeviceInterface[];
  switches: DeviceInterface[];
  dispatch: React.Dispatch<ReducerAction>;
  isLoading: boolean;
  sessionId: SessionId;
}

export enum TopologyActions {
  ADD_SWITCH,
  ADD_ROUTER,
  ADD_HOST,
  SET_SWITCHES,
  SET_HOSTS,
  SET_ROUTERS,
  ADD_CONNECTION,
  SET_TOPOLOGY,

  DELETE_CONNECTION,
  DELETE_SWITCH,
  DELETE_HOST,
  DELETE_ROUTER,

  CLEAR,

  FLUSH_QUEUE,
}

function reducer(state: ParsedXML, action: ReducerAction) {
  switch (action.type) {
    case TopologyActions.ADD_ROUTER:
    case TopologyActions.ADD_SWITCH:
    case TopologyActions.ADD_HOST:
      const addKey = action.type === TopologyActions.ADD_ROUTER ? 'routers' :
        action.type === TopologyActions.ADD_SWITCH ? 'switches' : 'hosts';
      state[addKey].push(action.payload as DeviceInterface);
      return;

    case TopologyActions.SET_HOSTS:
    case TopologyActions.SET_ROUTERS:
    case TopologyActions.SET_SWITCHES:
      const setKey = action.type === TopologyActions.SET_ROUTERS ? 'routers' :
        action.type === TopologyActions.SET_SWITCHES ? 'switches' : 'hosts';
      state[setKey] = action.payload as DeviceInterface[];
      return;

    case TopologyActions.ADD_CONNECTION:
      const { to, from } = action.payload as Connection;
      const devices = [...state.routers, ...state.hosts, ...state.switches];
      for (const device of devices) {
        if (device.name === to)
          device.connections.push(from);
        if (device.name === from)
          device.connections.push(to);
      }
      return;

    case TopologyActions.DELETE_HOST:
    case TopologyActions.DELETE_ROUTER:
    case TopologyActions.DELETE_SWITCH:
      console.log(action.payload);
      const deleteKey = action.type === TopologyActions.DELETE_ROUTER ? 'routers' :
        action.type === TopologyActions.DELETE_SWITCH ? 'switches' : 'hosts';
      const device = action.payload as DeviceInterface;
      const deviceIndex = state[deleteKey].findIndex(d => d.name === device.name);
      if (deviceIndex !== -1)
        state[deleteKey].splice(deviceIndex, 1);
      return;

    case TopologyActions.DELETE_CONNECTION:
      const { to: toDelete, from: fromDelete } = action.payload as Connection;
      const deleteDevices = [...state.routers, ...state.hosts, ...state.switches];
      for (const device of deleteDevices) {
        if (device.name === fromDelete || device.name === toDelete) {
          const deviceName = device.name === fromDelete ? toDelete : fromDelete;
          const idx = device.connections.findIndex(name => name === deviceName);
          if (idx !== -1)
            device.connections.splice(idx, 1);
        }
      }
      break;

    case TopologyActions.SET_TOPOLOGY:
      state.routers = (action.payload as ParsedXML).routers;
      state.switches = (action.payload as ParsedXML).switches;
      state.hosts = (action.payload as ParsedXML).hosts;
      return;
  }
};

// This is probably not the best way to do this, but it's the best way right now.
// we should look at a better way to handle mutations after dispatch in the future.
type CommandFn = (cmd: CommandRequest) => any;
function mutationWrapper (id: SessionId, dispatch: ReducerFn<ReducerAction>, mutate: CommandFn) {
  return (action: ReducerAction) => {
    switch (action.type) {
      case TopologyActions.ADD_CONNECTION:
        const { to, from } = action.payload as Connection;
        queue.push({ id, command: `add link ${to} ${from}` });
        mutate({ id, command: `add link ${to} ${from}` });
        break;

      case TopologyActions.ADD_ROUTER:
      case TopologyActions.ADD_SWITCH:
      case TopologyActions.ADD_HOST:
        const addKey = action.type === TopologyActions.ADD_ROUTER ? 'router' :
          action.type === TopologyActions.ADD_SWITCH ? 'switch' : 'host';
        const { name } = action.payload as DeviceInterface;
        if (!existingDevices.has(name)) {
          existingDevices.add(name);
          queue.push({ id, command: `add ${addKey} ${name}` });
          mutate({ id, command: `add ${addKey} ${name}` });
        }
        break;

      case TopologyActions.FLUSH_QUEUE:
        queue.forEach(mutate);
        queue.splice(0, queue.length);
        break;

      // DELETE_CONNECTION handles removing devices from the server and also removing links
      case TopologyActions.DELETE_CONNECTION:
        const { to: toDelete, from: fromDelete } = action.payload as Connection;
        if (toDelete === fromDelete) {
            mutate({ id, command: `remove ${getNameFromDevice(fromDelete)} ${fromDelete}` });
            existingDevices.delete(toDelete);
            return;
        } else {
          mutate({ id, command: `remove link ${fromDelete} ${toDelete}` });
        }
        break;

      default:
        break;
    }

    dispatch(action);
  };
};

const getNameFromDevice = (key: string): string => {
  if (key.length < 1) return '';
  switch (key[0].toLocaleLowerCase()) {
    case 'h': return 'host';
    case 's': return 'switch';
    case 'r': return 'router';
    default: return '';
  }
};

const initialState: ParsedXML = {
  switches: [],
  routers: [],
  hosts: [],
};

/**
 * Provides parsed topology state retrieved from the server.
 */
export function useTopology(id: number) {
  const { data, isLoading } = useToynetSession(id);
  const [mutate] = useModifyTopology(data?.sessionId || -1);
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (data && !isLoading) {
      const res = parseXMLTopology(data.topology);
      dispatch({ type: TopologyActions.SET_TOPOLOGY, payload: res });
    }
  }, [dispatch, isLoading, data]);

  return {
    ...state,
    isLoading,
    dispatch: mutationWrapper(data?.sessionId || -1, dispatch, mutate),
    sessionId: data?.sessionId || -1,
  };
}
