import React from 'react';
import './Instructions.css';

const Instructions = ({ panelData }) => {
  return (
    <div className="instructions">
      <div className="title-container">
        <h4 className="module-num">Module {panelData.module_number}</h4>
        <p className="module-name">{panelData.module_name}</p>
      </div>
      <div className="objective-container">
        <h4 className="objective-title">Objective</h4>
        <p className="objective">{panelData.objective}</p>
      </div>
      <div>
        <ol>
          {panelData.tasks.map(task => <li>{task}</li>)}
        </ol>
      </div>
    </div>
  );
};

export default Instructions;