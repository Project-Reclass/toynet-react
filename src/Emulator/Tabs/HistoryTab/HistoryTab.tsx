import React, { FC } from 'react';
import './HistoryTab.css';

interface Props {
  status: string;
}

const HistoryTab: FC<Props> = ({ status }) => {
  return (
    <h2 style={{ padding: '20px' }} className={`console ${status}`}>Coming soon...</h2>
  );
};

export default HistoryTab;
