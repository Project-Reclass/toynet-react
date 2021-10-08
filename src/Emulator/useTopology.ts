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
import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import { DeviceInterface, Action } from '../common/types';
import { parseXMLTopology, ParsedXML } from '../common/topologyParser';
import { SessionId } from '../common/api/topology/types';
import { useToynetSession } from '../common/api/topology';

export interface Connection {
  to: string;
  from: string;
}
type ReducerAction = Action<TopologyActions,
  DeviceInterface | DeviceInterface[] | ParsedXML | Connection>;

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
    dispatch: dispatch,
    sessionId: data?.sessionId || -1,
  };
}
