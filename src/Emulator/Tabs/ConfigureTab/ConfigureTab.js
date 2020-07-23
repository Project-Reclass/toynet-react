import React, { useState } from "react";
import "./ConfigureTab.css";
import DeviceContainer from "./DeviceContainer/DeviceContainer";

// Sample responses from currently non-existent API
// These represent the starting config for a lesson
const routerConfig = [
  {
    name: "r1",
    connections: ["s1", "s2"],
  },
];
const switchConfig = [
  {
    name: "s1",
    connections: ["r1", "h1", "h2", "h3"],
  },
  {
    name: "s2",
    connections: [],
  },
];
const hostConfig = [
  {
    name: "h1",
    connections: ["s1"],
  },
  {
    name: "h2",
    connections: ["s1"],
  },
  {
    name: "h3",
    connections: ["s1"],
  },
  {
    name: "h4",
    connections: [],
  },
];

const ConfigureTab = ({ status }) => {
  const [routers, setRouters] = useState(routerConfig);
  const [switches, setSwitches] = useState(switchConfig);
  const [hosts, setHosts] = useState(hostConfig);

  const getNextNumber = (s) => parseInt(s.slice(1, s.length)) + 1;

  const addRouter = () => {
    const lastRouterName = routers[routers.length - 1].name;
    const newRouterName = `r${getNextNumber(lastRouterName)}`;
    setRouters([...routers, { name: newRouterName, connections: [] }]);
  };

  const addSwitch = () => {
    const lastSwitchName = switches[switches.length - 1].name;
    const newSwitchName = `s${getNextNumber(lastSwitchName)}`;
    setSwitches([...switches, { name: newSwitchName, connections: [] }]);
  };

  const addHost = () => {
    const lastHostName = hosts[hosts.length - 1].name;
    const newHostName = `h${getNextNumber(lastHostName)}`;
    setHosts([...hosts, { name: newHostName, connections: [] }]);
  };

  return (
    <div className={`configure ${status}`}>
      <div className="network-devices">
        <DeviceContainer
          deviceName="Router"
          devices={routers}
          add={addRouter}
        />
        <DeviceContainer
          deviceName="Switch"
          devices={switches}
          add={addSwitch}
        />
        <DeviceContainer deviceName="Host" devices={hosts} add={addHost} />
      </div>
      <div className="btn-run-container">
        <button type="button" className="btn-run">
          Run
        </button>
      </div>
    </div>
  );
};

export default ConfigureTab;
