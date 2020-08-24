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
      <div>
        <Tabs />
        {/* <Visuals /> */}
      </div>
    </div>
  );
};

export default Emulator;
