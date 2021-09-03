import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import localforage from 'localforage';
import ReactFlow, {
  ReactFlowProvider,
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

import { createElements, getLayoutedElements, mergeElementLayouts } from './utils';
import { DeviceInterface } from 'src/common/types';
import { Button, ButtonGroup } from '@chakra-ui/core';
import { useEmulator } from 'src/Emulator/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';
import { deviceColorClasses } from 'src/Emulator/Device/deviceColors';

import ClickableNode from './ClickableNode';

import './overrides.css';

export interface Props {
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

const Flow = ({ switches, routers, hosts, isTesting = false }: Props) => {
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const [elements, setElements] = useState<Elements>([]);
  const { dispatch } = useEmulator();

  const { transform } = useZoomPanHelper();

  const handleRestore = useCallback((newElements: Elements) => {
    const restore = async () => {
      const flow = await localforage.getItem<FlowExportObject>(FLOW_STORE_KEY);
      const [x = 1, y = 1] = flow?.position || [];
      setElements(mergeElementLayouts(newElements, flow?.elements || []));
      console.log({ x, y, zoom: flow?.zoom || 1 });

      if (flow)
        transform({ x, y, zoom: flow?.zoom || 1 });
    };

    restore();
  }, [transform]);

  const handleSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(FLOW_STORE_KEY, flow);
    }
  }, [rfInstance]);

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
          <Button onClick={handleSave}>
            Save
          </Button>
          <Button onClick={() => handleRestore(elements)}>
            Restore
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
