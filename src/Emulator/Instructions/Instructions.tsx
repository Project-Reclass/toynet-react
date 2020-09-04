import React, { FC } from 'react';
import './Instructions.css';

export interface PanelData {
  submoduleNumber: number;
  submoduleName: string;
  objective: string;
  tasks: string[];
}

interface Props {
  panelData: PanelData;
}

// TODO: replace temp folder & user icons with transparent icons
const Instructions: FC<Props> = ({ panelData }) => {
  return (
    <div className='instructions-background'>
      <div className="instructions">
        <div className='instructions-exit'>
          [x] Back to course
        </div>
        <div className="title-container">
          <h4 className="module-num">Module {panelData.submoduleNumber}</h4>
          <p className="module-name">{panelData.submoduleName}</p>
        </div>
        <div className="objective-container">
          <h4 className="objective-title">Objective</h4>
          <p className="objective">{panelData.objective}</p>
        </div>
        <div className='task-container'>
          <h4 className="tasks-title">Tasks</h4>
          <ol>
            {panelData.tasks.map((task, idx) => (
              <li className='steps' key={`${task}${idx}`}>{task}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
