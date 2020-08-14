import React from 'react';
import Module, { IModule } from './Module/Module';

interface Data extends IModule {
  subModules: IModule[];
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