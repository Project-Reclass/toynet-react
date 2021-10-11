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

import { DeviceInterface } from 'src/common/types';
import { isHost, isRouter, isSwitch } from 'src/common/utils';

export type Reason = string;
type LinkValidator = (from: DeviceInterface, to: DeviceInterface) => Reason | null;

const linkValidators = new Map<string, LinkValidator>();
linkValidators.set('s', validateSwitchLink);
linkValidators.set('h', validateHostLink);
linkValidators.set('r', validateRouterLink);

const isAlreadyConnected = (from: DeviceInterface, to: DeviceInterface) =>
  from.connections.findIndex(deviceName => deviceName === to.name) !== -1 ||
  to.connections.findIndex(deviceName => deviceName === from.name) !== -1;

const alreadyConnectedDescription = (from: DeviceInterface, to: DeviceInterface) =>
  `${from.name.toUpperCase()} is already connected to ${to.name.toUpperCase()}`;

function validateSwitchLink(from: DeviceInterface, to: DeviceInterface) {
  if (isAlreadyConnected(from, to))
    return alreadyConnectedDescription(from, to);

  if (isSwitch(to.name) || isRouter(to.name) || (isHost(to.name) && to.connections.length === 0))
      return null;

  return isHost(to.name) ? `Host ${to.name.toUpperCase()} can only be connected to one device` :
         `Unable to connect ${from.name.toUpperCase()} to ${to.name.toUpperCase()}`;
};

function validateRouterLink(from: DeviceInterface, to: DeviceInterface) {
  if (isAlreadyConnected(from, to))
    return alreadyConnectedDescription(from, to);

  if (isRouter(to.name) || isSwitch(to.name))
    return null;

  return to.connections.indexOf(from.name) !== -1 ? `${from.name.toUpperCase()} is already connected to ${to.name.toUpperCase()}` :
         isHost(to.name) ? 'Router is unable to connect to a host' :
         `Unable to connect ${from.name.toUpperCase()} to ${to.name.toUpperCase()}`;
};

function validateHostLink(from: DeviceInterface, to: DeviceInterface) {
  if (isAlreadyConnected(from, to))
    return alreadyConnectedDescription(from, to);

  if (isSwitch(to.name) && from.connections.length === 0)
    return null;

  return to.connections.indexOf(from.name) !== -1 ? `${from.name.toUpperCase()} is already connected to ${to.name.toUpperCase()}` :
         isHost(to.name) ? 'A host is unable to connect to another host' :
         isRouter(to.name) ? 'A host is unable to connect to a router' :
         `Unable to connect ${from.name.toUpperCase()} to ${to.name.toUpperCase()}`;
};

export function isInValidLink(from?: DeviceInterface, to?: DeviceInterface): Reason | null {
  if (!from || !to || from.name.length < 1 || to.name.length < 1 || from.name === to.name)
    return 'One of the device names is invalid' as Reason;

  const validator = linkValidators.get(from.name[0].toLowerCase());
  return validator ? validator(from, to) : null;
};

export default isInValidLink;