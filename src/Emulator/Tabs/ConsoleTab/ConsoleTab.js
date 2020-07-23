import React from "react";
import "./ConsoleTab.css";

const ConsoleTab = ({ status }) => {
  return (
    <div className={`console ${status}`}>Hi, I am the console component</div>
  );
};

export default ConsoleTab;
