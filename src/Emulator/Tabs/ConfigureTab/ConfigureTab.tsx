import React, { useRef, FC, useCallback, useMemo, useState } from 'react';

import { useTopology, TopologyActions } from 'src/common/hooks/useTopology';

import DeviceContainer from './DeviceContainer';
import './ConfigureTab.css';

const MAX_DEVICES = 10;
const FIVE_SECONDS = 5000;

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
      if (ref.current)
        ref.current.scrollIntoView();
    }, 0);
  }
};

const ConfigureTab: FC<{status: string}> = ({ status }) => {
  const { switches, hosts, routers, dispatch } = useTopology(1);
  const [showError, setShowError] = useState(false);

  const routerScrollRef = useRef(null);
  const switchScrollRef = useRef(null);
  const hostScrollRef = useRef(null);

  const toggleErrorMessage = useCallback(() => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, FIVE_SECONDS);
  }, []);

  const addDevice = useCallback((type: 'router' | 'host' | 'switch') => {
    const device = type === 'router' ? routers :
      type === 'host' ? hosts : switches;
    const actionType = type === 'router' ? TopologyActions.ADD_ROUTER :
      type === 'host' ? TopologyActions.ADD_HOST : TopologyActions.ADD_SWITCH;
    const deviceRef = type === 'router' ? routerScrollRef :
      type === 'switch' ? switchScrollRef : hostScrollRef;

    return (deviceLetter: string) => {
      if (device.length >= MAX_DEVICES) {
        toggleErrorMessage();
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
  }, [dispatch, hosts, routers, switches, toggleErrorMessage]);

  const addRouter = useMemo(() => addDevice('router'), [addDevice]);
  const addSwitch= useMemo(() => addDevice('switch'), [addDevice]);
  const addHost = useMemo(() => addDevice('host'), [addDevice]);

  return (
    <div className={`configure ${status}`}>
      <div className="network-devices">
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
      </div>
      <div className="btn-run-container">
        <div
          className="max-nodes"
          style={{ display: showError ? 'initial' : 'none' }}
        >
          Each device type can have maximum 10 nodes
        </div>
        <button type="button" className="btn-run">
          Run
        </button>
      </div>
    </div>
  );
};

export default ConfigureTab;
