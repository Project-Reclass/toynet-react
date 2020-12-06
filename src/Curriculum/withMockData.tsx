/* eslint-disable no-magic-numbers */
import React from 'react';
import { ModuleTypes, ModuleInterface } from './Module/Module';

const mockDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque fermentum volutpat. Proin ut iaculis mauris. Aenean commodo mauris at justo faucibus, in vulputate arcu maximus. Maecenas bibendum nisl urna, nec pretium lacus dapibus et. Nullam a diam sollicitudin, dapibus ante nec, pulvinar diam. Pellentesque sit amet dignissim felis. Nulla interdum, lacus ac rhoncus posuere, tortor leo pharetra nulla, a pulvinar quam sapien sed mi. Fusce bibendum mauris massa, at molestie arcu venenatis at. Vivamus in tellus tempus, porttitor diam a, laoreet magna. Morbi pharetra justo risus, non auctor nisl interdum varius.';
const mockUsername = 'Tay';

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
        id: 2,
        moduleId: 2,
        title: 'Quiz',
        progress: 0,
        type: ModuleTypes.QUIZ,
      },
    ],
  },
];

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

interface Props {
  username: string;
  description: string;
  moduleData: Data[];
}
export default (Component: React.ComponentType<Props>) => () => {
  return <Component
    moduleData={mockData}
    username={mockUsername}
    description={mockDescription}
  />;
};