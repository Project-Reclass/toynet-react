import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon className='icons' size='lg' icon={faFolder} />
        </button>
        <button className='iconButtons'>
          <FontAwesomeIcon className='icons' icon={faUser} />
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
