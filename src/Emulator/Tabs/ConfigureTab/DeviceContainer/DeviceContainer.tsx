import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as PlusIcon } from 'src/assets/add.svg';

import { DeviceInterface } from 'src/common/types';
import { TopologyActions } from 'src/Emulator/useTopology';
import { useEmulator } from 'src/Emulator/EmulatorProvider';

import Device from './Device';

const DeviceContainerDiv = styled.div`
  background-color: #212529;
  border-radius: 10px;
  margin: 0 0.5vw;
  overflow: auto;
  display: flex;
  z-index: 1;
  max-width: calc((100vw - 6.5vw - 15vw) / 3);

  ::-webkit-scrollbar {
    width: 5px;
    color: #595D62;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    border-radius: 10px;
    color: #595D62;
  }
`;

const DeviceContainerName = styled.div`
  height: 4vh;
  line-height: 4vh;
  font-size: large;
  text-align: center;
  color: white;
  z-index: 9900;
  position: relative;
`;

const DeviceContainerContent = styled.div`
  color: white;
  height: 28vh;
  width: 100%;
  max-width: inherit;
  padding: 0.61375rem 0.4rem;
  padding-left: calc(0.61375rem + 5px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const HoverablePlusIcon = styled(PlusIcon)`
  height: auto;
  width: 18px;
  float: left;
  margin-top: 0.7vh;
  margin-left: 0.7vh;
  cursor: pointer;
  user-select: none;
  transition: 0.1s background-color ease-in-out;
  border-radius: 5px;

  :hover {
    background-color: #3c841b;
  }
`;

interface Props {
  deviceName: string;
  devices: DeviceInterface[];
  addDevice: (prefix: string) => any;
}

const DeviceContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ deviceName, devices, addDevice }, ref) => {
    const { dispatch } = useEmulator();

    return (
      <div>
        <DeviceContainerName>
          <HoverablePlusIcon
            data-testid={'plus-icon'}
            onClick={() => addDevice(deviceName[0].toLowerCase())}
          />
          {deviceName}
        </DeviceContainerName>
        <DeviceContainerDiv>
          <DeviceContainerContent>
            {devices.map(device => (
              <Device
                key={`${device.name}`}
                deviceName={deviceName}
                deviceData={device}
                onDrop={(from, to) => dispatch({ type: TopologyActions.ADD_CONNECTION, payload: { to, from } })}
                onRemove={(from, to) => dispatch({ type: TopologyActions.DELETE_CONNECTION, payload: { to, from } })}
              />
            ))}
            <div ref={ref} />
          </DeviceContainerContent>
        </DeviceContainerDiv>
      </div>
    );
  },
);

export default DeviceContainer;
