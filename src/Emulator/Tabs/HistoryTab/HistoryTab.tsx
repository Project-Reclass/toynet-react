import React, { FC } from 'react';
import './HistoryTab.css';

interface Props {
  status: string;
}

const HistoryTab: FC<Props> = ({ status }) => {
  return (
    <h2 style={{ margin: '1rem' }} className={`console ${status}`}>Coming soon...</h2>
  );
};

export default HistoryTab;
