import React from 'react';
import Module, { ModuleInterface } from './Module';

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

const ModuleList = ({ moduleData }: {moduleData: Data[]}) => {
  return (
    <div>
      {moduleData.map(data => (
        <Module key={`${data.title}-${data.id}-${data.moduleId}`} {...data} />
      ))}
    </div>
  );
};

export default ModuleList;