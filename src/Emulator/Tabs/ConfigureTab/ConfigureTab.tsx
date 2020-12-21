import React, { useRef, useCallback, useMemo } from 'react';

import { DeviceType } from 'src/common/types';
import { TopologyActions } from 'src/Emulator/useTopology';
import { useEmulator, useDialogue } from 'src/Emulator/EmulatorProvider';

import DeviceContainer from './DeviceContainer';
import { Configure, NetworkDevices } from './styled';

const MAX_DEVICES = 10;

/**
 * Determines the number of the newly added device
 */
export const getNextNumber = (s: string) => Number(s.slice(1)) + 1;

/**
 * Determines the name of the newly added device
 */
export const getNextDeviceName = (device: Array<{name: string}>, deviceLetter: string) => {
  if (device.length < 1) {
    return `${deviceLetter}1`;
  } else {
    const lastDeviceName = device[device.length - 1].name;
    return `${deviceLetter}${getNextNumber(lastDeviceName)}`;
  }
};

const scrollDeviceContainer = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  // A slight delay seems to be necessary for the scroll to work properly
  // ref.current.scrollIntoView() on its own does not scroll down enough
  if (ref.current) {
    setTimeout(() => {
      if (ref.current){
        const element = ref.current;
        element.scrollTop = element.scrollHeight;
      }
    }, 0);
  }
};

const ConfigureTab = () => {
  const { switches, hosts, routers, dispatch } = useEmulator();
  const { appendDialogue } = useDialogue();

  const routerScrollRef = useRef(null);
  const switchScrollRef = useRef(null);
  const hostScrollRef = useRef(null);

  const addDevice = useCallback((type: DeviceType) => {
    const device = type === 'router' ? routers :
      type === 'host' ? hosts : switches;
    const actionType = type === 'router' ? TopologyActions.ADD_ROUTER :
      type === 'host' ? TopologyActions.ADD_HOST : TopologyActions.ADD_SWITCH;
    const deviceRef = type === 'router' ? routerScrollRef :
      type === 'switch' ? switchScrollRef : hostScrollRef;

    return (deviceLetter: string) => {
      if (device.length >= MAX_DEVICES) {
        appendDialogue(`Max number of devices is ${MAX_DEVICES}!`);
        return;
      }

      scrollDeviceContainer(deviceRef);
      dispatch({
        type: actionType,
        payload: {
          type,
          name: getNextDeviceName(device, deviceLetter),
          connections: [],
        },
      });
    };
  }, [dispatch, hosts, routers, appendDialogue, switches]);

  const addRouter = useMemo(() => addDevice('router'), [addDevice]);
  const addSwitch= useMemo(() => addDevice('switch'), [addDevice]);
  const addHost = useMemo(() => addDevice('host'), [addDevice]);

  return (
    <Configure>
      <NetworkDevices>
        <DeviceContainer
          deviceName="Router"
          devices={routers}
          addDevice={addRouter}
          ref={routerScrollRef}
        />
        <DeviceContainer
          deviceName="Switch"
          devices={switches}
          addDevice={addSwitch}
          ref={switchScrollRef}
        />
        <DeviceContainer
          deviceName="Host"
          devices={hosts}
          addDevice={addHost}
          ref={hostScrollRef}
        />
      </NetworkDevices>
    </Configure>
  );
};

export default ConfigureTab;
