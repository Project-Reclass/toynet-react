import { DeviceInterface } from 'src/common/types';

type LinkValidator = (from: DeviceInterface, to: DeviceInterface) => boolean;

const linkValidators = new Map<string, LinkValidator>();
linkValidators.set('s', validateSwitchLink);
linkValidators.set('h', validateHostLink);
linkValidators.set('r', validateRouterLink);

function validateSwitchLink(from: DeviceInterface, to: DeviceInterface) {
  if (to.name.startsWith('s') || to.name.startsWith('r') || (to.name.startsWith('h') && to.connections.length === 0))
    if (to.connections.indexOf(from.name) === -1)
      return true;

  return false;
};

function validateRouterLink(from: DeviceInterface, to: DeviceInterface) {
  if (to.name.startsWith('r') || to.name.startsWith('s'))
    if (to.connections.indexOf(from.name) === -1)
      return true;
  return false;
};

function validateHostLink(from: DeviceInterface, to: DeviceInterface) {
  if (to.name.startsWith('s') && from.connections.length === 0)
    if (to.connections.indexOf(from.name) === -1)
      return true;
  return false;
};

export function isValidLink(from: DeviceInterface, to: DeviceInterface) {
  if (from.name.length < 1 || to.name.length < 1 || from.name === to.name)
    return false;
  const validator = linkValidators.get(from.name[0]);
  return validator ? validator(from, to) : false;
};

export default isValidLink;