import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';

import { parseXMLTopology, ParsedXML } from '../topologyParser';
import { getBaseTopology } from '../api/topology';
import { DeviceInterface } from '../types';

export enum TopologyActions {
  ADD_SWITCH,
  ADD_ROUTER,
  ADD_HOST,
  SET_SWITCHES,
  SET_HOSTS,
  SET_ROUTERS,
  SET_TOPOLOGY,
  CLEAR,
}

interface Action {
  type: TopologyActions;
  payload: DeviceInterface | DeviceInterface[] | ParsedXML;
}

function reducer(state: ParsedXML, action: Action) {
  switch (action.type) {
    case TopologyActions.ADD_ROUTER:
    case TopologyActions.ADD_SWITCH:
    case TopologyActions.ADD_HOST:
      const addKey = action.type === TopologyActions.ADD_ROUTER ? 'routers' :
        action.type === TopologyActions.ADD_SWITCH ? 'switches' : 'hosts';
      return {
        ...state,
        [addKey]: [...state[addKey], action.payload],
      };

    case TopologyActions.SET_HOSTS:
    case TopologyActions.SET_ROUTERS:
    case TopologyActions.SET_SWITCHES:
      const setKey = action.type === TopologyActions.SET_ROUTERS ? 'routers' :
        action.type === TopologyActions.SET_SWITCHES ? 'switches' : 'hosts';
      return {
        ...state,
        [setKey]: action.payload,
      };

    case TopologyActions.SET_TOPOLOGY:
      return {
        ...action.payload as ParsedXML,
      };

    case TopologyActions.CLEAR:
      return initialState;

    default:
      return {
        ...state,
      };
  }
}

const initialState: ParsedXML = {
  switches: [],
  routers: [],
  hosts: [],
};

/**
 * Provides parsed topology state retrieved from the server.
 */
export function useTopology(id: number) {
  const { data, isLoading, ...rest } = useQuery(`get-topology-${id}`, () => getBaseTopology(id));
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isLoading && data) {
      const res = parseXMLTopology(data.networkconfig);
      dispatch({ type: TopologyActions.SET_TOPOLOGY, payload: res });
    }
  }, [data, dispatch, isLoading]);

  return {
    dispatch,
    isLoading,
    ...rest,
    ...state,
  };
}