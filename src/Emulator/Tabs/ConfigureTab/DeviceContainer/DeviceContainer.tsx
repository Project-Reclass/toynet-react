import React from 'react';

import { ReactComponent as PlusIcon } from 'src/assets/add.svg';
import { DeviceInterface } from 'src/common/types';
import { TopologyActions } from 'src/Emulator/useTopology';
import { useEmulator } from 'src/Emulator/EmulatorProvider';

import './DeviceContainer.css';
import Device from './Device';

interface Props {
  deviceName: string;
  devices: DeviceInterface[];
  addDevice: (prefix: string) => any;
}

const DeviceContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ deviceName, devices, addDevice }, ref) => {
    const { dispatch } = useEmulator();

    return (
      <div className="device-container">
        <div className="device-container-name">
          <PlusIcon
            data-testid={'plus-icon'}
            key={`${deviceName}-button`}
            className="plus-circle"
            onClick={() => addDevice(deviceName[0].toLowerCase())}
          />
          {deviceName}
        </div>
        <div className="device-container-content">
          {devices.map((device, idx) => (
            <Device
              key={`${deviceName}${idx}`}
              deviceName={deviceName}
              deviceData={device}
              onDrop={(from, to) => dispatch({ type: TopologyActions.ADD_CONNECTION, payload: { to, from } })}
            />
          ))}
          <div ref={ref}></div>
        </div>
      </div>
    );
  },
);

export default DeviceContainer;
