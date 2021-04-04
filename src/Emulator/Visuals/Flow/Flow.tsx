/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  removeElements,
  Elements,
} from 'react-flow-renderer';

import { createElements, getLayoutedElements } from './utils';
import { DeviceInterface } from 'src/common/types';

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

const Flow = ({ switches, routers, hosts, isTesting = false }: Props) => {
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    const els = createElements([...routers, ...switches, ...hosts]);
    setElements(getLayoutedElements(els, 'LR', isTesting));
  }, [hosts, routers, switches, isTesting]);

  const onConnect = (params: any) =>
    setElements((els: any) =>
      addEdge({ ...params, type: 'smoothstep', animated: true }, els),
    );

  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  return (
    <ReactFlow
    elements={elements}
    onConnect={onConnect}
    nodesConnectable={false}
      onElementsRemove={onElementsRemove}
    >
      <RightAlignedControls
        showFitView={true}
      />
      <Background color="#aaa" gap={DEFAULT_BG_GAP} />
    </ReactFlow>
  );
};

export default Flow;