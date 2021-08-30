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

import ClickableNode from './ClickableNode';

import './overrides.css';

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
