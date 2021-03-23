/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import dagre from 'dagre';
import ReactFlow, {
  Controls,
  Background,
  isNode,
  addEdge,
  removeElements,
  Elements,
  Edge,
  Position,
  Connection,
  updateEdge,
} from 'react-flow-renderer';

import { DeviceInterface } from 'src/common/types';
import { useEmulator } from 'src/Emulator/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';

import './flow_overrides.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements: Elements, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map(el => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. More over we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x + nodeWidth + Math.random() / 1000,
        y: nodeWithPosition.y + nodeHeight,
      };
    }

    return el;
  });
};

const createElements = (devices: DeviceInterface[]) => {
  const position = { x: 0, y: 0 };
  const elements: Elements = [];
  const seen = new Set<string>();
  for (let device of devices) {
    const { name, connections } = device;
    seen.add(name);
    elements.push({
      id: name,
      position,
      data: { label: name },
    });
    connections.forEach(conn => {
      if (seen.has(conn)) { // parent has been created so create the link.
        elements.push({
          id: `e${conn}-${name}`,
          source: conn,
          target: name,
          animated: true,
        });
      }
    });
  }
  return elements;
};

const Flow = () => {
  const { switches, routers, hosts, dispatch } = useEmulator();
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    const els = createElements([...routers, ...switches, ...hosts]);
    setElements(getLayoutedElements(els));
  }, [hosts, routers, switches]);

  const onConnect = (params: any) =>
    setElements((els: any) =>
      addEdge({ ...params, type: 'smoothstep', animated: true }, els),
    );

  const onElementsRemove = (elementsToRemove: any) =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    console.error({ oldEdge, newConnection });
    dispatch({ type: TopologyActions.ADD_CONNECTION, payload: {
      to: newConnection.target as string, from: newConnection.source as string },
    });
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onEdgeUpdate={onEdgeUpdate}
      onElementsRemove={onElementsRemove}
      nodesConnectable={false}
    >
      <Controls showFitView={true} />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Flow;