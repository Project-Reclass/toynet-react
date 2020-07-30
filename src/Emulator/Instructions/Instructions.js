import React from 'react';
import './Instructions.css';

const Instructions = ({ panelData }) => {
  return (
    <div className="instructions">
      <div className="icon-container">icon1 icon2 ...</div>
      <div className="title-container">
        <h4 className="module-num">Module {panelData.submodule_number}</h4>
        <p className="module-name">{panelData.submodule_name}</p>
      </div>
      <div className="objective-container">
        <h4 className="objective-title">Objective</h4>
        <p className="objective">{panelData.objective}</p>
      </div>
      <div>
        <h4 className="tasks-title">Tasks</h4>
        <ol>
          {panelData.tasks.map((task, idx) => (
            <li key={`${task}${idx}`}>{task}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Instructions;
