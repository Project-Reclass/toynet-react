import React, { FC } from 'react';

import './Emulator.css';
import Tabs from './Tabs/Tabs';
import Visuals from './Visuals/Visuals';
import Instructions, { PanelData } from './Instructions/Instructions';

interface Props {
  panelData: PanelData;
}

const Emulator: FC<Props> = ({ panelData }) => {
  return (
    <div className="emulator">
      <Instructions panelData={panelData} />
      <div style={{ marginLeft: '1.5vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', marginRight: '3.5rem', width: '100%', maxHeight: '96vh', overflow: 'hidden' }}>
        <div>
          <Tabs />
        </div>
        <Visuals />
      </div>
    </div>
  );
};

export default Emulator;
