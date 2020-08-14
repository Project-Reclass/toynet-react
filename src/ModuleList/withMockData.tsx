/* eslint-disable no-magic-numbers */
import React from 'react';
import { ModuleTypes, IModule } from './Module/Module';

const mockData = [
  {
    id: 1,
    moduleId: 0,
    title: 'Sandbox Tutorial',
    progress: 80,
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 1,
        moduleId: 1,
        title: 'Emulator',
        progress: 40,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 1,
        moduleId: 1,
        title: 'Emulator Practice',
        progress: 10,
        type: ModuleTypes.EMULATOR,
      },
      {
        id: 1,
        moduleId: 1,
        title: 'Quiz',
        progress: 100,
        type: ModuleTypes.QUIZ,
      },
    ],
  },
  {
    id: 2,
    moduleId: 0,
    title: 'Switches and Routers',
    progress: 0,
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 1,
        moduleId: 2,
        title: 'Switch',
        progress: 0,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 1,
        moduleId: 2,
        title: 'Quiz',
        progress: 0,
        type: ModuleTypes.QUIZ,
      },
      {
        id: 1,
        moduleId: 2,
        title: 'Routers',
        progress: 0,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 1,
        moduleId: 2,
        title: 'Quiz',
        progress: 0,
        type: ModuleTypes.QUIZ,
      },
    ],
  },
];

interface Data extends IModule {
  subModules: IModule[];
}

export default (Component: React.ComponentType<{moduleData: Data[]}>) => () => {
  return <Component moduleData={mockData} />;
};