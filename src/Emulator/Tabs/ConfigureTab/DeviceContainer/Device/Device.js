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
      <div> --&gt; </div>
      {deviceData.connections}
    </div>
  );
};

export default Device;