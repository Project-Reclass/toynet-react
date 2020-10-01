import React, { FC } from 'react';
import { Heading, Text } from '@chakra-ui/core';
import { ReactComponent as Exit } from '../../assets/buttons/backIcon.svg';

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
    <div className='instructions-background'>
      <div className="instructions">
        <div className='instructions-exit'>
            <a href='/' className='svg link-text instructions__back-link-container'>
              <Exit />
              <Text>
                Back to site
              </Text>
            </a>
        </div>
        <div className="title-container">
          <Heading className="module-num" size='lg'>Module {panelData.submoduleNumber}</Heading>
          <Text className="module-name">{panelData.submoduleName}</Text>
        </div>
        <div className="objective-container">
          <Heading className="objective-title" size='lg'>Objective</Heading>
          <Text className="objective">{panelData.objective}</Text>
        </div>
        <div className='task-container'>
          <Heading className="tasks-title" size='lg'>Tasks</Heading>
          <ol>
            {panelData.tasks.map(task => (
              <li className='steps' key={`${task}`}>{task}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
