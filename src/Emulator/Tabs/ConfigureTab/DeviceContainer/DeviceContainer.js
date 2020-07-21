import React from "react";
import "./DeviceContainer.css";
import Device from "./Device/Device";

const DeviceContainer = ({ deviceName, devices }) => {
  return (
    <div className="device-container">
      <div className="device-container-name">{deviceName}</div>
      <div className="device-container-content">
        {devices.map((device) => (
          <Device deviceName={deviceName} deviceData={device} />
        ))}
      </div>
    </div>
  );
};

export default DeviceContainer;
