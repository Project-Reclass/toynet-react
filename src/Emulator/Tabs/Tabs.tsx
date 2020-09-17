import React, { useState } from 'react';

import ConfigureTab from './ConfigureTab';
import ConsoleTab from './ConsoleTab/ConsoleTab';
import HistoryTab from './HistoryTab/HistoryTab';

import './Tabs.css';

const CONSTANTS = {
  CONFIGURE: 'configure',
  CONSOLE: 'console',
  HISTORY: 'history',
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('configure');

  const changeTabHandler = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs">
      <div className="outer-tabs-container">
        <div className="tabs-container">
          <div
            className={activeTab === CONSTANTS.CONFIGURE ? 'tab active' : 'tab'}
            onClick={() => changeTabHandler(CONSTANTS.CONFIGURE)}
          >
            Configure
          </div>
          <div
            className={activeTab === CONSTANTS.CONSOLE ? 'tab active' : 'tab'}
            onClick={() => changeTabHandler(CONSTANTS.CONSOLE)}
          >
            Console
          </div>
          <div
            className={activeTab === CONSTANTS.HISTORY ? 'tab active' : 'tab'}
            onClick={() => changeTabHandler(CONSTANTS.HISTORY)}
          >
            History
          </div>
        </div>
      </div>
      <ConfigureTab status={(activeTab === CONSTANTS.CONFIGURE) ? 'show' : 'hide'} />
      <ConsoleTab status={(activeTab === CONSTANTS.CONSOLE) ? 'show' : 'hide'} />
      <HistoryTab status={(activeTab === CONSTANTS.HISTORY) ? 'show' : 'hide'} />
    </div>
  );
};

export default Tabs;
