import React, { FC, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { mergeRefs } from 'src/common/utils';
import { DeviceInterface } from 'src/common/types';

import './Device.css';

import Link from './Link';
import DeleteLink from './DeleteLink';
import { isValidLink } from './linkValidators';
import { LinkFunc, DeviceColor, deviceColorClasses } from './shared';

interface Props {
  deviceName: string;
  deviceData: DeviceInterface;
  onDrop: LinkFunc;
  onRemove: LinkFunc;
}

const Device: FC<Props> = ({ deviceName, deviceData, onDrop, onRemove }) => {
  const connections = useMemo(() => {
    return deviceData.connections.concat(deviceData.parent?.name || []);
  }, [deviceData.connections, deviceData.parent]);

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'device', deviceData: { ...deviceData, connections, isLink: false } },
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
    },
    canDrop: (item: any): boolean => {
      const { deviceData: fromDeviceData } = item;
      return isValidLink(fromDeviceData, {...deviceData, connections});
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
    <div className="device-box">
      <div
        ref={mergeRefs([drag, drop])}
        className={`device-name-box ${deviceClassName}${isDragging ? ' is-dragging' : ''}${isHover ? ' is-hover' : ''}`}
      >
        <div>{deviceData.name}</div>
      </div>
      <div className="vertical-bar" />
      <div className="connections-container">
        <div>Connections:</div>
        <div className="connections-boxes">
          {connections.map((connection, idx) => (
            <Link key={connection} connection={connection} idx={idx} />
          ))}
        </div>
      </div>
      <DeleteLink name={deviceData.name} onRemove={onRemove} />
    </div>
  );
};

export default Device;
