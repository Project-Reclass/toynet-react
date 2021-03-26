import dagre from 'dagre';
import { Elements, isNode, Position } from 'react-flow-renderer';
import { DeviceInterface } from 'src/common/types';

import { deviceColorClasses } from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer/Device/shared';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const BASE = 1000;
const LINE_WIDTH = 3;
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;

/**
 * Takes a list of flow elements and updates the x and y of the `FlowElements`
 * to visually represent each node as a directed graph.
 */
export const getLayoutedElements = (elements: Elements, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
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
        x: nodeWithPosition.x + NODE_WIDTH + Math.random() / BASE,
        y: nodeWithPosition.y + NODE_HEIGHT,
      };
    }

    return el;
  });
};

/**
 * Creates a list of flow elements from devices. The default
 * x and y of these elements is set to zero.
 */
export const createElements = (devices: DeviceInterface[]) => {
    const position = { x: 0, y: 0 };
    const elements: Elements = [];
    const seen = new Set<string>();
    for (let device of devices) {
      const { name, connections, type } = device;
      seen.add(name);
      elements.push({
        id: name,
        position,
        data: { label: name.toUpperCase() },
        style: {
          color: 'white',
          backgroundColor: deviceColorClasses.get(type.toString().charAt(0)),
        },
      });
      connections.forEach(conn => {
        if (seen.has(conn)) { // parent has been created so create the link.
          elements.push({
            id: `e${conn}-${name}`,
            source: conn,
            target: name,
            animated: true,
            style: {
              strokeWidth: LINE_WIDTH,
            },
          });
        }
      });
    }
    return elements;
  };