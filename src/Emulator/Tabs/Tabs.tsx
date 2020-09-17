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
    <div className="tabs__container">
      <div className="tabs__outer-tabs-container ">
        <div className="tabs__tabs-container ">
          <div
            className={activeTab === CONSTANTS.CONFIGURE ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
            onClick={() => changeTabHandler(CONSTANTS.CONFIGURE)}
          >
            Configure
          </div>
          <div
            className={activeTab === CONSTANTS.CONSOLE ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
            onClick={() => changeTabHandler(CONSTANTS.CONSOLE)}
          >
            Console
          </div>
          <div
            className={activeTab === CONSTANTS.HISTORY ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
            onClick={() => changeTabHandler(CONSTANTS.HISTORY)}
          >
            History
          </div>
        </div>
      </div>
      <div className='tabs__applications-container'>
        <ConfigureTab status={(activeTab === CONSTANTS.CONFIGURE) ? 'tabs__aplication-container--show' : 'tabs__aplication-container--hide'} />
        <ConsoleTab status={(activeTab === CONSTANTS.CONSOLE) ? 'tabs__aplication-container--show' : 'tabs__aplication-container--hide'} />
        <HistoryTab status={(activeTab === CONSTANTS.HISTORY) ? 'tabs__aplication-container--show' : 'tabs__aplication-container--hide'} />
      </div>
    </div>
  );
};

export default Tabs;
