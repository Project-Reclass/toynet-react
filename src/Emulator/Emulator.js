import React from 'react';
import Instructions from './Instructions/Instructions';
import Tabs from './Tabs/Tabs';
import Visuals from './Visuals/Visuals';

const Emulator = ({ panelData }) => {
  return (
    <div style={{display: 'flex'}}>
      <Instructions panelData={panelData} />
      <div>
        <Tabs />
        <Visuals />
      </div>
    </div>
  );
};

export default Emulator;

