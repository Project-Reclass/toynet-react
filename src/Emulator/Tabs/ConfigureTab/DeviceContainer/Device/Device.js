import React from "react";
import "./Device.css";

const Device = ({ deviceName, deviceData }) => {
  let boxClass = "device-name-box ";
  if (deviceData.connections.length === 0) {
    boxClass += "empty-color";
  } else if (deviceName === "Router") {
    boxClass += "router-color";
  } else if (deviceName === "Switch") {
    boxClass += "switch-color";
  } else {
    boxClass += "host-color";
  }

  return (
    <div className="device-box">
      <div className={boxClass}>
        <div>{deviceData.name}</div>
      </div>
      <div className="vertical-bar"></div>
      <div className="connections-container">
        <div>Connections:</div>
        <div className="connections-boxes">
          {deviceData.connections.map((connection) => {
            let colorClass = "connection ";
            if (connection[0] === "r") {
              colorClass += "router-color";
            } else if (connection[0] === "s") {
              colorClass += "switch-color";
            } else {
              colorClass += "host-color";
            }
            return <div className={colorClass}>{connection}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Device;
