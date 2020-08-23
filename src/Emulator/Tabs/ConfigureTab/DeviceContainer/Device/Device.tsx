import React, { FC, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DeviceInterface } from 'src/common/types';

import './Device.css';

enum DeviceColor {
  EMPTY = 'empty-color',
  ROUTER = 'router-color',
  SWITCH = 'switch-color',
  HOST = 'host-color',
}

const deviceColorClasses = new Map<string, DeviceColor>();
deviceColorClasses.set('Router', DeviceColor.ROUTER);
deviceColorClasses.set('r', DeviceColor.ROUTER);
deviceColorClasses.set('Switch', DeviceColor.SWITCH);
deviceColorClasses.set('s', DeviceColor.SWITCH);
deviceColorClasses.set('Host', DeviceColor.HOST);
deviceColorClasses.set('h', DeviceColor.HOST);

interface Props {
  deviceName: string;
  deviceData: DeviceInterface;
  onDrop: (from: string, to: string) => any;
  onDropError?: () => any;
}

type LinkValidator = (from: string, to: string, connections: string[]) => boolean;

const validateSwitchLink = (from: string, to: string, connections: string[]) => {
  if (from.startsWith('s') && (to.startsWith('s') || to.startsWith('r') || to.startsWith('h')))
    if (connections.indexOf(from) < 0)
      return true;
  return false;
};

const validateRouterLink = (from: string, to: string, connections: string[]) => {
  if (from.startsWith('r') && (to.startsWith('r') || to.startsWith('s')))
    if (connections.indexOf(from) < 0)
      return true;
  return false;
};

const validateHostLink = (from: string, to: string, connections: string[]) => {
  if (from.startsWith('h') && to.startsWith('s') && connections.length < 1)
    return true;
  return false;
};

const linkValidators = new Map<string, LinkValidator>();
linkValidators.set('s', validateSwitchLink);
linkValidators.set('h', validateHostLink);
linkValidators.set('r', validateRouterLink);

const isValidLink = (from: string, to: string, connections: string[]) => {
  if (from.length < 1 || to.length < 1 || from === to)
    return false;
  const validator = linkValidators.get(from[0]);
  return validator ? validator(from, to, connections) : false;
};

const Device: FC<Props> = ({ deviceName, deviceData, onDrop, onDropError }) => {
  const connections = useMemo(() => {
    return deviceData.connections.concat(deviceData.parent?.name || []);
  }, [deviceData.connections, deviceData.parent]);

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'device', deviceData },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: 'device',
    drop: (item: any, monitor) => {
      if (monitor.canDrop()) {
        onDrop(item.deviceData.name, deviceData.name);
        return;
      }
      onDropError && onDropError();
    },
    canDrop: (item: any): boolean => {
      const { deviceData: { name } } = item;
      return isValidLink(name, deviceData.name, connections);
    },
    collect: (monitor) => {
      return {
        isHover: monitor.isOver() && monitor.canDrop(),
      };
    },
  });

  const deviceClassName = useMemo(() => {
    if (connections.length === 0)
      return DeviceColor.EMPTY;
    return deviceColorClasses.get(deviceName);
  }, [connections.length, deviceName]);

  return (
    <div className="device-box" ref={drop}>
      <div className={`device-name-box ${deviceClassName}${isDragging ? ' is-dragging' : ''}${isHover ? ' is-hover' : ''}`} ref={drag}>
        <div>{deviceData.name}</div>
      </div>
      <div className="vertical-bar" />
      <div className="connections-container">
        <div>Connections:</div>
        <div className="connections-boxes">
          {connections.map((connection, idx) => (
              <div
                id={`${connection}${idx}`}
                className={`connection ${deviceColorClasses.get(connection[0])}`}
                key={`${connection}`}
              >
                {connection}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Device;
