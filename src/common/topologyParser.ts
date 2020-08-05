import { DeviceInterface, DeviceType } from './types';

export interface ParsedXML {
  hosts: DeviceInterface[];
  routers: DeviceInterface[];
  switches: DeviceInterface[];
}

const xmlVersionMatcher = /[\<\?xml version].+\?>/;

/**
 * Removes the XML Version from the xml string.
 * This is required because DOMParser cannot parse the version.
 */
function removeXMLVersion(xml: string): string {
    return xml.replace(xmlVersionMatcher, '');
}

/**
 * Parses the XML document and creates an array of default DeviceInterfaces from the document.
 */
function getDevicesFromXMLDocument(document: Document, tag: string, type: DeviceType): DeviceInterface[] {
  const devices: DeviceInterface[] = [];
  const elements = document.getElementsByTagName(tag);
  if (elements.length < 1)
    return devices;

  const { childNodes } = elements[0];
  for (const child of childNodes) {
    devices.push({
      name: (child as Element).attributes.getNamedItem('name')!.value,
      type: type,
      connections: [],
    });
  }

  return devices;
}

function createDeviceLink(allDevices: DeviceInterface[], parentName: string, childName: string) {
  const parent = allDevices.find(device => device.name === parentName);
  if (!parent)
    throw new Error(`Invalid link for ${parentName}->${childName}. Parent does not exists`);

  parent.connections.push(childName);
}

/**
 * Creates links in place in the DeviceInterfaces by adding the child name to the parent's
 * connections array. It also will throw an error if the parent cannot be found from
 * links provided in the XML document.
 */
function createDeviceLinksFromXMLDocument(devices: ParsedXML, document: Document) {
  const elements = document.getElementsByTagName('linkList');
  if (elements.length < 1) return;

  const allDevices = [...devices.hosts, ...devices.routers, ...devices.switches];
  const { childNodes } = elements[0];
  for (const link of childNodes) {
    const links = [];
    for (const child of link.childNodes) {
      links.push((child as Element).attributes.getNamedItem('name')!.value);
    }

    const [parentName, childName] = links;
    createDeviceLink(allDevices, parentName, childName);
  }
}

/**
 * Parses xml string to a NetworkNode tree returning hosts, routers, and switches
 * as well as creating appropriate parent child links between NetworkNodes.
 */
export function parseXMLTopology(xml: string): ParsedXML {
  const parser = new DOMParser();
  const sanitizedXML = removeXMLVersion(xml);
  const parsedXML = parser.parseFromString(sanitizedXML, 'application/xml');

  const devices = {
    switches: getDevicesFromXMLDocument(parsedXML, 'switchList', 'switch'),
    routers: getDevicesFromXMLDocument(parsedXML, 'routerList', 'router'),
    hosts: getDevicesFromXMLDocument(parsedXML, 'hostList', 'switch'),
  };

  createDeviceLinksFromXMLDocument(devices, parsedXML);
  return devices;
}
