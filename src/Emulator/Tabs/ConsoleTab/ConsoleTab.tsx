import React, { FC } from 'react';
import './ConsoleTab.css';

interface Props {
  status: string;
}

const ConsoleTab: FC<Props> = ({ status }) => {
  return (
    <div className={`console ${status}`}>Hi, I am the console component</div>
  );
};

export default ConsoleTab;
