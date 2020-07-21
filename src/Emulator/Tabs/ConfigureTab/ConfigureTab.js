import React from "react";
import "./ConfigureTab.css";
import DeviceContainer from "./DeviceContainer/DeviceContainer";
import { Button } from "react-bootstrap";

// Sample responses from currently non-existent API
const routers = [
  {
    name: "r1",
    connections: ["s1", "s2"],
  },
];
const switches = [
  {
    name: "s1",
    connections: ["r1", "h1", "h2", "h3"],
  },
  {
    name: "s2",
    connections: [],
  },
];
const hosts = [
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

const Configure = () => {
  return (
    <div className="configure">
      <div className="network-devices">
        <DeviceContainer deviceName="Router" devices={routers} />
        <DeviceContainer deviceName="Switch" devices={switches} />
        <DeviceContainer deviceName="Host" devices={hosts} />
      </div>
      <div className="btn-run-container">
        <Button className="btn-run">Run</Button>
      </div>
    </div>
  );
};

export default Configure;
