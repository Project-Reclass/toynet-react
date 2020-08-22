import React from 'react';

import PlusIcon from 'src/assets/add.svg';
import { DeviceInterface } from 'src/common/types';

import './DeviceContainer.css';
import Device from './Device';

interface Props {
  deviceName: string;
  devices: DeviceInterface[];
  addDevice: (prefix: string) => any;
}

const DeviceContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ deviceName, devices, addDevice }, ref) => {
    return (
      <div className="device-container">
        <div className="device-container-name">
          <img
            key={`${deviceName}-button`}
            src={PlusIcon}
            className="plus-circle"
            onClick={() => addDevice(deviceName[0].toLowerCase())}
            alt="plus icon"
          />
          {deviceName}
        </div>
        <div className="device-container-content">
          {devices.map((device, idx) => (
            <Device
              key={`${deviceName}${idx}`}
              deviceName={deviceName}
              deviceData={device}
            />
          ))}
          <div ref={ref}></div>
        </div>
      </div>
    );
  },
);

export default DeviceContainer;
