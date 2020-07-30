import React from 'react';
import './Device.css';

const CONSTANTS = {
  EMPTY_COLOR: 'empty-color',
  ROUTER_COLOR: 'router-color',
  SWITCH_COLOR: 'switch-color',
  HOST_COLOR: 'host-color',
};

const Device = ({ deviceName, deviceData }) => {
  let boxClass = 'device-name-box ';
  if (deviceData.connections.length === 0) {
    boxClass += CONSTANTS.EMPTY_COLOR;
  } else if (deviceName === 'Router') {
    boxClass += CONSTANTS.ROUTER_COLOR;
  } else if (deviceName === 'Switch') {
    boxClass += CONSTANTS.SWITCH_COLOR;
  } else {
    boxClass += CONSTANTS.HOST_COLOR;
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
          {deviceData.connections.map((connection, idx) => {
            let colorClass = 'connection ';
            if (connection[0] === 'r') {
              colorClass += CONSTANTS.ROUTER_COLOR;
            } else if (connection[0] === 's') {
              colorClass += CONSTANTS.SWITCH_COLOR;
            } else {
              colorClass += CONSTANTS.HOST_COLOR;
            }
            return (
              <div id={`${connection}${idx}`} className={colorClass}>
                {connection}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Device;
