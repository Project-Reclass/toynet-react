import React from 'react';
import './Emulator.css';
import Instructions from './Instructions/Instructions';
import Tabs from './Tabs/Tabs';
import Visuals from './Visuals/Visuals';

const Emulator = ({ panelData }) => {
  return (
    <div className="emulator">
      <Instructions panelData={panelData} />
      <div>
        <Tabs />
        <Visuals />
      </div>
    </div>
  );
};

export default Emulator;
