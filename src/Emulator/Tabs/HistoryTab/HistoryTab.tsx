import React, { FC } from 'react';
import './HistoryTab.css';

interface Props {
  status: string;
}

const HistoryTab: FC<Props> = ({ status }) => {
  return (
    <div className={`history ${status}`}>Hi, I am the history component</div>
  );
};

export default HistoryTab;
