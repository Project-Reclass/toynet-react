import converter from 'xml-js';

type XMLElementParser = (element: XMLElement) => void;
type DeviceTypes = 'router' | 'switch' | 'host';

export interface NetworkNode {
  type: DeviceTypes;
  parent: NetworkNode | null;
  name: string;
  children: NetworkNode[];

  ip: string;
}

interface XMLElement {
  type: string;
  name: string;
  attributes: {
    [key: string]: string;
  },
  text?: string;
  elements?: XMLElement[];
}

interface XML2Json {
  elements: XMLElement[];
}

export interface ParsedXML {
  hosts: NetworkNode[];
  routers: NetworkNode[];
  switches: NetworkNode[];
}

/**
 * Parses xml string to a NetworkNode tree returning hosts, routers, and switches
 * as well as creating appropriate parent child links between NetworkNodes.
 */
export function parseXMLTopology(xml: string): ParsedXML {
  const topology: XML2Json = converter.xml2js(xml, {compact: false}) as any;
  const devices: NetworkNode[] = [];

  const cmds = new Map<string, XMLElementParser>();
  cmds.set('router', handleAddDevice('router'));
  cmds.set('switch', handleAddDevice('switch'));
  cmds.set('host', handleAddDevice('host'));
  cmds.set('link', handleLink);

  parse(topology);

  /**
   * Recursively navigates XML as JSON and parses each node as
   * a router, switch, host or a link between nodes.
   */
  function parse({ elements }: XML2Json) {
    for (const el of elements) {
      const fn = cmds.get(el.name);
      if (fn) fn(el);

      if (el.elements) {
        parse(el as XML2Json);
      }
    }
  }

  /**
   * Creates links between child and parent of a NetworkNode,
   * setting the parent of the NetworkNode and adding the NetworkNode
   * as a child to the parent.
   */
  function handleLink({ elements }: XMLElement) {
    if (!!!elements || (elements && elements.length < 2))
      throw new Error('Invalid link!');

    const { name: parentName } = elements[0].attributes;
    const { name: childName } = elements[1].attributes;

    const parentDevice = devices.find(device => device.name === parentName);
    const childDevice = devices.find(device => device.name === childName);

    if (childDevice && parentDevice) {
      parentDevice.children.push(childDevice!);
      childDevice.parent = parentDevice || null;
    }
  }

  /**
   * Creates a default NetworkNode of the appropriate type and pushes
   * it into the `devices` array.
   */
  function handleAddDevice(type: DeviceTypes): XMLElementParser {
    return (element: XMLElement) => {
      devices.push({
        type,
        parent: null,
        children: [],
        ip: element.attributes['ip'],
        name: element.attributes['name'],
      });
    };
  }

  return {
    hosts: devices.filter(device => device.type === 'host'),
    switches: devices.filter(device => device.type === 'switch'),
    routers: devices.filter(device => device.type === 'router'),
  };
}
