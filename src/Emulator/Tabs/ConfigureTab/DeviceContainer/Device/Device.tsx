import React, { FC, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { mergeRefs } from 'src/common/utils';
import { DeviceInterface } from 'src/common/types';

import './Device.css';
import { isValidLink } from './linkValidators';
import { useEmulator } from 'src/Emulator/EmulatorProvider';
import { TopologyActions } from 'src/Emulator/useTopology';

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
}

const DeleteDevice = ({ connection, idx }: {connection: string, idx: number}) => {
  const [, drag] = useDrag({ item: {type: 'device', deviceData: { name: connection, connections: [], isLink: true }} });
  return (
    <div
      id={`${connection}${idx}`}
      className={`connection ${deviceColorClasses.get(connection[0])}`}
      key={`${connection}`}
      style={{ cursor: 'pointer' }}
      ref={drag}
    >
      {connection}
    </div>
  );
};

const TrashCan = ({ name }: {name: string}) => {
  const { dispatch } = useEmulator();
  const [, drop] = useDrop({
    accept: 'device',
    canDrop: (item: any) => {
      const { deviceData } = item;
      return deviceData.isLink || deviceData.connections.length === 0;
    },
    drop: (item: any, monitor) => {
      if (monitor.canDrop()) {
        dispatch({ type: TopologyActions.DELETE_CONNECTION, payload: {from: name, to: item.deviceData.name} });
        console.log('can drop!', { item, name });
        return;
      }
      console.log('cannot drop!', { item });
    },
  });

  return (
    <div className={'trash-icon-container'} ref={drop}>
    <div className="vertical-bar" />
    <div className={'trash-icon'}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </div>
  </div>
  );
};

const Device: FC<Props> = ({ deviceName, deviceData, onDrop }) => {
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
            <DeleteDevice connection={connection} idx={idx} />
          ))}
        </div>
      </div>
      <TrashCan name={deviceData.name} />
    </div>
  );
};

export default Device;
