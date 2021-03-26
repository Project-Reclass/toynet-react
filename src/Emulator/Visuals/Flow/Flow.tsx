/* @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  removeElements,
  Elements,
} from 'react-flow-renderer';

import { useEmulator } from 'src/Emulator/EmulatorProvider';

import { createElements, getLayoutedElements } from './utils';

const DEFAULT_BG_GAP = 16;

const Flow = () => {
  const { switches, routers, hosts } = useEmulator();
  const [elements, setElements] = React.useState<Elements>([]);

  React.useEffect(() => {
    const els = createElements([...routers, ...switches, ...hosts]);
    setElements(getLayoutedElements(els));
  }, [hosts, routers, switches]);

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
      onElementsRemove={onElementsRemove}
      nodesConnectable={false}
    >
      <Controls
        css={css`
          right: 10px;
          left: unset !important;
        `}
        showFitView={true}
      />
      <Background color="#aaa" gap={DEFAULT_BG_GAP} />
    </ReactFlow>
  );
};

export default Flow;