import React, { useState, useRef } from 'react';
import './ConfigureTab.css';
import DeviceContainer from './DeviceContainer/DeviceContainer';

const MAX_DEVICES = 10;
const FIVE_SECONDS = 5000;

// Sample responses from currently non-existent API
// These represent the starting config for a lesson
const routerConfig = [
  {
    name: 'r1',
    connections: ['s1', 's2'],
  },
];
const switchConfig = [
  {
    name: 's1',
    connections: ['r1', 'h1', 'h2', 'h3'],
  },
  {
    name: 's2',
    connections: [],
  },
];
const hostConfig = [
  {
    name: 'h1',
    connections: ['s1'],
  },
  {
    name: 'h2',
    connections: ['s1'],
  },
  {
    name: 'h3',
    connections: ['s1'],
  },
  {
    name: 'h4',
    connections: [],
  },
];

/**
 * Determines the number of the newly added device
 * @param   {string} s - A device name (e.g. "s1", "h3", "r5")
 * @returns {Number}   - The next number in this device's sequence
 */
export const getNextNumber = (s) => Number(s.slice(1)) + 1;

/**
 * Determines the name of the newly added device
 * @param   {Object} device       - Object representing a device, its name, and its connections
 * @param   {string} deviceLetter - Letter portion of the device name (e.g. "r", "s", "h")
 * @returns {string}              - The newly added device's name
 */
export const getNextDeviceName = (device, deviceLetter) => {
  if (device.length < 1) {
    return `${deviceLetter}1`;
  } else {
    const lastDeviceName = device[device.length - 1].name;
    return `${deviceLetter}${getNextNumber(lastDeviceName)}`;
  }
};

const ConfigureTab = ({ status }) => {
  const [routers, setRouters] = useState(routerConfig);
  const [switches, setSwitches] = useState(switchConfig);
  const [hosts, setHosts] = useState(hostConfig);
  const [showError, setShowError] = useState(false);

  const routerScrollRef = useRef(null);
  const switchScrollRef = useRef(null);
  const hostScrollRef = useRef(null);

  const scrollDeviceContainer = (ref) => {
    // A slight delay seems to be necessary for the scroll to work properly
    // ref.current.scrollIntoView() on its own does not scroll down enough
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView();
      }, 0);
    }
  };

  const toggleErrorMessage = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, FIVE_SECONDS);
  };

  const addRouter = (deviceLetter) => {
    if (routers.length < MAX_DEVICES) {
      setRouters([
        ...routers,
        { name: getNextDeviceName(routers, deviceLetter), connections: [] },
      ]);

      scrollDeviceContainer(routerScrollRef);
    } else {
      toggleErrorMessage();
    }
  };

  const addSwitch = (deviceLetter) => {
    if (switches.length < MAX_DEVICES) {
      setSwitches([
        ...switches,
        { name: getNextDeviceName(switches, deviceLetter), connections: [] },
      ]);

      scrollDeviceContainer(switchScrollRef);
    } else {
      toggleErrorMessage();
    }
  };

  const addHost = (deviceLetter) => {
    if (hosts.length < MAX_DEVICES) {
      setHosts([
        ...hosts,
        { name: getNextDeviceName(hosts, deviceLetter), connections: [] },
      ]);

      scrollDeviceContainer(hostScrollRef);
    } else {
      toggleErrorMessage();
    }
  };

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
