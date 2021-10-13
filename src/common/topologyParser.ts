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
import { DefaultGateway, DeviceInterface, DeviceType } from './types';

export interface ParsedXML {
  hosts: DeviceInterface[];
  routers: DeviceInterface[];
  switches: DeviceInterface[];
}

const xmlVersionMatcher = /[<?xml version].+\?>/;

/**
 * Removes the XML Version from the xml string.
 * This is required because DOMParser cannot parse the version.
 */
function removeXMLVersion(xml?: string): string {
  if (xml)
    return xml.replace(xmlVersionMatcher, '').replace(/<script/g, '');
  return '';
}

function createInterfaces(child: ChildNode, devicesWithInterfaces = ['router']): string[] {
  const interfaces: string[] = [];
  if (!devicesWithInterfaces.includes(child.nodeName))
    return interfaces;

  for (const intf of child.childNodes) {
    if (intf.textContent)
      interfaces.push(intf.textContent);
  }
  return interfaces;
}

function createDefaultGateway(
  child: ChildNode,
  devicesWithDefaultGateway = ['host'],
): DefaultGateway | undefined {
  if (!devicesWithDefaultGateway.includes(child.nodeName))
    return;

  const device = (child as Element).getElementsByTagName('name')[0]!.innerHTML;
  const intf = (child as Element).getElementsByTagName('intf')[0]!.innerHTML;
  return {
    device,
    interface: Number(intf),
  };
}

/**
 * Parses the XML document and creates an array of default
 * DeviceInterfaces from the document.
 */
function getDevicesFromXMLDocument(
  document: Document,
  tag: string,
  type: DeviceType,
): DeviceInterface[] {
  const devices: DeviceInterface[] = [];
  const elements = document.getElementsByTagName(tag);
  if (elements.length < 1)
    return devices;

  const { childNodes } = elements[0];
  for (const child of childNodes) {
    const possibleIp = (child as Element).attributes.getNamedItem('ip');
    const interfaces = createInterfaces(child);
    const defaultGateway = createDefaultGateway(child);

    devices.push({
      name: (child as Element).attributes.getNamedItem('name')!.value,
      ip: possibleIp ? possibleIp.value : undefined,
      type: type,
      connections: [],
      defaultGateway,
      interfaces,
    });
  }

  return devices;
}

function createDeviceLink(
  allDevices: DeviceInterface[],
  parentName: string,
  childName: string,
) {
  const parent = allDevices.find(device => device.name === parentName);
  const child = allDevices.find(device => device.name === childName);
  if (!parent || !child)
    throw new Error(
      `Invalid link for ${parentName}->${childName}.
      Parent or child does not exists`,
    );

  child.connections.push(parentName);
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
    hosts: getDevicesFromXMLDocument(parsedXML, 'hostList', 'host'),
  };

  createDeviceLinksFromXMLDocument(devices, parsedXML);
  return devices;
}
