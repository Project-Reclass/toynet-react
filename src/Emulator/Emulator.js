import React from 'react';
import './Emulator.css';
import Instructions from './Instructions/Instructions';
import Tabs from './Tabs/Tabs';
import Visuals from './Visuals/Visuals';

const Emulator = ({ panelData }) => {
  return (
    <div className="emulator">
      <Instructions panelData={panelData} />
      <Tabs />
      <Visuals />
    </div>
  );
};

export default Emulator;