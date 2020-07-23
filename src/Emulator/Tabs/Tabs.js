import React, { useState } from "react";
import "./Tabs.css";
import ConfigureTab from "./ConfigureTab/ConfigureTab";
import ConsoleTab from "./ConsoleTab/ConsoleTab";
import HistoryTab from "./HistoryTab/HistoryTab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("configure");

  const changeTabHandler = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs">
      <div className="tabs-container">
        <div
          className={activeTab === "configure" ? "tab active" : "tab"}
          onClick={() => changeTabHandler("configure")}
        >
          Configure
        </div>
        <div
          className={activeTab === "console" ? "tab active" : "tab"}
          onClick={() => changeTabHandler("console")}
        >
          Console
        </div>
        <div
          className={activeTab === "history" ? "tab active" : "tab"}
          onClick={() => changeTabHandler("history")}
        >
          History
        </div>
        <div className="tab empty"></div>
      </div>
      <ConfigureTab status={(activeTab === "configure") ? "show" : "hide"} />
      <ConsoleTab status={(activeTab === "console") ? "show" : "hide"} />
      <HistoryTab status={(activeTab === "history") ? "show" : "hide"} />
    </div>
  );
};

export default Tabs;
