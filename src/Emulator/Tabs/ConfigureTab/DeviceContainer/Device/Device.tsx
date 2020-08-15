import React, { FC, useMemo } from 'react';
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
  deviceData: DeviceInterface
}

const Device: FC<Props> = ({ deviceName, deviceData }) => {
  const connections = useMemo(() => {
    return deviceData.connections.concat(deviceData.parent?.name || []);
  }, [deviceData.connections, deviceData.parent]);

  const deviceClassName = useMemo(() => {
    if (connections.length === 0)
      return DeviceColor.EMPTY;
    return deviceColorClasses.get(deviceName);
  }, [connections.length, deviceName]);

  return (
    <div className="device-box">
      <div className={`device-name-box ${deviceClassName}`}>
        <div>{deviceData.name}</div>
      </div>
      <div className="vertical-bar"></div>
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
