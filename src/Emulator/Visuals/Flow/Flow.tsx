import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  removeElements,
  Elements,
  updateEdge,
} from 'react-flow-renderer';

import { createElements, getLayoutedElements } from './utils';
import { DeviceInterface } from 'src/common/types';
import { Button, ButtonGroup } from '@chakra-ui/core';
import { useEmulator } from 'src/Emulator/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';
import { deviceColorClasses } from 'src/Emulator/Device/deviceColors';
import CustomEdge from './CustomEdge';

interface Props {
  hosts: DeviceInterface[],
  routers: DeviceInterface[],
  switches: DeviceInterface[],

  isTesting?: boolean,
}

const DEFAULT_BG_GAP = 16;

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
   console.log({device, deviceLetter});
  if (device.length < 1) {
    return `${deviceLetter}1`;
  } else {
    const lastDeviceName = device[device.length - 1].name;
    return `${deviceLetter}${getNextNumber(lastDeviceName)}`;
  }
};

const ContextMenu = styled.div`

`;

const Flow = ({ switches, routers, hosts, isTesting = false }: Props) => {
  const [elements, setElements] = useState<Elements>([]);
  const { dispatch } = useEmulator();

  useEffect(() => {
    const els = createElements([...routers, ...switches, ...hosts]);
    setElements(getLayoutedElements(els, 'LR', isTesting));
  }, [hosts, routers, switches, isTesting]);

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
      onEdgeUpdate={onEdgeUpdate}
      onElementsRemove={onElementsRemove}
      edgeTypes={{custom: CustomEdge}}
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
          borderColor={deviceColorClasses.get('h')}
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
          borderColor={deviceColorClasses.get('s')}
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
          borderColor={deviceColorClasses.get('r')}
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
