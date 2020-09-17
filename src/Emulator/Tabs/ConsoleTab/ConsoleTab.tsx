import React, { FC } from 'react';
import './ConsoleTab.css';

interface Props {
  status: string;
}

const ConsoleTab: FC<Props> = ({ status }) => {
  return (
    <h2 style={{ padding: '20px' }} className={`console ${status}`}>Coming soon...</h2>
  );
};

export default ConsoleTab;
