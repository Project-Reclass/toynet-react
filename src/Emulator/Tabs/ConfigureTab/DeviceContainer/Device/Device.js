import React from "react";
import "./Device.css";

const Device = ({ deviceName, deviceData }) => {
  let boxClass = "device-name-box ";
  if (deviceName === "Router") {
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
        Connections:<br></br>
        {deviceData.connections}
      </div>
    </div>
  );
};

export default Device;