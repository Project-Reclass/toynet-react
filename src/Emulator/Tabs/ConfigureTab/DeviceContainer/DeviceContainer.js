import React from 'react';
import './DeviceContainer.css';
import PlusIcon from '../../../../assets/add.svg';
import Device from './Device/Device';

const DeviceContainer = React.forwardRef(
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
