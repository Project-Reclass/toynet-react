import React, { FC } from 'react';
import folder from './folder.png';
import user from './user.png';
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

const Instructions: FC<Props> = ({ panelData }) => {
  return (
    <div className="instructions">
      <div className="icon-container">
        <button className='iconButtons'>
          <img className='folder' src={folder} />
        </button>
        <button className='iconButtons'>
          <img className='user' src={user} />
        </button>
        <div className="line">&nbsp;</div>
      </div>
      <div className="title-container">
        <h4 className="module-num">Module {panelData.submoduleNumber}</h4>
        <p className="module-name">{panelData.submoduleName}</p>
        <div className="line">&nbsp;</div>
      </div>
      <div className="objective-container">
        <h4 className="objective-title">Objective</h4>
        <p className="objective">{panelData.objective}</p>
        <div className="line">&nbsp;</div>
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
