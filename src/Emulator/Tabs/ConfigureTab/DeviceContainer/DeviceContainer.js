import React from "react";
import "./DeviceContainer.css";
import { PlusCircle } from "react-bootstrap-icons";
import Device from "./Device/Device";

const DeviceContainer = ({ deviceName, devices, add }) => {
  return (
    <div className="device-container">
      <div className="device-container-name">
        <PlusCircle
          className="plus-circle"
          color="white"
          size={15}
          onClick={add}
        />
        {deviceName}
      </div>
      <div className="device-container-content">
        {devices.map((device) => (
          <Device deviceName={deviceName} deviceData={device} />
        ))}
      </div>
    </div>
  );
};

export default DeviceContainer;
