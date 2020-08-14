import React from 'react';
import Module, { ModuleInterface } from './Module';

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

const ModuleList = ({ moduleData }: {moduleData: Data[]}) => {
  return (
    <div>
      {moduleData.map(data => (
        <Module {...data} />
      ))}
    </div>
  );
};

export default ModuleList;