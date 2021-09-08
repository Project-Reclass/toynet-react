import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/core';
import styled from '@emotion/styled';
import localforage from 'localforage';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  removeElements,
  Elements,
  updateEdge,
  OnLoadParams,
  FlowExportObject,
  useZoomPanHelper,
} from 'react-flow-renderer';

import { DeviceInterface } from 'src/common/types';
import { SessionId } from 'src/common/api/topology/types';
import { TopologyActions } from 'src/Emulator/useTopology';
import { useEmulator } from 'src/Emulator/EmulatorProvider';
import { deviceColorClasses } from 'src/Emulator/Device/deviceColors';

import ClickableNode from './ClickableNode';
import { createElements, getLayoutedElements, mergeElementLayouts } from './utils';

import './overrides.css';

export interface Props {
  sessionId: SessionId;
  hosts: DeviceInterface[],
  routers: DeviceInterface[],
  switches: DeviceInterface[],

  isTesting?: boolean,
}

localforage.config({
  name: 'emulator-flow',
  storeName: 'flow',
});

const DEFAULT_BG_GAP = 16;
const FLOW_STORE_KEY = 'flow-ui';

const RightAlignedControls = styled(Controls)`
  right: 10px;
  left: unset !important;
`;

const CustomControls = styled(ButtonGroup)`
  z-index: 5;
  position: relative;
`;

/**
 * Determines the number of the newly added device
 */
 export const getNextNumber = (s: string) => Number(s.slice(1)) + 1;

/**
 * Determines the name of the newly added device
 */
 export const getNextDeviceName = (device: Array<{name: string}>, deviceLetter: string) => {
  if (device.length < 1) {
    return `${deviceLetter}1`;
  } else {
    const lastDeviceName = device[device.length - 1].name;
    return `${deviceLetter}${getNextNumber(lastDeviceName)}`;
  }
};

const nodeTypes = {
  default: ClickableNode,
};

const Flow = ({ sessionId, switches, routers, hosts, isTesting = false }: Props) => {
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const [elements, setElements] = useState<Elements>([]);
  const { dispatch } = useEmulator();

  const { transform, fitView } = useZoomPanHelper();

  /**
   * We need to use the `sessionId` here since we do not want to use an old session's
   * layout when the user creates a new toynet session.
   */
  const flowSessionKey = useMemo(() => `${FLOW_STORE_KEY}-${sessionId}`, [sessionId]);

  const handleRestore = useCallback((newElements: Elements) => {
    const restore = async () => {
      const flow = await localforage.getItem<FlowExportObject>(flowSessionKey);
      const [x = 1, y = 1] = flow?.position || [];
      setElements(mergeElementLayouts(newElements, flow?.elements || []));

      if (newElements.length !== flow?.elements.length) {
        fitView();
      } else {
        transform({ x, y, zoom: flow?.zoom || 1 });
      }
    };

    restore();
  }, [fitView, flowSessionKey, transform]);

  const handleSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowSessionKey, flow);
    }
  }, [rfInstance, flowSessionKey]);

  useEffect(() => {
    const els = createElements([...routers, ...switches, ...hosts]);
    handleRestore(getLayoutedElements(els, 'LR', isTesting));
  }, [hosts, routers, switches, isTesting, handleRestore, handleSave]);

  const onConnect = (params: any) => {
    dispatch({ type: TopologyActions.ADD_CONNECTION, payload: { from: params.source, to: params.target }});
    setElements((els: any) =>
      addEdge({ ...params, type: 'smoothstep', animated: true }, els),
    );
  };

  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onEdgeUpdate = (oldEdge: any, newConnection: any) => {
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };

  return (
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onLoad={setRfInstance}
        onNodeDragStop={handleSave}
        onDragEnd={handleSave}
        onMouseLeave={handleSave}
        onEdgeUpdate={onEdgeUpdate}
        onElementsRemove={onElementsRemove}
        nodeTypes={nodeTypes}
      >
        <CustomControls
          spacing={3}
          padding={3}
        >
          <Button
            size='sm'
            leftIcon="add"
            variantColor="pink"
            variant="outline"
            borderColor={deviceColorClasses.get('host')}
            onClick={() => dispatch({
              type: TopologyActions.ADD_HOST,
              payload: {
                name: getNextDeviceName(hosts, 'h'),
                type: 'host',
                connections: [],
                },
              })
            }
          >
            Host
          </Button>
          <Button
            size='sm'
            leftIcon="add"
            variantColor="blue"
            borderColor={deviceColorClasses.get('switch')}
            variant="outline"
            onClick={() => dispatch({
              type: TopologyActions.ADD_SWITCH,
              payload: {
                name: getNextDeviceName(switches, 's'),
                type: 'switch',
                connections: [],
              },
            })
          }
          >
            Switch
          </Button>
          <Button
            size='sm'
            leftIcon="add"
            variantColor="yellow"
            borderColor={deviceColorClasses.get('router')}
            variant="outline"
            onClick={() => dispatch({
              type: TopologyActions.ADD_ROUTER,
              payload: {
                name: getNextDeviceName(routers, 'r'),
                type: 'router',
                connections: [],
              },
            })
          }
          >
            Router
          </Button>
        </CustomControls>
        <RightAlignedControls
          showFitView={true}
        />
        <Background color="#aaa" gap={DEFAULT_BG_GAP} />
      </ReactFlow>
  );
};

export default Flow;
