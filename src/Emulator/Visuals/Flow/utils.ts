import dagre from 'dagre';
import { Elements, isNode, Node, Position } from 'react-flow-renderer';
import { DeviceInterface } from 'src/common/types';

import { deviceColorClasses } from 'src/Emulator/Device/deviceColors';

type Direction = 'LR' | 'TB';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const BASE = 1000;
const LINE_WIDTH = 3;
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;


/**
 * Takes in a source elements array and a target elements array and matches the x and y from
 * the target elements to the source elements. This is useful for matching positions from an
 * old elements array to the new elements array.
 *
 * **Note**: if there are elements in the `targetElements` array that are not present in the
 * `sourceElements` array then they will not be returned. Elements that are in `sourceElements`
 * but not in `targetElements` will keep their x an y values.
 */
export const mergeElementLayouts = (sourceElements: Elements, targetElements: Elements) => {
  const targets: Map<string, Node | null> = new Map(targetElements.map(el =>
      ([el.id, isNode(el) ? el : null])));

  return sourceElements.map(el => {
    const nodeWithPosition = targets.get(el.id)?.position;
    if (isNode(el) && nodeWithPosition) {

      el.position = {
        x: nodeWithPosition.x + NODE_WIDTH / BASE,
        y: nodeWithPosition.y + NODE_HEIGHT,
      };
    }

    return el;
  });
};

/**
 * Takes a list of flow elements and updates the x and y of the `FlowElements`
 * to visually represent each node as a directed graph.
 *
 * `direction` is the orientation of the graph. `LR` is horizontal and `TB`
 * is vertical.
 *
 * The `isTesting` parameter is used for when testing with snapshots. This is
 * because `Math.random` will cause the snapshot to be different on each
 * testing cycle.
 */
export const getLayoutedElements = (elements: Elements,
    direction: Direction = 'LR', testing = false) => {
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
        x: nodeWithPosition.x + NODE_WIDTH + (testing ? 0 : Math.random()) / BASE,
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
          backgroundColor: deviceColorClasses.get(type),
        },
      });
      connections.forEach(conn => {
        if (seen.has(conn)) { // parent has been created so create the link.
          elements.push({
            id: `e${conn}-${name}`,
            source: conn,
            target: name,
            animated: true,
            type: 'custom',
            style: {
              strokeWidth: LINE_WIDTH,
            },
          });
        }
      });
    }
    return elements;
  };