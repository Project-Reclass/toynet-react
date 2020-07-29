import React from 'react';
import './HistoryTab.css';

const HistoryTab = ({ status }) => {
  return (
    <div className={`history ${status}`}>Hi, I am the history component</div>
  );
};

export default HistoryTab;
