import { useEffect, useReducer } from 'react';

import { SessionId } from '../common/api/topology/types';
import { DeviceInterface, Action } from '../common/types';
import { useToynetSession } from '../common/api/topology';
import { parseXMLTopology, ParsedXML } from '../common/topologyParser';

type ReducerAction = Action<TopologyActions, DeviceInterface | DeviceInterface[] | ParsedXML>;

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
  SET_TOPOLOGY,
  CLEAR,
}

function reducer(state: ParsedXML, action: ReducerAction) {
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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (data && !isLoading) {
      const res = parseXMLTopology(data.topology);
      dispatch({ type: TopologyActions.SET_TOPOLOGY, payload: res });
    }
  }, [dispatch, isLoading, data]);

  return {
    ...state,
    dispatch,
    isLoading,
    sessionId: data?.sessionId || -1,
  };
}
