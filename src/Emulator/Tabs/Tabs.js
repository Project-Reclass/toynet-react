import React, { useState } from 'react';
import './Tabs.css';
import Configure from './Configure/Configure';
import Console from './Console/Console';
import History from './History/History';

const Tabs = () => {
  const [active, setActive] = useState("configure");

  const changeTabHandler = tabName => {
    setActive(tabName);
  }

  let activeComponent = <Configure />; 
  if (active === "console") {
    activeComponent = <Console />;
  } else if (active === "history") {
    activeComponent = <History />;
  }

  return (
    <div className="tabs">
      <div className="tabs-container" style={{display: "flex"}}>
        <div 
          className={(active === "configure" ? "tab active" : "tab")}
          onClick={() => changeTabHandler("configure")}
        >
            Configure
        </div>
        <div 
          className={(active === "console" ? "tab active" : "tab")}
          onClick={() => changeTabHandler("console")}
        >
          Console
        </div>
        <div 
          className={(active === "history" ? "tab active" : "tab")}
          onClick={() => changeTabHandler("history")}
        >
          History
        </div>
      </div>
      {activeComponent}
    </div>
  );
};

export default Tabs;